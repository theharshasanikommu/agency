import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: ['Social Media Management', 'Paid Advertising', 'Content Strategy', 'SEO', 'Email Marketing']
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'review', 'completed', 'on-hold'],
    default: 'planning'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  budget: {
    type: Number
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    completed: { type: Boolean, default: false }
  }],
  tags: [String]
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ clientId: 1, status: 1 });

export default mongoose.model('Project', projectSchema);
