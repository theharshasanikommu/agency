import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Report title is required'],
    trim: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  fileURL: {
    type: String,
    required: true
  },
  filePublicId: {
    type: String
  },
  fileSize: {
    type: Number
  },
  metrics: {
    reach: Number,
    engagement: Number,
    conversions: Number,
    roi: Number,
    customMetrics: mongoose.Schema.Types.Mixed
  },
  notes: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
reportSchema.index({ clientId: 1, year: -1, month: -1 });

export default mongoose.model('Report', reportSchema);
