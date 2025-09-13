/**
 * Database Initialization Script
 * 
 * This script creates a default admin user in the database
 * Run with: node scripts/init-db.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Default admin credentials
const defaultAdmin = {
  username: 'admin',
  password: 'feedingminds2023',
  isAdmin: true
};

async function initializeDatabase() {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: defaultAdmin.username });
    
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping creation.');
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultAdmin.password, salt);
      
      // Create new admin user
      const newAdmin = new User({
        username: defaultAdmin.username,
        password: hashedPassword,
        isAdmin: defaultAdmin.isAdmin
      });
      
      await newAdmin.save();
      console.log('Default admin user created successfully!');
      console.log('Username:', defaultAdmin.username);
      console.log('Password:', defaultAdmin.password);
      console.log('\nPlease change this password after first login for security reasons.');
    }
    
    // Disconnect from database
    await mongoose.disconnect();
    console.log('Database initialization completed.');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();