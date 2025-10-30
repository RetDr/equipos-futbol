import express from 'express';
import { openDb, createTable } from './db.js';

const app = express();
app.use(express.json());

await createTable();

app.get('/equipos', async (req, res) => {
  try {
    const db = await openDb();
    const equipos = await db.all('SELECT * FROM equipos');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(equipos, null, 2));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/equipos', async (req, res) => {
  try {
    const db = await openDb();
    const { nombre, liga, puntos, goles_favor, goles_contra } = req.body;
    const result = await db.run(
      'INSERT INTO equipos (nombre, liga, puntos, goles_favor, goles_contra) VALUES (?, ?, ?, ?, ?)',
      [nombre, liga, puntos, goles_favor, goles_contra]
    );
    res.json({ id: result.lastID, message: 'Equipo creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/equipos/:id', async (req, res) => {
  try {
    const db = await openDb();
    const equipo = await db.get('SELECT * FROM equipos WHERE id = ?', [req.params.id]);
    if (equipo) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(equipo, null, 2));
    } else {
      res.status(404).json({ message: 'Equipo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/equipos/:id', async (req, res) => {
  try {
    const db = await openDb();
    await db.run('DELETE FROM equipos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Equipo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/equipos/:id', async (req, res) => {
  try {
    const db = await openDb();
    const { nombre, liga, puntos, goles_favor, goles_contra } = req.body;
    await db.run(
      `UPDATE equipos SET
        nombre = COALESCE(?, nombre),
        liga = COALESCE(?, liga),
        puntos = COALESCE(?, puntos),
        goles_favor = COALESCE(?, goles_favor),
        goles_contra = COALESCE(?, goles_contra)
        WHERE id = ?`,
      [nombre, liga, puntos, goles_favor, goles_contra, req.params.id]
    );
    res.json({ message: 'Equipo modificado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/equipos/puntos/:min/:max', async (req, res) => {
  try {
    const db = await openDb();
    const equipos = await db.all(
      'SELECT * FROM equipos WHERE puntos BETWEEN ? AND ?',
      [req.params.min, req.params.max]
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(equipos, null, 2));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/estadisticas/goles-por-liga', async (req, res) => {
  try {
    const db = await openDb();
    const stats = await db.all(
      'SELECT liga, AVG(goles_favor) AS promedio_goles, AVG(goles_contra) AS promedio_contra, COUNT(*) as equipos FROM equipos GROUP BY liga'
    );
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(stats, null, 2));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
