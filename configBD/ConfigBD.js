import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_DATABASE || "mi_basedatos";

async function initDatabase() {
  // 1. Conexión temporal sin DB seleccionada
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: parseInt(process.env.DB_PORT) || 3306,
  });

  // 2. Crear base de datos si no existe
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  console.log(`✅ Base de datos "${dbName}" lista`);
  await connection.end();

  // 3. Crear pool apuntando a la DB
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: dbName,
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // 4. Crear tabla si no existe
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS tbl_alumnos (
      id INT(11) NOT NULL AUTO_INCREMENT,
      nombre_alumno VARCHAR(255) DEFAULT NULL,
      email_alumno VARCHAR(255) DEFAULT NULL,
      curso_alumno VARCHAR(50) DEFAULT NULL,
      sexo_alumno VARCHAR(20) DEFAULT NULL,
      habla_ingles TINYINT(1) DEFAULT NULL,
      fecha_registro TIMESTAMP NULL DEFAULT current_timestamp(),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `;
  await pool.query(createTableSQL);
  console.log("✅ Tabla 'tbl_alumnos' lista");

  // 5. Insertar datos iniciales si la tabla está vacía
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM tbl_alumnos");
  if (rows[0].count === 0) {
    const insertSQL = `
      INSERT INTO tbl_alumnos 
      (id, nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles, fecha_registro)
      VALUES
        (1,'Braudin','braudin@gmail.com','React Native','M',0,'2024-02-18 20:49:51'),
        (4,'Any Luz','any@gmail.com','React Native','F',0,'2024-02-18 20:59:31'),
        (10,'Alejandro','joslito@gmail.com','NodeJS','masculino',1,'2024-02-19 21:40:42'),
        (11,'bonito editado','josl444ito@gmail.com','Python','masculino',0,'2024-02-19 22:26:28'),
        (15,'alumno nuevo','nuevo@gmail.com','Python','masculino',1,'2024-02-20 15:28:08'),
        (16,'Urian Viera','urianviera@gmail.com','ReactJS','masculino',0,'2024-02-20 20:10:32'),
        (19,'Jesus','jesus@gmail.com','React','F',0,'2024-02-21 20:37:20');
    `;
    await pool.query(insertSQL);
    console.log("✅ Datos iniciales insertados en 'tbl_alumnos'");
  } else {
    console.log("ℹ️ La tabla ya tiene registros, no se insertaron datos iniciales.");
  }

  return pool;
}

// Exporta el pool inicializado
const pool = await initDatabase();
export default pool;
