// services
const prisma = require('../config/prisma');

// Get all reports
exports.getAllReports = async () => {
  return prisma.reportEmergency.findMany();
};

// Get report by ID
exports.getReportById = async (id) => {
  return prisma.reportEmergency.findUnique({ where: { id: id } }); 
};

// Create report
exports.createReport = async (data) => {
  return prisma.reportEmergency.create({ data });
};

// Update report
exports.updateReport = async (id, data) => {
  return prisma.reportEmergency.update({ where: { id: id }, data });
};

// Delete report
exports.deleteReport = async (id) => {
  return prisma.reportEmergency.delete({ where: { id: id } });
};