import { pool } from './database.js';

class LibrosController {
  async getAll(req, res) {
    try {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    } catch (error) {
      res.status(500).json({ "Error": "No se encontraron los libros" });
    }
  }

  async getOne(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query('SELECT * FROM libros WHERE isbn = ?', [libro.isbn]);
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ "Error": `No se encontraron los libros con el ISBN ${libro.isbn}` });
      }
    } catch (error) {
      res.status(500).json({ "Error": "Ocurrió un error al obtener el libro" });
    }
  }

  async add(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query('INSERT INTO libros(nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)', [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
      res.json({ "ID insertado": result.insertId, "message": "Libro agregado exitosamente" });
    } catch (error) {
      res.status(500).json({ "Error": "Error al agregar el libro" });
    }
  }

  async deleteISBN(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query('DELETE FROM libros WHERE isbn = ?', [libro.isbn]);
      if (result.affectedRows > 0) {
        res.json({ "message": `Libro con ISBN ${libro.isbn} eliminado exitosamente` });
      } else {
        res.status(404).json({ "Error": `No se encontró ningún libro con el ISBN ${libro.isbn}` });
      }
    } catch (error) {
      res.status(500).json({ "Error": "Ocurrió un error al eliminar el libro" });
    }
  }

  async deleteID(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [libro.id]);
      if (result.affectedRows > 0) {
        res.json({ "message": `Libro con ID ${libro.id} eliminado exitosamente` });
      } else {
        res.status(404).json({ "Error": `No se encontró ningún libro con el ID ${libro.id}` });
      }
    } catch (error) {
      res.status(500).json({ "Error": "Ocurrió un error" });
    }
  }

  async update(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query('UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ? WHERE isbn = ?', [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
      if (result.affectedRows > 0) {
        res.json({ "message": `Libro con ISBN ${libro.isbn} actualizado exitosamente` });
      } else {
        res.status(404).json({ "Error": `No se encontró ningún libro con el ISBN ${libro.isbn}` });
      }
    } catch (error) {
      res.status(500).json({ "Error": "Ocurrió un error" });
    }
  }
}

export const librosController = new LibrosController();
