const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // For Vercel deployment, we need to use /tmp directory for serverless functions
    const uploadDir = process.env.NODE_ENV === 'production' 
      ? '/tmp' 
      : path.join(__dirname, '../assets/projects');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/projects/category/:category
// @desc    Get projects by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category })
      .sort({ displayOrder: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, description, category, subcategory, createdDate } = req.body;
    
    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload an image' });
    }
    
    // Get relative path for image URL
    // For Vercel deployment, we need to handle image storage differently
    let imageUrl;
    
    if (process.env.NODE_ENV === 'production') {
      // In production, we would use a cloud storage service like S3 or Cloudinary
      // For now, we'll use a placeholder URL structure that would be replaced with actual implementation
      imageUrl = `/api/images/${req.file.filename}`;
    } else {
      // In development, use local file system
      imageUrl = `/assets/projects/${req.file.filename}`;
    }
    
    // Create new project
    const newProject = new Project({
      title,
      description,
      category,
      subcategory,
      imageUrl,
      createdDate,
      displayOrder: 0 // Default display order
    });
    
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, description, category, subcategory, createdDate, displayOrder } = req.body;
    
    // Find project by ID
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    // Update project fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.subcategory = subcategory || project.subcategory;
    project.createdDate = createdDate || project.createdDate;
    project.displayOrder = displayOrder || project.displayOrder;
    
    // Update image if a new one was uploaded
    if (req.file) {
      // Delete old image if it exists
      if (project.imageUrl) {
        const oldImagePath = path.join(__dirname, '..', project.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Set new image URL
      project.imageUrl = `/assets/projects/${req.file.filename}`;
    }
    
    // Save updated project
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    // Delete image file if it exists
    if (project.imageUrl) {
      const imagePath = path.join(__dirname, '..', project.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Delete project from database
    await project.remove();
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT api/projects/reorder
// @desc    Reorder multiple projects
// @access  Private
router.put('/reorder', auth, async (req, res) => {
  try {
    const { projects } = req.body;
    
    // Validate input
    if (!Array.isArray(projects) || projects.length === 0) {
      return res.status(400).json({ msg: 'Invalid project order data' });
    }
    
    // Update each project's display order
    const updatePromises = projects.map(item => {
      return Project.findByIdAndUpdate(
        item.id,
        { displayOrder: item.order },
        { new: true }
      );
    });
    
    await Promise.all(updatePromises);
    res.json({ msg: 'Projects reordered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;