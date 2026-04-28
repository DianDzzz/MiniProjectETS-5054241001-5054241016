# Mini Project - Evaluasi Tengah Semester
Kelompok 6
- Nama - NRP:
  1. Ustu Bina Syahdiba - 5054241001
  2. Muhammad Hadidan Nurhaunan - 5054241016

Kelas: Pemrograman Web N

---

## E-Commerce Product Catalogue
Membuat Aplikasi E-Commerce beserta keranjang katalognya untuk pembelian produk

- Fitur(wajib):
1. Landing page berupa list produk dalam bentuk visualisasi berupa grid
2. Page tiap produk, dimana ketika di klik, akan memperlihatkan detail produk
3. _Add to cart_ yang akan di simpan pada local storage/keranjang
4. Filter dan sorting produk pada landing page
5. Keranjang pembelian tiap user

- Fitur(tambahan):
1. Login Page
2. Checkout Page
3. _Auto resize_ untuk beberapa device berbeda(laptop, pc, handphone, dll)


# tumBAS — Katalog Produk E-Commerce

Aplikasi Single Page Application (SPA) ringan untuk katalog produk e-commerce yang dibangun menggunakan vanilla JavaScript. Proyek ini dikembangkan sebagai tugas Evaluasi Tengah Semester (ETS) untuk mata kuliah Pemrograman Web.

## Ringkasan Proyek

- **Tujuan:** Menyediakan antarmuka e-commerce fungsional dengan daftar produk, fitur filter, pengurutan (sorting), detail produk, keranjang belanja, dan alur checkout.
- **Teknologi:** 
  - **Bahasa:** Vanilla JavaScript (ES6+).
  - **Library UI:** Tidak ada. Menggunakan bantuan hyperscript kustom (`h`) untuk manipulasi DOM fungsional.
  - **Styling:** Vanilla CSS dengan fitur modern seperti variabel CSS untuk tema (Mode Terang/Gelap).
  - **Penyimpanan:** `localStorage` untuk menyimpan data keranjang belanja dan status autentikasi.

## Arsitektur

Aplikasi ini mengikuti arsitektur berbasis komponen kustom:

- **Manajemen State:** Objek `state` pusat di `script.js` melacak navigasi, item keranjang, tema, dan filter. Fungsi `rerender` digunakan untuk memperbarui DOM setiap kali state berubah.
- **Rendering:** Komponen UI adalah fungsi yang mengembalikan elemen DOM yang dibuat melalui pembantu `h` di `helpers.js`.
- **Modularisasi:**
  - `data.js`: Berisi katalog produk, kategori, brand, serta fungsi utilitas untuk pemformatan dan penyimpanan.
  - `helpers.js`: Utilitas inti termasuk pembantu `h`, definisi ikon, dan logika visualisasi produk.
  - `screens-catalog.js`: Header, Footer, dan layar katalog produk utama (dengan filter/sorting).
  - `screens-product-cart.js`: Layar detail produk individu dan keranjang belanja.
  - `screens-checkout-auth.js`: Layar Login, Checkout, dan Konfirmasi.
  - `script.js`: Titik masuk aplikasi, perutean (routing), dan koordinasi state utama.

## Membangun dan Menjalankan

### Menjalankan Secara Lokal

1. **Secara Langsung:** Buka `index.html` di browser web Anda.
2. **Melalui Server Lokal:**
   - Menggunakan VS Code: Gunakan ekstensi "Live Server".
   - Menggunakan Python: Jalankan `python3 -m http.server` di direktori root.
   - Menggunakan Node.js: Jalankan `npx serve .`

## Konvensi Pengembangan

- **Komponen UI:** Selalu gunakan pembantu `h` untuk membuat elemen DOM. Hindari penggunaan `innerHTML` jika memungkinkan untuk konten dinamis guna mencegah XSS.
- **Tema:** Gunakan variabel CSS yang didefinisikan di `CSS/style.css` untuk warna dan jarak.
- **Pembaruan State:** Untuk memicu pembaruan UI setelah mengubah state, panggil `state.rerender()`.
- **Responsivitas:** Aplikasi menangani tata letak desktop dan seluler melalui listener `resize` di `script.js` yang memperbarui properti `frame` dalam state.
- **Ikon:** Gunakan pembantu `icon(name)` untuk ikon SVG yang didefinisikan di `helpers.js`.
