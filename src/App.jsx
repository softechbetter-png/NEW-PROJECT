import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';

// Example Home Component (Replace or import your actual form component here)
const Home = () => (
  <div className="max-w-4xl mx-auto p-8 text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to SOFTECH</h1>
    <p className="text-gray-600 mb-6">Your service request system is active.</p>
    <Link 
      to="/admin" 
      className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition"
    >
      Go to Admin Dashboard →
    </Link>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;