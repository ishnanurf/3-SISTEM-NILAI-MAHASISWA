let nomor = 4; // mulai dari 4 karena sudah ada 3 nama

// fungsi tambah mahasiswa
function tambahBaris() {
    let nama = document.getElementById("namaBaru").value; // ambil nama

    if (nama === "") {
        alert("nama harus diisi"); // kalau kosong
        return;
    }

    let tabel = document.getElementById("bodyTabel"); // ambil tabel
    let row = document.createElement("tr"); // buat baris baru

    // isi baris baru
    row.innerHTML = `
        <td>${nomor}</td>
        <td onclick="opsiNama(event, this)">${nama}</td>
        <td><input class="tm"></td>
        <td><input class="tt"></td>
        <td><input class="uts"></td>
        <td><input class="uas"></td>
        <td class="na"></td>
        <td class="sks">4</td>
        <td class="grade"></td>
        <td class="bobot"></td>
        <td class="bk"></td>
    `;

    tabel.appendChild(row); // masukkan ke tabel
    nomor++; // tambah nomor

    document.getElementById("namaBaru").value = ""; // kosongkan input
    updateNomor(); // rapikan nomor
}

// hitung semua nilai
function hitungSemua() {
    let rows = document.querySelectorAll("#bodyTabel tr"); // ambil semua baris

    rows.forEach(row => {
        let tm = parseFloat(row.querySelector(".tm").value) || 0;
        let tt = parseFloat(row.querySelector(".tt").value) || 0;
        let uts = parseFloat(row.querySelector(".uts").value) || 0;
        let uas = parseFloat(row.querySelector(".uas").value) || 0;

        let na = (tm + tt + uts + uas) / 4; // hitung rata-rata
        row.querySelector(".na").innerText = na.toFixed(2);

        let grade, bobot;

        // menentukan nilai huruf
        if (na >= 85) { grade = "a"; bobot = 4; }
        else if (na >= 80) { grade = "a-"; bobot = 3.7; }
        else if (na >= 75) { grade = "b+"; bobot = 3.3; }
        else if (na >= 70) { grade = "b"; bobot = 3; }
        else if (na >= 65) { grade = "b-"; bobot = 2.7; }
        else if (na >= 60) { grade = "c+"; bobot = 2.3; }
        else if (na >= 55) { grade = "c"; bobot = 2; }
        else { grade = "e"; bobot = 0; }

        row.querySelector(".grade").innerText = grade;
        row.querySelector(".bobot").innerText = bobot;

        let bk = bobot * 4; // bobot dikali sks
        row.querySelector(".bk").innerText = bk.toFixed(2);
    });
}

let selectedCell = null; // simpan nama yang diklik

// saat nama diklik
function opsiNama(e, el) {
    e.stopPropagation(); // supaya tidak langsung hilang

    selectedCell = el; // simpan yang dipilih

    let menu = document.getElementById("menuAksi");

    menu.style.top = e.pageY + "px"; // posisi atas
    menu.style.left = e.pageX + "px"; // posisi samping

    menu.classList.remove("hidden"); // tampilkan menu
}

// ubah nama
function renameNama() {
    let namaBaru = prompt("masukkan nama baru");

    if (namaBaru) {
        selectedCell.innerText = namaBaru;
    }

    tutupMenu();
}

// hapus baris
function hapusBaris() {
    if (confirm("yakin ingin hapus?")) {
        selectedCell.parentElement.remove();
        updateNomor();
    }

    tutupMenu();
}

// tutup menu
function tutupMenu() {
    document.getElementById("menuAksi").classList.add("hidden");
}

// klik luar menutup menu
document.addEventListener("click", function() {
    tutupMenu();
});

// rapikan nomor
function updateNomor() {
    let rows = document.querySelectorAll("#bodyTabel tr");

    rows.forEach((row, index) => {
        row.children[0].innerText = index + 1;
    });

    nomor = rows.length + 1;
}