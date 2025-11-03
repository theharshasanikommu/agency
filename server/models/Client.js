import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    postcode: String,
    country: { type: String, default: 'UK' }
  },
  services: [{
    type: String,
    enum: ['Social Media Management', 'Paid Advertising', 'Content Strategy', 'SEO', 'Email Marketing']
  }],
  monthlyBudget: {
    type: Number
  },
  contractStartDate: {
    type: Date
  },
  contractEndDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled'],
    default: 'active'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Virtual for projects
clientSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'clientId'
});

// Virtual for reports
clientSchema.virtual('reports', {
  ref: 'Report',
  localField: '_id',
  foreignField: 'clientId'
});

clientSchema.set('toJSON', { virtuals: true });
clientSchema.set('toObject', { virtuals: true });

export default mongoose.model('Client', clientSchema);
