require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { Message, Project } = require('./models');

const app = express();
app.set('trust proxy', 1); // needed behind Render's proxy
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json({ limit: '10kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: 'Too many messages. Please try again later.' },
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/projects', async (req, res) => {
  try {
    res.json(await Project.find().sort({ order: 1 }));
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim();
    const message = String(req.body.message || '').trim();

    if (!name || !email || !message)
      return res.status(400).json({ error: 'All fields are required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: 'Please enter a valid email.' });
    if (name.length > 100 || message.length > 2000)
      return res.status(400).json({ error: 'Message is too long.' });

    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')))
  .catch(console.error);