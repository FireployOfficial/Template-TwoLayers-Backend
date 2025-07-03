import pool from "./configBD/ConfigBD.js"; // Cambiamos a pool

export const listaAlumnos = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM tbl_alumnos");
    return rows;
  } catch (error) {
    throw { 
      status: 500, 
      message: "Error al obtener estudiantes",
      details: error.message 
    };
  } finally {
    if (connection) connection.release(); // Liberamos la conexión
  }
};

export const obtenerAlumnoPorId = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM tbl_alumnos WHERE id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    throw { 
      status: 500, 
      message: "Error al obtener alumno por ID",
      details: error.message
    };
  } finally {
    if (connection) connection.release();
  }
};

export const crearAlumno = async (datosAlumno) => {
  let connection;
  const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = datosAlumno;
  
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO tbl_alumnos (nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles) VALUES (?, ?, ?, ?, ?)",
      [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles]
    );
  } catch (error) {
    throw { 
      status: 500, 
      message: "Error al crear el alumno",
      details: error.message
    };
  } finally {
    if (connection) connection.release();
  }
};

export const actualizarAlumno = async (id, datosAlumno) => {
  let connection;
  const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = datosAlumno;
  
  try {
    connection = await pool.getConnection();
    await connection.execute(
      "UPDATE tbl_alumnos SET nombre_alumno = ?, email_alumno = ?, curso_alumno = ?, sexo_alumno = ?, habla_ingles = ? WHERE id = ?",
      [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles, id]
    );
  } catch (error) {
    throw { 
      status: 500, 
      message: "Error al actualizar el alumno",
      details: error.message
    };
  } finally {
    if (connection) connection.release();
  }
};

export const eliminarAlumno = async (id) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.execute("DELETE FROM tbl_alumnos WHERE id = ?", [id]);
  } catch (error) {
    throw { 
      status: 500, 
      message: "Error al eliminar el alumno",
      details: error.message
    };
  } finally {
    if (connection) connection.release();
  }
};