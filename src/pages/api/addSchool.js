import pool from './db';
import multer from 'multer';
import cloudinary from './cloudinaryConfig';
import { v2 as cloudinaryV2 } from 'cloudinary';

// Multer configuration to handle file data
const storage = multer.memoryStorage(); // Store files in memory for upload to Cloudinary
const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false, // Disable default body parser to handle file uploads manually
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        // Handle form data and file upload
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error uploading image' });
            }

            const { name, address, city, state, contact, email_id } = req.body;
            const file = req.file;

            try {
                // Upload the image to Cloudinary
                const cloudinaryResponse = await cloudinaryV2.uploader.upload_stream(
                    { folder: 'school_images' },
                    async (error, result) => {
                        if (error) {
                            return res.status(500).json({ message: 'Error uploading to Cloudinary' });
                        }

                        const imageUrl = result.secure_url;

                        // Save the school data with the Cloudinary image URL
                        const query = 'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
                        pool.query(query, [name, address, city, state, contact, email_id, imageUrl], (dbError, dbResults) => {
                            if (dbError) {
                                console.error(dbError);
                                return res.status(500).json({ message: 'Database error' });
                            }
                            return res.status(200).json({ message: 'School added successfully!' });
                        });
                    }
                );

                file.stream.pipe(cloudinaryResponse); // Pipe the file stream to Cloudinary

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Server error' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
