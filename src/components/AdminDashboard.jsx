import React, { useEffect, useState } from 'react';

// Dynamic API Base URL for Local vs Production Environment
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Auth state
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Quick Reply Modal State
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setPasswordInput('');
      } else {
        setLoginError(data.message || 'Invalid Password');
      }
    } catch (err) {
      setLoginError('Server connection error');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setRequests([]);
  };

  // Fetch Requests
  const fetchRequests = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/requests`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setRequests(data.data);
        setError('');
      } else {
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
        setError(data.message || 'Failed to load requests');
      }
    } catch (err) {
      setError('Could not connect to backend server');
    } finally {
      setLoading(false);
    }
  };

  // Update Status Handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/requests/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();

      if (data.success) {
        setRequests(requests.map(req => req._id === id ? { ...req, status: newStatus } : req));
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  // Delete Request
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;

    try {
      const response = await fetch(`${API_URL}/api/requests/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRequests(requests.filter((req) => req._id !== id));
      } else {
        alert(data.message || 'Failed to delete request');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  // Open Reply Modal
  const openReplyModal = (req) => {
    setSelectedRequest(req);
    setReplySubject(`Re: Inquiry regarding ${req.service || 'SOFTECH Services'}`);
    setReplyMessage(`Hi ${req.name},\n\nThank you for reaching out to us! `);
    setReplyModalOpen(true);
  };

  // Send Reply Email Handler
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!selectedRequest || !replyMessage) return;

    setSendingEmail(true);
    try {
      const response = await fetch(`${API_URL}/api/requests/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          toEmail: selectedRequest.email,
          clientName: selectedRequest.name,
          subject: replySubject,
          message: replyMessage
        })
      });
      const data = await response.json();

      if (data.success) {
        alert(`Email successfully sent to ${selectedRequest.email}`);
        setReplyModalOpen(false);
        setSelectedRequest(null);
      } else {
        alert(data.message || 'Failed to send email.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    } finally {
      setSendingEmail(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredRequests.length === 0) {
      alert('No requests available to export.');
      return;
    }

    const headers = ['Date', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Status'];

    const rows = filteredRequests.map(req => [
      `"${new Date(req.createdAt).toLocaleDateString()}"`,
      `"${(req.name || '').replace(/"/g, '""')}"`,
      `"${(req.email || '').replace(/"/g, '""')}"`,
      `"${(req.phone || '').replace(/"/g, '""')}"`,
      `"${(req.service || '').replace(/"/g, '""')}"`,
      `"${(req.message || '').replace(/"/g, '""')}"`,
      `"${req.status || 'Pending'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `softech_service_requests_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedService, selectedStatus, itemsPerPage]);

  const serviceOptions = ['All', ...new Set(requests.map(r => r.service).filter(Boolean))];

  const filteredRequests = requests.filter((item) => {
    const matchesSearch =
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesService = selectedService === 'All' || item.service === selectedService;
    const matchesStatus = selectedStatus === 'All' || (item.status || 'Pending') === selectedStatus;

    return matchesSearch && matchesService && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin Access</h2>
          <p className="text-gray-500 text-sm text-center mb-6">Enter password to view requests</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage incoming service inquiries ({filteredRequests.length} total)</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition shadow text-sm flex items-center gap-1"
          >
            📥 Export CSV
          </button>
          <button
            onClick={fetchRequests}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition shadow text-sm"
          >
            🔄 Refresh
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg transition shadow text-sm"
          >
            🔒 Logout
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search by name, email, or phone..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-700"
          />
        </div>

        <div className="flex w-full sm:w-auto gap-3">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-lg text-sm bg-gray-50 outline-none text-gray-700 cursor-pointer"
          >
            <option value="All">All Services</option>
            {serviceOptions.filter(s => s !== 'All').map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-lg text-sm bg-gray-50 outline-none text-gray-700 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">🟡 Pending</option>
            <option value="In Progress">🔵 In Progress</option>
            <option value="Resolved">🟢 Resolved</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading requests...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center text-gray-500 shadow-sm">
          No matching requests found.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {currentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-gray-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-semibold text-gray-900">{item.name}</td>
                    <td className="p-4 text-gray-600">
                      <div>{item.email}</div>
                      <div className="text-xs text-gray-400">{item.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
                        {item.service}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 max-w-xs truncate" title={item.message}>
                      {item.message}
                    </td>
                    <td className="p-4">
                      <select
                        value={item.status || 'Pending'}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded border outline-none cursor-pointer transition ${getStatusBadgeClass(
                          item.status || 'Pending'
                        )}`}
                      >
                        <option value="Pending">🟡 Pending</option>
                        <option value="In Progress">🔵 In Progress</option>
                        <option value="Resolved">🟢 Resolved</option>
                      </select>
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => openReplyModal(item)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2.5 py-1.5 rounded transition mr-2"
                      >
                        ✉️ Reply
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2.5 py-1.5 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span>Show per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-2 py-1 border rounded bg-white outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRequests.length)} of {filteredRequests.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
              >
                ◀ Previous
              </button>
              
              <span className="px-2 font-semibold text-gray-800">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK REPLY MODAL */}
      {replyModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                Reply to {selectedRequest.name}
              </h3>
              <button
                onClick={() => setReplyModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                <input
                  type="email"
                  value={selectedRequest.email}
                  disabled
                  className="w-full px-3 py-2 bg-gray-100 border rounded-lg text-sm text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={5}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-3">
                <button
                  type="button"
                  onClick={() => setReplyModalOpen(false)}
                  className="px-4 py-2 border text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {sendingEmail ? 'Sending...' : '🚀 Send Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;