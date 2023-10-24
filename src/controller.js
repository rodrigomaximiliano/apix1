import { pool } from './database.js';

class LibrosController {
    async getAll(req, res) {
        try {
            const [rows, fields] = await pool.execute('SELECT * FROM libros');
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener los libros:', error);
            res.status(500).json({ error: 'Error al obtener los libros' });
        }
    }

    async getOne(req, res) {
        const libroId = req.params.id;

        try {
            const [rows, fields] = await pool.execute('SELECT * FROM libros WHERE id = ?', [libroId]);

            if (rows.length === 0) {
                res.status(404).json({ mensaje: 'Libro no encontrado' });
            } else {
                res.json(rows[0]);
            }
        } catch (error) {
            console.error('Error al obtener el libro:', error);
            res.status(500).json({ error: 'Error al obtener el libro' });
        }
    }

    async create(req, res) {
        const { nombre, autor, categoria, año_publicacion, isbn } = req.body;

        try {
            const [result] = await pool.execute('INSERT INTO libros (nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)', [nombre, autor, categoria, año_publicacion, isbn]);

            res.status(201).json({ mensaje: 'Libro creado con éxito', libroId: result.insertId });
        } catch (error) {
            console.error('Error al crear el libro:', error);
            res.status(500).json({ error: 'Error al crear el libro' });
        }
    }

    async update(req, res) {
        const libroId = req.params.id;
        const { nombre, autor, categoria, año_publicacion, isbn } = req.body;

        try {
            const [result] = await pool.execute('UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, isbn = ? WHERE id = ?', [nombre, autor, categoria, año_publicacion, isbn, libroId]);

            if (result.affectedRows === 0) {
                res.status(404).json({ mensaje: 'Libro no encontrado' });
            } else {
                res.json({ mensaje: 'Libro actualizado con éxito' });
            }
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            res.status(500).json({ error: 'Error al actualizar el libro' });
        }
    }

    async deleteByISBN(req, res) {
        const ISBN = req.params.isbn;

        try {
            const [result] = await pool.execute('DELETE FROM libros WHERE isbn = ?', [ISBN]);

            if (result.affectedRows === 0) {
                res.status(404).json({ mensaje: 'Libro con ISBN no encontrado' });
            } else {
                res.json({ mensaje: 'Libro eliminado con éxito' });
            }
        } catch (error) {
            console.error('Error al eliminar el libro por ISBN:', error);
            res.status(500).json({ error: 'Error al eliminar el libro' });
        }
    }
}

export const librosController = new LibrosController();
