import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  businessName: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    enum: [
      'Personal Brand Building',
      'Short-Form Content Creation',
      'End-to-End Management',
      'Instagram Growth',
      'LinkedIn Growth',
      'Full Package',
      'Other'
    ]
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: 1000
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'converted', 'closed'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'website'
  },
  notes: {
    type: String
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
leadSchema.index({ email: 1, createdAt: -1 });
leadSchema.index({ status: 1 });

export default mongoose.model('Lead', leadSchema);
