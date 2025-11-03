import express from 'express';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// Get analytics (admin only)
router.get('/analytics', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    res.json({
      success: true,
      analytics: { totalUsers, totalClients, totalAdmins }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching analytics' });
  }
});

export default router;
