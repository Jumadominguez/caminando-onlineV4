#!/usr/bin/env node

/**
 * Script para inicializar la base de datos de Carrefour
 * Ejecutar con: node scripts/init-carrefour-db.js
 */

const { initializeCarrefourDB } = require('../models/carrefour-db');

const initDB = async () => {
  try {
    console.log('🚀 Iniciando inicialización de base de datos Carrefour...');
    await initializeCarrefourDB();
    console.log('✅ Base de datos Carrefour inicializada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inicializando base de datos Carrefour:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  initDB();
}

module.exports = { initDB };
