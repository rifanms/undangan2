# PROMPT: Undangan Digital 3D Mewah — untuk Opencode

Salin seluruh teks di bawah ini dan tempel sebagai instruksi ke Opencode.

---

## PROMPT UTAMA

Buatkan saya sebuah **website undangan digital pernikahan 3D interaktif** yang mewah, elegan, dan penuh efek visual, dengan spesifikasi berikut:

### 1. Tech Stack
- HTML5 + CSS3 + Vanilla JavaScript (single-page, tanpa build tool, agar mudah dijalankan langsung di browser)
- Gunakan **Three.js** (via CDN) untuk elemen 3D (partikel emas, background 3D, efek buka amplop 3D)
- Gunakan **GSAP** (via CDN) untuk animasi transisi antar section, scroll-reveal, dan micro-interaction
- Font premium dari Google Fonts: kombinasi font **script/kaligrafi elegan** untuk nama mempelai (mis. "Great Vibes" / "Playfair Display Italic") dan font **serif clean** untuk body text (mis. "Cormorant Garamond" / "EB Garamond")
- Struktur file: `index.html`, `style.css`, `script.js`, folder `/assets` untuk gambar & musik

### 2. Konsep Visual & Tema
- Tema: **Luxury Royal Gold** — kombinasi warna hitam/navy tua sebagai base, aksen emas metalik (gradient gold foil), dan putih gading (ivory) untuk teks
- Tekstur: efek marble/velvet halus di background, ornamen garis emas (line art bunga/mandala) sebagai border dekoratif
- Semua tombol dan card menggunakan efek **glassmorphism** dengan border tipis emas dan glow lembut saat hover

### 3. Struktur Halaman (Section demi Section)

**a. Cover / Opening Screen**
- Tampilan awal berupa **amplop 3D tertutup** yang bisa diklik/tap
- Saat diklik: animasi amplop terbuka dengan efek fold 3D (CSS transform + perspective), lalu memunculkan kartu undangan yang muncul dengan efek "fly-in" dan cahaya partikel emas berjatuhan (Three.js particle system)
- Tampilkan nama tamu secara dinamis dari parameter URL, contoh: `?to=Nama+Tamu`
- Tombol "Buka Undangan" dengan efek shimmer/gold-shine berjalan di teksnya

**b. Hero Section**
- Nama kedua mempelai dengan font kaligrafi besar, muncul dengan animasi fade + letter-spacing expand
- Elemen ornamen 3D berputar pelan di background (mis. cincin emas 3D low-poly atau bunga 3D sederhana menggunakan Three.js)
- Tanggal pernikahan dalam format elegan (mis. "12 . 12 . 2026")
- Efek parallax mouse-move: layer ornamen bergerak halus mengikuti posisi kursor/gyroscope di mobile

**c. Quote / Ayat Section**
- Kutipan romantis atau ayat suci dengan animasi teks muncul huruf per huruf (typewriter effect halus)
- Background efek "shimmer light sweep" yang lewat perlahan

**d. Countdown Timer**
- Hitung mundur real-time (hari, jam, menit, detik) ke tanggal acara
- Setiap digit angka ditampilkan dalam **flip-card 3D** (efek seperti jam bandara analog) menggunakan CSS 3D transform

**e. Cerita Cinta (Our Story)**
- Timeline vertikal dengan titik-titik bercahaya emas, setiap poin cerita muncul dengan scroll-reveal animation (GSAP ScrollTrigger)
- Foto pasangan ditampilkan dalam frame 3D tilt (efek miring mengikuti hover, seperti kartu holografik)

**f. Galeri Foto**
- Grid galeri foto dengan efek **3D carousel/coverflow** yang bisa di-drag/swipe
- Klik foto membuka lightbox dengan animasi zoom-3D

**g. Detail Acara (Akad & Resepsi)**
- Card mewah dengan ornamen border emas, ikon custom (jam, lokasi, kalender)
- Tombol "Lihat Lokasi" yang membuka Google Maps
- Efek card 3D flip saat hover menampilkan detail tambahan di baliknya

**h. Amplop Digital / Hadiah**
- Card dengan efek 3D fold seperti amplop uang, menampilkan info rekening bank / e-wallet dengan tombol copy otomatis

**i. RSVP & Ucapan**
- Form RSVP dengan animasi input elegan (label mengambang / floating label)
- Daftar ucapan tamu muncul sebagai card yang scroll otomatis (marquee) dengan efek fade di tepi

**j. Musik Latar**
- Tombol play/pause musik mengambang di pojok layar berbentuk piringan vinyl 3D yang berputar saat musik dimainkan
- Musik autoplay setelah amplop dibuka (sesuai kebijakan browser, trigger dari user interaction pertama)

**k. Closing Section**
- Ucapan terima kasih dengan animasi confetti emas 3D (partikel jatuh) saat section ini muncul di viewport

### 4. Efek & Interaksi Tambahan (Wajib)
- **Scroll-reveal** di setiap section (fade + slide + scale) memakai Intersection Observer atau GSAP ScrollTrigger
- **Custom cursor** berbentuk ornamen kecil (opsional, hanya di desktop)
- **Loading screen** mewah di awal (logo/monogram inisial mempelai berputar 3D) sebelum konten utama tampil
- **Smooth scroll** antar section dengan efek snap
- Transisi antar section menggunakan efek "curtain reveal" atau "page-turn" bergaya buku mewah

### 5. Responsivitas & Performa
- Wajib **mobile-first** dan sepenuhnya responsif (mayoritas tamu akan membuka dari HP)
- Optimalkan jumlah partikel Three.js agar tetap smooth di HP kelas menengah (gunakan `requestAnimationFrame`, batasi particle count, dan matikan efek berat otomatis jika FPS rendah)
- Lazy-load gambar galeri
- Sertakan komentar kode yang jelas per section agar mudah saya edit teks, nama, tanggal, dan foto sendiri nantinya

### 6. Data yang Perlu Bisa Saya Ganti dengan Mudah
Buat semua data berikut dalam satu object/config di awal `script.js` agar gampang diedit:
- Nama mempelai pria & wanita
- Tanggal & waktu akad/resepsi
- Lokasi acara + link maps
- Quote/ayat
- Daftar cerita cinta (timeline)
- List foto galeri
- Info rekening/e-wallet
- Link/file musik latar

---

## Catatan Tambahan Saat Menjalankan di Opencode
- Minta Opencode membuat project secara bertahap: mulai dari struktur HTML dasar → styling tema mewah → animasi GSAP → efek Three.js → baru optimasi mobile
- Jika ingin versi yang lebih ringan (tanpa Three.js), minta gunakan CSS 3D transform saja untuk efek amplop, flip-card, dan tilt agar lebih ringan di HP low-end
- Sebutkan preferensi tema warna lain jika tidak ingin gold-navy (misal: rose gold, emerald green, dusty blue) agar Opencode menyesuaikan palet
