const prisma = require('../config/prisma');

exports.getAllUsers = async () => {
  return prisma.user.findMany();
};