const userService = require('../services/userServices');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required' 
      });
    }
    
    // Check if username already exists
    if (await userService.checkUsernameExists(username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Check if email already exists
    if (await userService.checkEmailExists(email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.params.id;
    
    // Check if username is being changed and already exists
    if (username) {
      const existingUser = await userService.checkUsernameExists(username);
      if (existingUser) {
        // Check if it's not the same user
        const currentUser = await userService.getUserById(userId);
        if (currentUser && currentUser.username !== username) {
          return res.status(400).json({ error: 'Username already exists' });
        }
      }
    }
    
    // Check if email is being changed and already exists
    if (email) {
      const existingUser = await userService.checkEmailExists(email);
      if (existingUser) {
        // Check if it's not the same user
        const currentUser = await userService.getUserById(userId);
        if (currentUser && currentUser.email !== email) {
          return res.status(400).json({ error: 'Email already exists' });
        }
      }
    }
    
    const user = await userService.updateUser(userId, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};