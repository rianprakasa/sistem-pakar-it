// Daftar Gejala yang Diperluas
const gejalaTI = [
    // Gejala Jaringan & Akses Fisik
    { id: "G01", nama: "Tidak bisa akses internet sama sekali" },
    { id: "G02", nama: "Lampu indikator modem/router LOS berwarna merah" },
    { id: "G03", nama: "Ping ke server menghasilkan 'Request Timeout'" },
    { id: "G04", nama: "Koneksi ke VPN perusahaan gagal / ditolak" },
    
    // Gejala Layanan & Aplikasi Web
    { id: "G05", nama: "Aplikasi web menampilkan 'Error 500 Internal Server Error'" },
    { id: "G06", nama: "Aplikasi web menampilkan 'Error 404 Not Found'" },
    { id: "G07", nama: "Aplikasi web sangat lambat diakses (loading lama)" },
    { id: "G08", nama: "Pesan error 'Database Connection Failed'" },
    
    // Gejala Keamanan & Otentikasi
    { id: "G09", nama: "Pengguna tidak bisa login (Invalid Credentials padahal sandi benar)" },
    { id: "G10", nama: "Browser menampilkan peringatan 'Your connection is not private'" },
    { id: "G11", nama: "Terdapat indikasi akses mencurigakan dari IP tidak dikenal" },
    
    // Gejala Server & Hardware
    { id: "G12", nama: "Penggunaan CPU Server mencapai 100% (High Load)" },
    { id: "G13", nama: "Log server menampilkan pesan 'Out of Memory' (OOM)" },
    { id: "G14", nama: "Kipas server fisik berbunyi sangat keras (Overheating)" },
    { id: "G15", nama: "Tidak bisa mengirim atau menerima email dari domain perusahaan" }
];

// Daftar Aturan (Rules) Diagnosis yang Diperluas
const aturanTI = [
    {
        id_rule: "R01",
        kategori_itsm: "Incident Management - Network",
        gejala_syarat: ["G01", "G02"],
        penyakit: "Gangguan Fisik Kabel Fiber Optik (ISP)",
        solusi: "Hubungi penyedia layanan internet (ISP) untuk melakukan perbaikan kabel di luar gedung."
    },
    {
        id_rule: "R02",
        kategori_itsm: "Incident Management - Database",
        gejala_syarat: ["G05", "G08"],
        penyakit: "Database Server Down / Crash",
        solusi: "Periksa status service database (MySQL/MongoDB). Lakukan restart service dan cek log error untuk mencari penyebab crash."
    },
    {
        id_rule: "R03",
        kategori_itsm: "Incident Management - Network",
        gejala_syarat: ["G01", "G03"],
        penyakit: "Koneksi Jaringan Lokal (LAN) Terputus",
        solusi: "Periksa konfigurasi IP address perangkat, pastikan kabel LAN terhubung ke switch, dan cek konfigurasi routing pada Mikrotik/Router."
    },
    {
        id_rule: "R04",
        kategori_itsm: "Incident Management - Server",
        gejala_syarat: ["G07", "G12", "G13"],
        penyakit: "Resource Server Overload (Penuh)",
        solusi: "Lakukan scale-up kapasitas RAM/CPU pada server cloud, atau optimasi query pada aplikasi yang memakan banyak memori."
    },
    {
        id_rule: "R05",
        kategori_itsm: "Incident Management - Security",
        gejala_syarat: ["G10"],
        penyakit: "Sertifikat SSL Kadaluarsa (Expired)",
        solusi: "Perbarui sertifikat SSL (misalnya menggunakan Let's Encrypt atau penyedia berbayar) dan reload konfigurasi web server (Nginx/Apache)."
    },
    {
        id_rule: "R06",
        kategori_itsm: "Incident Management - Access",
        gejala_syarat: ["G09"],
        penyakit: "Gangguan Layanan Active Directory / SSO",
        solusi: "Periksa server LDAP/Active Directory atau layanan Single Sign-On (SSO). Pastikan sinkronisasi kredensial berjalan normal."
    },
    {
        id_rule: "R07",
        kategori_itsm: "Problem Management - Hardware",
        gejala_syarat: ["G12", "G14"],
        penyakit: "Server Fisik Mengalami Overheating",
        solusi: "Segera matikan server (graceful shutdown) untuk mencegah kerusakan komponen. Periksa sistem pendingin (AC) di ruang server."
    },
    {
        id_rule: "R08",
        kategori_itsm: "Incident Management - Network",
        gejala_syarat: ["G03", "G04"],
        penyakit: "Pemblokiran Akses oleh Firewall",
        solusi: "Periksa aturan (rules) pada Firewall. Pastikan port untuk VPN dan ICMP tidak diblokir secara tidak sengaja."
    },
    {
        id_rule: "R09",
        kategori_itsm: "Incident Management - Application",
        gejala_syarat: ["G06"],
        penyakit: "Kesalahan Konfigurasi Routing Web Server",
        solusi: "Periksa file konfigurasi virtual host pada Nginx atau Apache. Pastikan document root mengarah ke direktori yang benar."
    },
    {
        id_rule: "R10",
        kategori_itsm: "Incident Management - Communication",
        gejala_syarat: ["G15"],
        penyakit: "Layanan Mail Server (SMTP/IMAP) Down",
        solusi: "Periksa status service mail server (misal: Postfix/Exim). Cek apakah IP server masuk dalam daftar blacklist spam."
    }
];

module.exports = { gejalaTI, aturanTI };