import express from 'express';
import { body, validationResult } from 'express-validator';
import Lead from '../models/Lead.js';
import { protect, authorize } from '../middleware/auth.js';
import { sendEmail } from '../utils/email.js';
import { postLeadToWebhook } from '../utils/sheetsWebhook.js';
import { Parser } from 'json2csv';

const router = express.Router();

// @route   POST /api/leads
// @desc    Create new lead (from contact form)
// @access  Public
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('service').notEmpty().withMessage('Service is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const lead = await Lead.create(req.body);

    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: 'New Lead Submission - MediaManager4U',
        html: `
          <h2>New Lead Received</h2>
          <p><strong>Name:</strong> ${lead.name}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
          <p><strong>Business:</strong> ${lead.businessName || 'N/A'}</p>
          <p><strong>Service:</strong> ${lead.service}</p>
          <p><strong>Message:</strong> ${lead.message}</p>
        `
      });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
    }

    // Optionally forward lead to an external webhook (e.g., Google Apps Script or Zapier)
    // Set SHEETS_WEBHOOK_URL in your .env to enable.
    try {
      const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        postLeadToWebhook(webhookUrl, lead);
      }
    } catch (webhookErr) {
      console.error('Webhook forwarding error:', webhookErr);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you soon.',
      lead
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting lead'
    });
  }
});

// @route   GET /api/leads
// @desc    Get all leads
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = status ? { status } : {};
    
    const leads = await Lead.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Lead.countDocuments(query);

    res.json({
      success: true,
      leads,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads'
    });
  }
});

// @route   GET /api/leads/:id
// @desc    Get single lead
// @access  Private (Admin only)
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching lead'
    });
  }
});

// @route   PUT /api/leads/:id
// @desc    Update lead
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating lead'
    });
  }
});

// @route   DELETE /api/leads/:id
// @desc    Delete lead
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting lead'
    });
  }
});

// @route   GET /api/leads/export/csv
// @desc    Export leads to CSV/Excel
// @access  Private (Admin only)
router.get('/export/csv', protect, authorize('admin'), async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    const fields = [
      { label: 'Name', value: 'name' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Business Name', value: 'businessName' },
      { label: 'Service', value: 'service' },
      { label: 'Message', value: 'message' },
      { label: 'Source', value: 'source' },
      { label: 'Status', value: 'status' },
      { label: 'Created Date', value: 'createdAt' }
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(leads);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Error exporting leads'
    });
  }
});

export default router;
