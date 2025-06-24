const prisma = require('../config/prisma');

// Get all announcements
exports.getAllAnnouncements = async () => {
  return prisma.announcement.findMany();
};

// Get announcement by ID
exports.getAnnouncementById = async (id) => {
  return prisma.announcement.findUnique({ where: { id: Number(id) } });
};

// Create announcement
exports.createAnnouncement = async (data) => {
  return prisma.announcement.create({ data });
};

// Update announcement
exports.updateAnnouncement = async (id, data) => {
  return prisma.announcement.update({ where: { id: Number(id) }, data });
};

// Delete announcement
exports.deleteAnnouncement = async (id) => {
  return prisma.announcement.delete({ where: { id: Number(id) } });
};