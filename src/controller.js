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
}

export const librosController = new LibrosController();
