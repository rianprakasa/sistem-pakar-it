const express = require('express');
const app = express();
const diagnosisRoutes = require('./routes/diagnosisRoute.js');

// Middleware untuk mem-parsing JSON
app.use(express.json());
app.use(express.static('public'));

// Gunakan routing
app.use('/api', diagnosisRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sistem Pakar ITSM berjalan di port ${PORT}`);
});

// Tambahkan baris ini khusus untuk deployment Vercel
module.exports = app;