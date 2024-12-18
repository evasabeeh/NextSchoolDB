import pool from './db';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({                  // For handling file uploads
    destination: function (req, file, cb) {
        cb(null, 'public/schoolImages');              // Save images to folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp for unique filenames
    },
});

const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false,                            // Disable the default body parser to handle file uploads manually
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        // Handle form data and file upload
        upload.single('image')(req, res, function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error uploading image' });
            }

            const { name, address, city, state, contact, email_id } = req.body;
            const imagePath = '/schoolImages/' + req.file.filename;

            const query = 'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
            pool.query(query, [name, address, city, state, contact, email_id, imagePath], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Database error' });
                }

                return res.status(200).json({ message: 'School added successfully!' });
            });
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
