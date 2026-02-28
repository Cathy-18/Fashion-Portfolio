import express from 'express';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'luxury-portfolio',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  } as any,
});

const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Admin Login Route
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@luxuryp.com').toLowerCase();
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (email && email.toLowerCase() === adminEmail) {
      if (!adminPasswordHash) {
        console.warn('ADMIN_PASSWORD_HASH is not set!');
        return res.status(401).json({ success: false, error: 'Server misconfiguration.' });
      }

      const isValid = bcrypt.compareSync(password || '', adminPasswordHash);

      if (isValid) {
        return res.json({ success: true, email, role: 'admin' });
      }
    }

    return res.status(401).json({ success: false, error: 'Unauthorized credentials.' });
  });

  // Get All Images
  app.get('/api/images', async (req, res) => {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'luxury-portfolio/',
        max_results: 100,
        tags: true
      });

      const images = result.resources.map((resource: any) => ({
        publicId: resource.public_id,
        url: resource.secure_url,
        tags: resource.tags || [],
        createdAt: resource.created_at
      }));

      res.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  });

  // Delete Image
  app.delete('/api/images', async (req, res) => {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ error: 'Public ID is required' });

    try {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result.result === 'ok') {
        res.json({ message: 'Image deleted successfully' });
      } else {
        res.status(400).json({ error: 'Failed to delete image', details: result });
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ error: 'Failed to delete image' });
    }
  });

  // Update Image Classification (Tags)
  app.patch('/api/images/classify', async (req, res) => {
    const { publicId, tag } = req.body; // tag should be Traditional, Modern, or Themed
    if (!publicId || !tag) return res.status(400).json({ error: 'Public ID and tag are required' });

    try {
      // Use Admin API to update tags. This replaces existing tags with the new category.
      const result = await cloudinary.api.update(publicId, {
        tags: [tag]
      });

      res.json({ message: 'Classification updated', result });
    } catch (error) {
      console.error('Error classifying image:', error);
      res.status(500).json({ error: 'Failed to classify image' });
    }
  });

  // Image Upload Route
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
