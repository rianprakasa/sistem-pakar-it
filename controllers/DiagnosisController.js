const { gejalaTI, aturanTI } = require('../models/KnowledgeBase');

class InferenceEngine {
    constructor(aturan) {
        this.aturan = aturan;
    }

    // Algoritma pencocokan gejala
    diagnosa(inputGejalaUser) {
        let hasilDiagnosa = null;
        let kecocokanTertinggi = 0;

        for (const rule of this.aturan) {
            // Hitung berapa banyak gejala user yang cocok dengan syarat rule
            const jumlahCocok = rule.gejala_syarat.filter(g => inputGejalaUser.includes(g)).length;
            
            // Jika semua syarat dalam rule terpenuhi
            if (jumlahCocok === rule.gejala_syarat.length && jumlahCocok > kecocokanTertinggi) {
                kecocokanTertinggi = jumlahCocok;
                hasilDiagnosa = rule;
            }
        }

        return hasilDiagnosa;
    }
}

// Controller logic untuk Express
exports.getGejala = (req, res) => {
    res.json({
        status: "success",
        data: gejalaTI
    });
};

exports.prosesDiagnosa = (req, res) => {
    // Expecting payload: { "gejala": ["G03", "G04"] }
    const { gejala } = req.body; 

    if (!gejala || !Array.isArray(gejala)) {
        return res.status(400).json({ message: "Format input gejala tidak valid." });
    }

    // Instansiasi objek OOP
    const engine = new InferenceEngine(aturanTI);
    const hasil = engine.diagnosa(gejala);

    if (hasil) {
        res.json({
            status: "success",
            message: "Diagnosis berhasil ditemukan",
            data: {
                masalah: hasil.penyakit,
                solusi: hasil.solusi
            }
        });
    } else {
        res.json({
            status: "success",
            message: "Tidak ditemukan diagnosis yang cocok. Hubungi teknisi tingkat lanjut (Tier 3).",
            data: null
        });
    }
};