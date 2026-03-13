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

// Configure Multer Storage — Collections
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, _file) => {
    return {
      folder: 'luxury-portfolio',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    };
  },
});

// Configure Multer Storage — Profile / Portrait
const portraitStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, _file) => {
    return {
      folder: 'luxury-portfolio/profile',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      tags: ['portrait'],
    };
  },
});

const upload = multer({ storage: storage });
const uploadPortrait = multer({ storage: portraitStorage });

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

  // Get All Collection Images (excludes profile subfolder)
  app.get('/api/images', async (req, res) => {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'luxury-portfolio/',
        max_results: 100,
        tags: true,
        context: true
      });

      // Exclude anything inside the profile subfolder
      const images = result.resources
        .filter((r: any) => !r.public_id.startsWith('luxury-portfolio/profile/'))
        .map((resource: any) => ({
          publicId: resource.public_id,
          url: resource.secure_url,
          tags: resource.tags || [],
          context: resource.context?.custom || {},
          createdAt: resource.created_at
        }));

      res.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  });

  // Get Portrait Image (from profile subfolder only)
  app.get('/api/portrait', async (req, res) => {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'luxury-portfolio/profile/',
        max_results: 10,
        tags: true,
        context: true
      });

      if (!result.resources.length) {
        return res.status(404).json({ error: 'No portrait found' });
      }

      // Return the most recently uploaded portrait
      const sorted = result.resources.sort((a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      const resource = sorted[0];

      res.json({
        publicId: resource.public_id,
        url: resource.secure_url,
        tags: resource.tags || [],
        context: resource.context?.custom || {},
        createdAt: resource.created_at
      });
    } catch (error) {
      console.error('Error fetching portrait:', error);
      res.status(500).json({ error: 'Failed to fetch portrait' });
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
    const { publicId, tag } = req.body;
    if (!publicId || !tag) return res.status(400).json({ error: 'Public ID and tag are required' });

    try {
      const result = await cloudinary.api.update(publicId, {
        tags: [tag]
      });

      res.json({ message: 'Classification updated', result });
    } catch (error) {
      console.error('Error classifying image:', error);
      res.status(500).json({ error: 'Failed to classify image' });
    }
  });

  // Update Image Context (Caption/Name/Custom Data)
  app.patch('/api/images/context', async (req, res) => {
    const { publicId, caption, contextObj } = req.body;
    if (!publicId) return res.status(400).json({ error: 'Public ID is required' });

    try {
      const contextToUpdate = contextObj || { caption: caption || '' };
      const result = await cloudinary.api.update(publicId, {
        context: contextToUpdate
      });

      res.json({ message: 'Context updated', result });
    } catch (error) {
      console.error('Error updating context:', error);
      res.status(500).json({ error: 'Failed to update context' });
    }
  });

  // Image Upload Route — Collections
  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });
  });

  // Portrait Upload Route — Uploads to luxury-portfolio/profile
  app.post('/api/upload/portrait', uploadPortrait.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'Portrait uploaded successfully',
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
      configFile: './vite.config.ts',
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
