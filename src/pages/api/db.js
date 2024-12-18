import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();                                   // Load environment variables

const pool = mysql.createPool({                    // Create a MySQL connection
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default pool;