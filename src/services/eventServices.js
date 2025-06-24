const prisma = require('../config/prisma');

// Get all events
exports.getAllEvents = async () => {
  return prisma.event.findMany();
};

// Get event by ID
exports.getEventById = async (id) => {
  return prisma.event.findUnique({ where: { id: Number(id) } });
};

// Create event
exports.createEvent = async (data) => {
  return prisma.event.create({ data });
};

// Update event
exports.updateEvent = async (id, data) => {
  return prisma.event.update({ where: { id: Number(id) }, data });
};

// Delete event
exports.deleteEvent = async (id) => {
  return prisma.event.delete({ where: { id: Number(id) } });
};