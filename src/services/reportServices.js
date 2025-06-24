const prisma = require('../config/prisma');

// Get all reports
exports.getAllReports = async () => {
  return prisma.report.findMany();
};

// Get report by ID
exports.getReportById = async (id) => {
  return prisma.report.findUnique({ where: { id: Number(id) } });
};

// Create report
exports.createReport = async (data) => {
  return prisma.report.create({ data });
};

// Update report
exports.updateReport = async (id, data) => {
  return prisma.report.update({ where: { id: Number(id) }, data });
};

// Delete report
exports.deleteReport = async (id) => {
  return prisma.report.delete({ where: { id: Number(id) } });
};