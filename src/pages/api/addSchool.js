import pool from './db'; 
import multer from 'multer'; 
import { v2 as cloudinaryV2 } from 'cloudinary';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error("Error during image upload:", err);
                return res.status(500).json({ message: 'Error uploading image' });
            }

            const { name, address, city, state, contact, email_id } = req.body;
            const file = req.file;

            try {
                if (!file) {
                    return res.status(400).json({ message: 'No image uploaded' });
                }

                const cloudinaryResponse = await cloudinaryV2.uploader.upload_stream(
                    { folder: 'school_images' },
                    async (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            return res.status(500).json({ message: 'Error uploading to Cloudinary' });
                        }

                        const imageUrl = result.secure_url;

                        const query = 'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
                        pool.query(query, [name, address, city, state, contact, email_id, imageUrl], (dbError, dbResults) => {
                            if (dbError) {
                                console.error("Database error:", dbError);
                                return res.status(500).json({ message: 'Database error' });
                            }
                            return res.status(200).json({ message: 'School added successfully!' });
                        });
                    }
                );

                file.stream.pipe(cloudinaryResponse);

            } catch (error) {
                console.error("Server error:", error);
                return res.status(500).json({ message: 'Server error' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default handler;
