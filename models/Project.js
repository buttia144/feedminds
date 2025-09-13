const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Artwork', 'Book', 'Other']
  },
  subcategory: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  createdDate: {
    type: String,
    required: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);