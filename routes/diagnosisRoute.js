const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/DiagnosisController');

// Route untuk mengambil daftar gejala (ditampilkan di frontend)
router.get('/gejala', diagnosisController.getGejala);

// Route untuk mengirim gejala dan mendapatkan hasil diagnosis
router.post('/diagnosa', diagnosisController.prosesDiagnosa);

module.exports = router;