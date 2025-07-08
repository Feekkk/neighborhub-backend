const prisma = require('../config/prisma');
const CleanupService = require('./cleanupService');

// Get all announcements (only return non-expired ones)
exports.getAllAnnouncements = async () => {
  return prisma.announcement.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

// Get announcement by ID
exports.getAnnouncementById = async (id) => {
  return prisma.announcement.findUnique({ where: { id: id } }); // Remove Number()
};

// Create announcement
exports.createAnnouncement = async (data) => {
  return prisma.announcement.create({ data });
};

// Update announcement
exports.updateAnnouncement = async (id, data) => {
  return prisma.announcement.update({ where: { id: id }, data }); // Remove Number()
};

// Delete announcement
exports.deleteAnnouncement = async (id) => {
  return prisma.announcement.delete({ where: { id: id } }); // Remove Number()
};

// Get announcements with expiration info
exports.getAnnouncementsWithExpirationInfo = async () => {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Add expiration information to each announcement
  return announcements.map(announcement => {
    const createdDate = new Date(announcement.createdAt);
    const expirationDate = new Date(createdDate);
    expirationDate.setDate(expirationDate.getDate() + 30);
    
    const now = new Date();
    const daysUntilExpiration = Math.ceil((expirationDate - now) / (1000 * 60 * 60 * 24));
    
    return {
      ...announcement,
      expirationDate: expirationDate.toISOString(),
      daysUntilExpiration: Math.max(0, daysUntilExpiration),
      isExpiringSoon: daysUntilExpiration <= 7 && daysUntilExpiration > 0,
      isExpired: daysUntilExpiration <= 0
    };
  });
};

// Get expiring announcements
exports.getExpiringAnnouncements = async () => {
  return CleanupService.getExpiringAnnouncements();
};

// Manual cleanup trigger
exports.performCleanup = async () => {
  return CleanupService.performManualCleanup();
};