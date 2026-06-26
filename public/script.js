document.addEventListener("DOMContentLoaded", async () => {
    const daftarGejalaContainer = document.getElementById("daftar-gejala");
    const formGejala = document.getElementById("form-gejala");
    const divHasil = document.getElementById("hasil-diagnosis");
    const namaMasalah = document.getElementById("nama-masalah");
    const teksSolusi = document.getElementById("teks-solusi");

    // 1. Mengambil data gejala dari Backend
    try {
        const response = await fetch('/api/gejala');
        const result = await response.json();
        
        // Kosongkan tulisan "Loading..."
        daftarGejalaContainer.innerHTML = ''; 

        // Buat checkbox untuk setiap gejala
        result.data.forEach(gejala => {
            const label = document.createElement("label");
            label.style.display = "block";
            label.innerHTML = `
                <input type="checkbox" name="gejala" value="${gejala.id}"> 
                ${gejala.nama}
            `;
            daftarGejalaContainer.appendChild(label);
        });
    } catch (error) {
        daftarGejalaContainer.innerHTML = '<p style="color:red;">Gagal memuat gejala.</p>';
    }

    // 2. Menangani saat tombol "Proses Diagnosis" diklik
    formGejala.addEventListener("submit", async (e) => {
        e.preventDefault(); // Mencegah halaman refresh

        // Mengumpulkan semua checkbox yang dicentang
        const checkboxTencentang = document.querySelectorAll('input[name="gejala"]:checked');
        const arrayGejala = Array.from(checkboxTencentang).map(cb => cb.value);

        if (arrayGejala.length === 0) {
            alert("Silakan pilih minimal satu gejala!");
            return;
        }

        // Mengirim data ke API Backend yang Anda buat tadi
        try {
            const response = await fetch('/api/diagnosa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gejala: arrayGejala })
            });

            const result = await response.json();

            // Menampilkan hasil
            divHasil.style.display = "block";
            if (result.data) {
                namaMasalah.innerText = result.data.masalah;
                namaMasalah.style.color = "red";
                teksSolusi.innerText = result.data.solusi;
            } else {
                namaMasalah.innerText = "Diagnosis Tidak Ditemukan";
                namaMasalah.style.color = "black";
                teksSolusi.innerText = result.message;
            }

        } catch (error) {
            alert("Terjadi kesalahan saat memproses diagnosis.");
        }
    });
});