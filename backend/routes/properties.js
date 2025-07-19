const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET all properties (optionally filter by userId)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }
    const properties = await Property.find(filter);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new property (auth, with image upload)
router.post('/',  upload.array('images', 5), async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const { userId, ...rest } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const newProperty = new Property({ ...rest, images, userId });
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update property (with image upload support)
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Handle new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      
      // If keepImages is provided, combine with existing images
      if (req.body.keepImages) {
        const keepImages = JSON.parse(req.body.keepImages);
        updateData.images = [...keepImages, ...newImages];
      } else {
        updateData.images = newImages;
      }
    }
    
    const updated = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Property not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE property (auth)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 