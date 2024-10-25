import pool from '../../lib/db'; // Make sure your db.js is correctly set up

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO contacts (name, phone) VALUES ($1, $2) RETURNING *',
        [name, phone]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting contact:', error); // Log the error
      res.status(500).json({ error: 'Database error' });
    }
  } else if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM contacts');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching contacts:', error); // Log the error
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
