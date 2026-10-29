const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

require('./src/config/db');

const courseRoutes = require('./src/routes/courseRoutes');
const authRoute = require('./src/routes/authRoute'); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API Videobelajar Backend Berhasil Berjalan!');
});

app.use('/courses', courseRoutes);

app.use('/auth', authRoute); 

app.listen(PORT, () => {
  console.log(`Server Videobelajar berjalan di http://localhost:${PORT}`);
});