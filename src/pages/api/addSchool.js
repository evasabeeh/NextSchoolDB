import cloudinary from './cloudinary';
import pool from './db';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Formidable Error:', err);
            return res.status(500).json({ message: 'Form parsing error' });
        }

        try {
            const filePath = files.image.filepath;
            const uploadResponse = await cloudinary.uploader.upload(filePath, {
                folder: 'school_images', 
            });

            const { secure_url } = uploadResponse;

            const { name, address, city, state, contact, email_id } = fields;
            const query = `INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            pool.query(query, [name, address, city, state, contact, email_id, secure_url], (dbErr, results) => {
                if (dbErr) {
                    console.error('Database Error:', dbErr);
                    return res.status(500).json({ message: 'Database error' });
                }

                return res.status(200).json({ message: 'School added successfully!' });
            });
        } catch (uploadErr) {
            console.error('Cloudinary Upload Error:', uploadErr);
            return res.status(500).json({ message: 'Image upload failed' });
        }
    });
};

export default handler;
