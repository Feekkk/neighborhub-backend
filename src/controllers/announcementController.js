const announcementService = require('../services/announcementServices');

exports.getAllEvents = async (req, res) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await announcementService.getAnnouncementById(req.params.id);
    if (!announcement) return res.status(404).json({ error: 'Announcement not found' });
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await announcementService.createAnnouncement(req.body);
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
    res.json(announcement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    await announcementService.deleteAnnouncement(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};