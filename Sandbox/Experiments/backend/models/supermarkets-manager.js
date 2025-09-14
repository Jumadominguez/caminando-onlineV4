const { seedCarrefourData } = require('./carrefour-db');
const { seedDiscoData } = require('./disco-db');
const { seedVeaData } = require('./vea-db');
const { seedJumboData } = require('./jumbo-db');
const { seedDiaData } = require('./dia-db');

// ===== GESTOR DE BASES DE DATOS DE SUPERMERCADOS =====

// Lista de todos los supermercados disponibles
const SUPERMERCADOS = {
  CARREFOUR: 'carrefour',
  DISCO: 'disco',
  VEA: 'vea',
  JUMBO: 'jumbo',
  DIA: 'dia'
};

// Función para inicializar todas las bases de datos
const initializeAllDatabases = async () => {
  console.log('🚀 Iniciando inicialización de todas las bases de datos de supermercados...');

  const results = {
    success: [],
    errors: []
  };

  try {
    console.log('\n🏪 Inicializando Carrefour...');
    await seedCarrefourData();
    results.success.push('Carrefour');
    console.log('✅ Carrefour inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando Carrefour:', error.message);
    results.errors.push({ supermarket: 'Carrefour', error: error.message });
  }

  try {
    console.log('\n🏪 Inicializando Disco...');
    await seedDiscoData();
    results.success.push('Disco');
    console.log('✅ Disco inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando Disco:', error.message);
    results.errors.push({ supermarket: 'Disco', error: error.message });
  }

  try {
    console.log('\n🏪 Inicializando Vea...');
    await seedVeaData();
    results.success.push('Vea');
    console.log('✅ Vea inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando Vea:', error.message);
    results.errors.push({ supermarket: 'Vea', error: error.message });
  }

  try {
    console.log('\n🏪 Inicializando Jumbo...');
    await seedJumboData();
    results.success.push('Jumbo');
    console.log('✅ Jumbo inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando Jumbo:', error.message);
    results.errors.push({ supermarket: 'Jumbo', error: error.message });
  }

  try {
    console.log('\n🏪 Inicializando Dia...');
    await seedDiaData();
    results.success.push('Dia');
    console.log('✅ Dia inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando Dia:', error.message);
    results.errors.push({ supermarket: 'Dia', error: error.message });
  }

  console.log('\n📊 Resumen de inicialización:');
  console.log(`✅ Supermercados inicializados correctamente: ${results.success.length}`);
  console.log(`❌ Errores en inicialización: ${results.errors.length}`);

  if (results.success.length > 0) {
    console.log('🏪 Supermercados exitosos:', results.success.join(', '));
  }

  if (results.errors.length > 0) {
    console.log('❌ Errores:');
    results.errors.forEach(err => {
      console.log(`   - ${err.supermarket}: ${err.error}`);
    });
  }

  return results;
};

// Función para inicializar una base de datos específica
const initializeDatabase = async (supermarketName) => {
  const normalizedName = supermarketName.toLowerCase();

  switch (normalizedName) {
    case SUPERMERCADOS.CARREFOUR:
      console.log('🏪 Inicializando Carrefour...');
      await seedCarrefourData();
      console.log('✅ Carrefour inicializado correctamente');
      break;

    case SUPERMERCADOS.DISCO:
      console.log('🏪 Inicializando Disco...');
      await seedDiscoData();
      console.log('✅ Disco inicializado correctamente');
      break;

    case SUPERMERCADOS.VEA:
      console.log('🏪 Inicializando Vea...');
      await seedVeaData();
      console.log('✅ Vea inicializado correctamente');
      break;

    case SUPERMERCADOS.JUMBO:
      console.log('🏪 Inicializando Jumbo...');
      await seedJumboData();
      console.log('✅ Jumbo inicializado correctamente');
      break;

    case SUPERMERCADOS.DIA:
      console.log('🏪 Inicializando Dia...');
      await seedDiaData();
      console.log('✅ Dia inicializado correctamente');
      break;

    default:
      throw new Error(`Supermercado no reconocido: ${supermarketName}. Opciones disponibles: ${Object.values(SUPERMERCADOS).join(', ')}`);
  }
};

// Función para obtener estadísticas de todas las bases de datos
const getAllDatabasesStats = async () => {
  const { getCarrefourStats } = require('./carrefour-db');
  const { getDiscoStats } = require('./disco-db');
  const { getVeaStats } = require('./vea-db');
  const { getJumboStats } = require('./jumbo-db');
  const { getDiaStats } = require('./dia-db');

  const stats = {
    timestamp: new Date(),
    databases: {}
  };

  const supermarkets = [
    { name: 'Carrefour', getStats: getCarrefourStats },
    { name: 'Disco', getStats: getDiscoStats },
    { name: 'Vea', getStats: getVeaStats },
    { name: 'Jumbo', getStats: getJumboStats },
    { name: 'Dia', getStats: getDiaStats }
  ];

  for (const supermarket of supermarkets) {
    try {
      const supermarketStats = await supermarket.getStats();
      stats.databases[supermarket.name.toLowerCase()] = {
        status: 'success',
        data: supermarketStats
      };
    } catch (error) {
      stats.databases[supermarket.name.toLowerCase()] = {
        status: 'error',
        error: error.message
      };
    }
  }

  return stats;
};

// Función para verificar el estado de todas las bases de datos
const checkDatabasesStatus = async () => {
  const stats = await getAllDatabasesStats();

  console.log('📊 Estado de las bases de datos de supermercados:');
  console.log('='.repeat(50));

  let totalProducts = 0;
  let totalCategories = 0;
  let activeDatabases = 0;

  for (const [name, data] of Object.entries(stats.databases)) {
    console.log(`\n🏪 ${name.toUpperCase()}:`);

    if (data.status === 'success') {
      console.log(`   ✅ Estado: Conectado`);
      console.log(`   📦 Productos: ${data.data.totalProducts}`);
      console.log(`   📂 Categorías: ${data.data.totalCategories}`);
      console.log(`   📋 Subcategorías: ${data.data.totalSubcategories}`);
      console.log(`   🏷️ Tipos de producto: ${data.data.totalProductTypes}`);

      totalProducts += data.data.totalProducts;
      totalCategories += data.data.totalCategories;
      activeDatabases++;
    } else {
      console.log(`   ❌ Estado: Error - ${data.error}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📈 Resumen general:');
  console.log(`   🏪 Bases de datos activas: ${activeDatabases}/5`);
  console.log(`   📦 Total de productos: ${totalProducts}`);
  console.log(`   📂 Total de categorías: ${totalCategories}`);

  return stats;
};

module.exports = {
  SUPERMERCADOS,
  initializeAllDatabases,
  initializeDatabase,
  getAllDatabasesStats,
  checkDatabasesStatus
};
