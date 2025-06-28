const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');

// Get all users
exports.getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Get user by ID
exports.getUserById = async (id) => {
  return prisma.user.findUnique({ 
    where: { id: id },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Create new user (Admin function)
exports.createUser = async (data) => {
  const { username, email, password } = data;
  
  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return prisma.user.create({ 
    data: {
      username,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Update user
exports.updateUser = async (id, data) => {
  const updateData = { ...data };
  
  // If password is being updated, hash it
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  
  return prisma.user.update({ 
    where: { id: id }, 
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Delete user
exports.deleteUser = async (id) => {
  return prisma.user.delete({ where: { id: id } });
};

// Check if username exists (for validation)
exports.checkUsernameExists = async (username) => {
  const user = await prisma.user.findUnique({ where: { username } });
  return !!user;
};

// Check if email exists (for validation)
exports.checkEmailExists = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return !!user;
};