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
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;