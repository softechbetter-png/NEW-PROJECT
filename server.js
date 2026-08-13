import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); // Forces Google DNS resolution for MongoDB Atlas

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Dynamic CORS Configuration (Allows Local Dev + Deployed Vercel URL)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean); // Filters out undefined process.env.FRONTEND_URL during local test

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed'));
    }
  },
  credentials: true
}));

// MongoDB Schema & Model
const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email connection on server startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email Transporter Error:', error);
  } else {
    console.log('📧 Email Transporter is ready to send notifications');
  }
});

// Middleware: Authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secretkey123', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// 1. PUBLIC: Create New Service Inquiry
app.post('/api/requests', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const newRequest = new Request({ name, email, phone, service, message });
    await newRequest.save();

    res.status(201).json({ success: true, message: 'Request submitted successfully!', data: newRequest });
  } catch (error) {
    console.error('❌ Error saving request:', error);
    res.status(500).json({ success: false, message: 'Server error saving request' });
  }
});

// 2. PUBLIC: Admin Login
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secretkey123', { expiresIn: '8h' });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: 'Incorrect Password' });
});

// 3. PROTECTED: Get All Requests
app.get('/api/requests', authenticateToken, async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('❌ Error fetching requests:', error);
    res.status(500).json({ success: false, message: 'Server error fetching requests' });
  }
});

// 4. PROTECTED: Update Request Status
app.patch('/api/requests/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error('❌ Error updating status:', error);
    res.status(500).json({ success: false, message: 'Server error updating status' });
  }
});

// 5. PROTECTED: Delete Request
app.delete('/api/requests/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting request:', error);
    res.status(500).json({ success: false, message: 'Server error deleting request' });
  }
});

// 6. PROTECTED: Send Direct Email Reply
app.post('/api/requests/reply', authenticateToken, async (req, res) => {
  try {
    const { toEmail, clientName, subject, message } = req.body;

    if (!toEmail || !message) {
      return res.status(400).json({ success: false, message: 'Recipient email and message are required.' });
    }

    const mailOptions = {
      from: `"SOFTECH Support" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: subject || `Response to your inquiry - SOFTECH`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${clientName || 'there'},</h2>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #777;">Thank you for contacting SOFTECH Support.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });
  } catch (error) {
    console.error('❌ Error sending reply email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

// Connect Database & Start Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });