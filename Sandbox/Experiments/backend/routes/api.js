const express = require('express');
const { Mockup } = require('../models/database');
const router = express.Router();

// Endpoint básico para mockups desde MongoDB
router.get('/mockups', async (req, res) => {
  try {
    const mockups = await Mockup.find();
    res.json({ data: mockups });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para datos de la página principal
router.get('/home', async (req, res) => {
  try {
    const homeData = await Mockup.findOne({ name: 'Home Page' });
    if (homeData) {
      res.json(homeData.data);
    } else {
      res.json({ title: 'Bienvenido a Caminando Online', content: 'Contenido de la página principal' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
