import express from "express";
import pool from "../configBD/ConfigBD.js"; // Cambiamos a pool

const router = express.Router();

// Middleware para manejar conexiones
const handleDB = async (operation) => {
  let connection;
  try {
    connection = await pool.getConnection();
    return await operation(connection);
  } catch (error) {
    console.error("Error en operación DB:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

// Rutas
router.get("/", async (req, res) => {
  try {
    const alumnos = await handleDB(async (conn) => {
      const [rows] = await conn.execute("SELECT * FROM tbl_alumnos");
      return rows;
    });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ 
      error: "Error al consultar alumnos",
      details: error.message 
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [alumno] = await handleDB(async (conn) => {
      const [rows] = await conn.execute(
        "SELECT * FROM tbl_alumnos WHERE id = ?", 
        [id]
      );
      return rows;
    });
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ 
      error: "Error al consultar alumno",
      details: error.message 
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = req.body;
    
    await handleDB(async (conn) => {
      await conn.execute(
        "INSERT INTO tbl_alumnos (nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles) VALUES (?, ?, ?, ?, ?)",
        [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles]
      );
    });
    
    res.status(201).json({ message: "Alumno creado correctamente" });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al crear alumno",
      details: error.message 
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = req.body;
    
    await handleDB(async (conn) => {
      await conn.execute(
        "UPDATE tbl_alumnos SET nombre_alumno = ?, email_alumno = ?, curso_alumno = ?, sexo_alumno = ?, habla_ingles = ? WHERE id = ?",
        [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles, id]
      );
    });
    
    res.json({ message: "Alumno actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al actualizar alumno",
      details: error.message 
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await handleDB(async (conn) => {
      await conn.execute("DELETE FROM tbl_alumnos WHERE id = ?", [id]);
    });
    
    res.json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ 
      error: "Error al eliminar alumno",
      details: error.message 
    });
  }
});

export default router;