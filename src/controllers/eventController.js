const eventService = require('../services/eventServices');

exports.getAllEvents = async (req, res) => {
  try {
    console.log('Fetching all events...'); // Add this debug log
    const events = await eventService.getAllEvents();
    console.log('Events found:', events.length); // Add this debug log
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err); // Add this debug log
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    console.log('Creating event with data:', req.body); // Add this debug log
    const event = await eventService.createEvent(req.body);
    console.log('Event created:', event); // Add this debug log
    res.status(201).json(event);
  } catch (err) {
    console.error('Error creating event:', err); // Add this debug log
    res.status(400).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await eventService.deleteEvent(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
