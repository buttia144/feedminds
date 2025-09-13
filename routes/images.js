const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// @route   GET api/images/:filename
// @desc    Serve image files from temporary storage
// @access  Public
router.get('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    
    // Determine the correct path based on environment
    const imagePath = process.env.NODE_ENV === 'production'
      ? path.join('/tmp', filename)
      : path.join(__dirname, '../assets/projects', filename);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ msg: 'Image not found' });
    }
    
    // Determine content type
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'image/jpeg';
    
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.gif') contentType = 'image/gif';
    if (ext === '.svg') contentType = 'image/svg+xml';
    
    // Set content type and send file
    res.setHeader('Content-Type', contentType);
    res.sendFile(imagePath);
  } catch (err) {
    console.error('Error serving image:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;