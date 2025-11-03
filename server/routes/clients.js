import express from 'express';
import Client from '../models/Client.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/clients
// @desc    Create new client
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { email, password, name, businessName, ...clientData } = req.body;

    // Create user account for client
    const user = await User.create({
      name,
      email,
      password,
      businessName,
      role: 'client'
    });

    // Create client profile
    const client = await Client.create({
      userId: user._id,
      businessName,
      ...clientData
    });

    res.status(201).json({
      success: true,
      client,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating client'
    });
  }
});

// @route   GET /api/clients
// @desc    Get all clients
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = status ? { status } : {};
    
    const clients = await Client.find(query)
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Client.countDocuments(query);

    res.json({
      success: true,
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients'
    });
  }
});

// @route   GET /api/clients/my-profile
// @desc    Get current client's profile
// @access  Private (Client)
router.get('/my-profile', protect, async (req, res) => {
  try {
    const client = await Client.findOne({ userId: req.user.id })
      .populate('userId', 'name email phone businessName');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client profile not found'
      });
    }

    res.json({
      success: true,
      client
    });
  } catch (error) {
    console.error('Get client profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching client profile'
    });
  }
});

// @route   GET /api/clients/:id
// @desc    Get single client
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('userId', 'name email phone');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // If user is client, only allow access to their own profile
    if (req.user.role === 'client' && client.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      client
    });
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching client'
    });
  }
});

// @route   PUT /api/clients/:id
// @desc    Update client
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.json({
      success: true,
      client
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating client'
    });
  }
});

// @route   DELETE /api/clients/:id
// @desc    Delete client
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Delete associated user account
    await User.findByIdAndDelete(client.userId);
    
    // Delete client
    await client.deleteOne();

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting client'
    });
  }
});

export default router;
