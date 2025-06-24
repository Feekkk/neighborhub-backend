const reportService = require('../services/reportServices');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAllEvents = async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await reportService.getReportById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const report = await reportService.createReport(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await reportService.updateReport(req.params.id, req.body);
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    await reportService.deleteReport(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await prisma.reportEmergency.findMany();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};