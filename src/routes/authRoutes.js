const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if all required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required' 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    
    // Check if either username or email is provided
    if (!username && !email) {
      return res.status(400).json({ error: 'Username or email is required' });
    }
    
    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin login route
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hardcoded admin credentials
    const ADMIN_USERNAME = 'admin-account'; 
    const ADMIN_PASSWORD = 'admin123'; 
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { userId: 'admin', role: 'admin' }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({ 
        token, 
        user: { 
          id: 'admin', 
          username: 'admin', 
          role: 'admin'
        } 
      });
    } else {
      res.status(400).json({ error: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;