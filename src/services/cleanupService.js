const prisma = require('../config/prisma');

/**
 * Service to handle automatic cleanup of old data
 */
class CleanupService {
  /**
   * Delete announcements older than a month (30 days)
   */
  static async deleteOldAnnouncements() {
    try {
      // Calculate date that is 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Delete announcements older than 30 days
      const deletedAnnouncements = await prisma.announcement.deleteMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo
          }
        }
      });

      console.log(`🧹 Cleanup completed: Deleted ${deletedAnnouncements.count} announcements older than 30 days`);
      
      return {
        success: true,
        deletedCount: deletedAnnouncements.count,
        cleanupDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error during announcement cleanup:', error);
      return {
        success: false,
        error: error.message,
        cleanupDate: new Date().toISOString()
      };
    }
  }

  /**
   * Get announcements that will expire soon (within 7 days)
   */
  static async getExpiringAnnouncements() {
    try {
      const twentyThreeDaysAgo = new Date();
      twentyThreeDaysAgo.setDate(twentyThreeDaysAgo.getDate() - 23); // 30 - 7 = 23 days old

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const expiringAnnouncements = await prisma.announcement.findMany({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
            lt: twentyThreeDaysAgo
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      });

      return expiringAnnouncements;
    } catch (error) {
      console.error('Error fetching expiring announcements:', error);
      return [];
    }
  }

  /**
   * Manual cleanup trigger - can be called via API endpoint
   */
  static async performManualCleanup() {
    console.log('🚀 Manual cleanup triggered...');
    return await this.deleteOldAnnouncements();
  }
}

module.exports = CleanupService;
