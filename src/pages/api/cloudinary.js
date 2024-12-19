import cloudinary from 'cloudinary';         // for image uploads

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
});

export default cloudinary.v2;