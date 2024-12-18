import pool from './db';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const query = 'SELECT * FROM schools';

        pool.query(query, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Database error' });
            }

            return res.status(200).json(results);
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
