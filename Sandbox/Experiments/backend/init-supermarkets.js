#!/usr/bin/env node

/**
 * Script de inicialización de bases de datos de supermercados
 * Caminando Online V4
 *
 * Uso:
 *   node init-supermarkets.js              # Inicializar todas las bases de datos
 *   node init-supermarkets.js carrefour    # Inicializar solo Carrefour
 *   node init-supermarkets.js --status     # Ver estado de todas las bases de datos
 */

const { initializeAllDatabases, initializeDatabase, checkDatabasesStatus } = require('./models/supermarkets-manager');

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  console.log('🛒 Caminando Online V4 - Inicialización de Supermercados');
  console.log('='.repeat(60));

  try {
    if (command === '--status' || command === '-s') {
      // Mostrar estado de las bases de datos
      console.log('📊 Verificando estado de las bases de datos...\n');
      await checkDatabasesStatus();

    } else if (command) {
      // Inicializar base de datos específica
      console.log(`🏪 Inicializando base de datos: ${command}\n`);
      await initializeDatabase(command);
      console.log(`\n✅ Base de datos ${command} inicializada correctamente`);

    } else {
      // Inicializar todas las bases de datos
      console.log('🚀 Inicializando todas las bases de datos de supermercados...\n');
      const results = await initializeAllDatabases();

      console.log('\n' + '='.repeat(60));
      if (results.errors.length === 0) {
        console.log('🎉 ¡Todas las bases de datos se inicializaron correctamente!');
      } else {
        console.log('⚠️ Algunas bases de datos tuvieron errores. Revisa los logs anteriores.');
        process.exit(1);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { main };
