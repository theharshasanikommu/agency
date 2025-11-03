import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Report from '../models/Report.js';
import Client from '../models/Client.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  }
});

// Create report
router.post('/', protect, authorize('admin'), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF file' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'mediamanager4u/reports', format: 'pdf' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ success: false, message: 'Error uploading file' });
        }

        const report = await Report.create({
          ...req.body,
          fileURL: result.secure_url,
          filePublicId: result.public_id,
          fileSize: result.bytes,
          createdBy: req.user.id
        });

        await report.populate('clientId', 'businessName');
        res.status(201).json({ success: true, report });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error uploading report' });
  }
});

// Get reports
router.get('/', protect, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'client') {
      const client = await Client.findOne({ userId: req.user.id });
      if (!client) return res.status(404).json({ success: false, message: 'Client not found' });
      query.clientId = client._id;
    }

    const reports = await Report.find(query)
      .populate('clientId', 'businessName')
      .sort({ year: -1, month: -1 });

    res.json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching reports' });
  }
});

// Delete report
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });

    if (report.filePublicId) {
      await cloudinary.uploader.destroy(report.filePublicId, { resource_type: 'raw' });
    }

    await report.deleteOne();
    res.json({ success: true, message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting report' });
  }
});

export default router;
