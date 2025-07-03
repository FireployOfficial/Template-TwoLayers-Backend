import mysql from "mysql2/promise";

// Configuración optimizada para producción
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'mi_basedatos',
  port: parseInt(process.env.DB_PORT) || 3306,
  
  // Parámetros del pool
  waitForConnections: true,
  connectionLimit: 10, // Conexiones máximas
  queueLimit: 0, // Ilimitadas solicitudes en cola
  idleTimeout: 60000, // Libera conexiones inactivas (1 min)
  enableKeepAlive: true, // Mantiene conexiones activas
  keepAliveInitialDelay: 10000 // Primer chequeo a los 10s
});

// Verificación de conexión al iniciar
pool.getConnection()
  .then(conn => {
    console.log(`✅ Pool conectado a ${process.env.DB_DATABASE || 'mi_basedatos'}`);
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error inicial de conexión:', {
      message: err.message,
      code: err.code,
      host: process.env.DB_HOST
    });
    process.exit(1); // Termina la aplicación si no puede conectar
  });

export default pool;