const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Log the full Authorization header
  console.log('Full Authorization header:', req.header('Authorization'));
  
  const authHeader = req.header('Authorization');
  
  // Check if Authorization header exists
  if (!authHeader) {
    console.log('❌ No Authorization header found');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  // Extract token
  const token = authHeader.replace('Bearer ', '');
  console.log('Extracted token:', token);
  console.log('Token length:', token.length);
  
  // Check if token exists after extraction
  if (!token || token === 'null' || token === 'undefined') {
    console.log('❌ Token is empty, null, or undefined');
    return res.status(401).json({ error: 'Access denied. Invalid token format.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('❌ Token verification error:', error.message);
    console.log('Token that failed:', token);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;