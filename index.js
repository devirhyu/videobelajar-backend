const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// Pastikan DB di-load
require('./src/config/db');

const courseRoutes = require('./src/routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware untuk parsing JSON
app.use(express.json());

// Root test endpoint
app.get('/', (req, res) => {
  res.send('API Videobelajar Backend Berhasil Berjalan!');
});

// Register route dengan prefix /course
app.use('/course', courseRoutes);

app.listen(PORT, () => {
  console.log(`Server EduCourse berjalan di http://localhost:${PORT}`);
});