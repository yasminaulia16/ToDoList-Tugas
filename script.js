const addBtn = document.getElementById("addTask"); // Ambil tombol "Tambah Tugas"
const taskList = document.getElementById("taskList"); // Ambil elemen daftar tugas

function formatTanggalIndonesia(tanggal) {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dateObj = new Date(tanggal); // Ubah input tanggal ke objek Date
  const hari = dateObj.getDate(); // Ambil tanggal (1-31)
  const namaBulan = bulan[dateObj.getMonth()]; // Ambil nama bulan dari array
  const tahun = dateObj.getFullYear(); // Ambil tahun (4 digit)

  return `${hari} ${namaBulan} ${tahun}`; // Format jadi "25 Mei 2025"
}

addBtn.addEventListener("click", () => {
  const subject = document.getElementById("subject").value.trim(); // Ambil & hapus spasi input mata pelajaran
  const title = document.getElementById("title").value.trim(); // Ambil & hapus spasi input judul
  const dueDate = document.getElementById("dueDate").value; // Ambil input tanggal

  if (!subject || !title || !dueDate) {
    alert("Harap lengkapi semua data!"); // Validasi: semua harus diisi
    return;
  }

  const li = document.createElement("li"); // Buat elemen <li> baru
  li.className = "task"; // Tambahkan class "task"

  // Isi HTML tugas baru
  li.innerHTML = `
    <span class="status">Selesai</span>
    <div class="task-content">
      <input type="checkbox"  class="check" onchange="selesaiTugas(this)">
      <div class="info">
        <div class="subject">${subject}</div>
        <div class="title">Tugas ${title}</div>
        <div class="date">Due Date: ${formatTanggalIndonesia(dueDate)}</div>
      </div>
    </div>
    <div class="delete">
      <div class="icon">🗑</div>
      <div class="delete-text">Hapus</div>
    </div>
  `;

  // Tambahkan event klik pada <li> (baik untuk hapus atau toggle selesai)
  li.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("delete") || // Klik langsung area hapus
      e.target.closest(".delete") // Atau bagian dalam .delete
    ) {
      taskList.removeChild(li); // Hapus tugas dari daftar
    } else {
      li.classList.toggle("completed"); // Toggle class "completed"
      const status = li.querySelector(".status");
      if (li.classList.contains("completed")) {
        status.style.display = "inline-block"; // Tampilkan tulisan "Selesai"
      } else {
        status.style.display = "none"; // Sembunyikan "Selesai"
      }
    }
  });

  taskList.appendChild(li); // Tambahkan tugas ke daftar

  // Reset form input
  document.getElementById("subject").value = "";
  document.getElementById("title").value = "";
  document.getElementById("dueDate").value = "";
});