const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');

// Get all users (include new fields)
exports.getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,    
      address: true,        
      gender: true,         
      birthday: true,       
      createdAt: true,
      updatedAt: true
    }
  });
};

// Get user by ID (include new fields)
exports.getUserById = async (id) => {
  return prisma.user.findUnique({ 
    where: { id: id },
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,    
      address: true,        
      gender: true,         
      birthday: true,       
      createdAt: true,
      updatedAt: true
    }
  });
};

// Create new user (with optional fields)
exports.createUser = async (data) => {
  const { username, email, password, phoneNumber, address, gender, birthday } = data;
  
  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return prisma.user.create({ 
    data: {
      username,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || null,
      address: address || null,
      gender: gender || null,
      birthday: birthday ? new Date(birthday) : null
    },
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      address: true,
      gender: true,
      birthday: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Update user (with optional fields)
exports.updateUser = async (id, data) => {
  const updateData = { ...data };
  
  // If password is being updated, hash it
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  
  // Convert birthday string to Date object if provided
  if (updateData.birthday) {
    updateData.birthday = new Date(updateData.birthday);
  }
  
  return prisma.user.update({ 
    where: { id: id }, 
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      phoneNumber: true,
      address: true,
      gender: true,
      birthday: true,
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

// Check if phone number exists (for validation)
exports.checkPhoneExists = async (phoneNumber) => {
  if (!phoneNumber) return false;
  const user = await prisma.user.findFirst({ where: { phoneNumber } });
  return !!user;
};