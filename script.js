let nomor = 4; // nomor awal karena sudah ada 3 data

// tambah mahasiswa
function tambahBaris() {
    let nama = document.getElementById("namaBaru").value; // ambil input nama

    if (nama === "") {
        alert("nama harus diisi"); // validasi jika kosong
        return;
    }

    let tabel = document.getElementById("bodyTabel"); // ambil body tabel

    let row = document.createElement("tr"); // buat baris baru

    row.innerHTML = ` // isi baris baru
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

    tabel.appendChild(row); // tambahkan ke tabel
    nomor++; // tambah nomor

    document.getElementById("namaBaru").value = ""; // kosongkan input
updateNomor();}

// hitung semua
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
    let selectedCell = null;
}

// klik nama → tampilkan menu
function opsiNama(e, el) {
    e.stopPropagation(); // supaya menu tidak langsung hilang

    selectedCell = el; // simpan cell yang diklik

    let menu = document.getElementById("menuAksi");

    menu.style.top = e.pageY + "px"; // posisi vertikal
    menu.style.left = e.pageX + "px"; // posisi horizontal

    menu.classList.remove("hidden"); // tampilkan menu
}

// rename
function renameNama() {
    let namaBaru = prompt("Masukkan Nama Baru"); // input nama baru

    if (namaBaru) {
        selectedCell.innerText = namaBaru; // ganti nama
    }

    tutupMenu();
}

// delete
function hapusBaris() {
    if (confirm("Yakin Ingin Menghapus?")) {
        selectedCell.parentElement.remove(); // hapus baris
        updateNomor(); // update nomor tabel
    }

    tutupMenu();
}

// tutup menu
function tutupMenu() {
    document.getElementById("menuAksi").classList.add("hidden"); // sembunyikan menu
}

// klik luar → tutup
document.addEventListener("click", function() {
    tutupMenu();
});

function updateNomor() {
    let rows = document.querySelectorAll("#bodyTabel tr"); // ambil semua baris

    rows.forEach((row, index) => {
        row.children[0].innerText = index + 1; // update nomor
    });

    nomor = rows.length + 1; // update nomor berikutnya
}