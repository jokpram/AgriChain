# Proposal Hackathon dan Digdaya 2026: AgriChain - Smart Agricultural Traceability & Batch Management

## 1. Team Identity
*   **Nama Tim:** AgriChain Innovators
*   **Nama Ketua Tim:** JOKO PRAMONO RAMADHANI
*   **Kontak:**
    *   **Email:** jokopramonoramadhani@gmail.com
    *   **Institusi:** UNIVERSITAS LAMPUNG
    *   **Link Portofolio:** [Link Portofolio/GitHub]
*   **Nama Anggota Tim & Peran:**
    *   [Nama Anggota 1] - 
    *   [Nama Anggota 2] - Hustler (Manajer Strategi Bisnis & Pengembangan Produk)
    *   [Nama Anggota 3] - Hipster (Desainer UI/UX & Spesialis Riset Pengguna)
*   **Ringkasan Tim:**
    Tim kami adalah kolaborasi multidisiplin antara talenta digital yang memiliki rekam jejak dalam pengembangan perangkat lunak berskala *enterprise*, sistem logistik, dan analitik data. Kami dipersatukan oleh satu visi: mengentaskan masalah asimetri informasi pada rantai pasok pertanian Indonesia. Dengan keahlian di bidang pengembangan antarmuka reaktif (React.js/TypeScript) dan arsitektur *backend* yang tangguh (Node.js/Express.js), kami tidak sekadar mengusulkan ide, tetapi membangun solusi nyata yang dapat dieksekusi, diukur, dan direplikasi secara nasional untuk mendukung ketahanan pangan di era digital.

---

## 2. Executive Summary Project
AgriChain adalah platform cerdas inovatif berbasis *Software as a Service* (SaaS) yang didesain secara spesifik untuk merevolusi ekosistem logistik serta distribusi pangan di Indonesia. Melalui sistem *Traceability* dan *Batch Management* terpadu, AgriChain melacak komoditas pertanian sejak tahap pasca-panen di tingkat petani hingga diterima oleh distributor. Proyek ini mengatasi secara langsung inefisiensi logistik (penyebab *food loss*), memutus rantai distribusi yang berbelit-belit, dan menghapuskan asimetri informasi harga. Dengan mendigitalisasi setiap titik sentuh komoditas menjadi "Batch" yang dapat dipantau secara *real-time*, AgriChain memberdayakan kesejahteraan petani, mengefisienkan kinerja operasional distributor, dan pada akhirnya, menciptakan sistem ketahanan pangan nasional yang taktis, transparan, dan sangat kompetitif.

---

## 3. Problem Statement
*   **Problem Statement yang Dipilih:** Peningkatan Produktivitas, Ketahanan Pangan, dan Penciptaan Lapangan Kerja.
*   **Sub-Problem Statement Acuan:** 
    *   Digitalisasi Ketahanan Pangan (5. Logistik Pangan Cerdas).
    *   Digitalisasi Ketahanan Pangan (1. Platform Penjualan Langsung dari Petani ke Konsumen).
*   **Tujuan Utama:**
    Tujuan utama yang ingin dicapai melalui inovasi AgriChain adalah mengoptimalkan dan mendigitalisasi seluruh struktur rantai pasok komoditas pertanian melalui platform pencatatan '*batch*' terpusat. Target spesifik sistem ini adalah:
    1. Mengurangi tingkat kehilangan pasca-panen (*food loss & waste*) yang diakibatkan oleh inefisiensi pencatatan logistik sebesar minimal 20%.
    2. Meningkatkan transparansi dan keabsahan kualitas komoditas (dengan merekam jejak lokasi lahan, tanggal panen, dan kuantitas).
    3. Memangkas jalur distribusi agar petani (Grup Tani) mendapatkan margin laba yang lebih adil melalui akses pengajuan suplai langsung kepada distributor lokal tingkat provinsi secara *seamless* dan didorong oleh data.

---

## 4. Problem Definition
*   **Apa Masalah Utamanya?:**
    Masalah utamanya adalah ekosistem rantai pasok pasca-panen komoditas agrikultur di Indonesia yang teramat sangat terfragmentasi, masih bersifat manual (tanpa pendataan digital), dan tidak transparan (buram). Ketiadaan standarisasi pencatatan komoditas pasca-panen—seperti pencatatan asal lahan (titik presisi), tanggal panen (*harvest date*), tonase, dan jenis standar mutu—menyebabkan asimetri informasi akut. Hal ini bermuara pada tiga persoalan fatal: tingginya pembusukan (karena logistik yang lambat dan tertahan mencari pengepul), manipulasi kualitas oleh calo/tengkulak, dan kebutaan distributor terhadap total stok pangan aktual yang tersedia di pedesaan pada suatu waktu tertentu. 

*   **Siapa yang Terdampak dan Seberapa Besar?:**
    Ekosistem ini merugikan tiga pemangku kepentingan utama:
    1. **Petani/Gapoktan (Hulu):** Terdampak sangat besar (mencakup sekitar 30% dari total angkatan kerja nasional yang bergelut di agrikultur). Mereka sering dipaksa menjual panen dengan harga sangat rendah karena tidak memiliki bukti pelacakan digital atas mutu dan tidak memiliki jangkauan data ke distributor langsung.
    2. **Distributor/Perusahaan Logistik (Tengah):** Menderita kerugian *overhead* biaya pencarian sumber komoditas (*sourcing*) dan inefisiensi konsolidasi stok skala besar akibat ketidaktahuan posisi pasti "*available batch*" di lapangan.
    3. **Konsumen Akhir/Pemerintah (Hilir):** Rentan terhadap lonjakan harga pangan yang artifisial, kelangkaan komoditas mendadak yang memicu angka inflasi, serta sulitnya menyalurkan subsidi pupuk berbasis data panen yang akurat.

*   **Bukti Masalah:**
    Kajian resmi Bappenas mengenai *Food Loss and Waste* (FLW) menyebutkan bahwa kerugian ekonomi mencapai ratusan triliun rupiah per tahun, di mana rasio kehilangan/susut terbesar justru terjadi pada mata rantai distribusi pasca-panen dan pemrosesan yang buruk. Fakta empiris di lapangan menunjukkan bahwa pelaporan ketersediaan gabah/sayur acap kali hanya berdasarkan "kabar mulut ke mulut" antar tengkulak tanpa verifikasi *database*, sehingga menyulitkan industri pengolah makanan untuk menyertifikasi asal-usul organik atau halal secara presisi (*traceability*). 

---

## 5. Proposed Solution
*   **Solusi Inti:**
    AgriChain mengusulkan sebuah platform terpadu "Smart Agricultural Traceability & Batch Management System" berbasis web app yang reaktif. Solusi ini mendigitalisasi setiap hasil bumi menjadi entitas digital bernama "**Batch**". Sistem menyediakan tiga buah *Dashboard* yang saling terhubung: *Dashboard Petani* (untuk manajemen Lahan dan input Batch Panen), *Dashboard Distributor* (untuk menemukan Batch tersedia dan memanajemen pemesanan/*Orders*), dan *Dashboard Admin* (untuk memonitor analitik total pergerakan logistik, komoditas, dan otorisasi pengguna). AgriChain bertindak sebagai pusat visibilitas rantai pasok satu atap.

*   **Bagaimana Solusi Bekerja?:**
    Alur operasional AgriChain sangat terstruktur:
    
    ```mermaid
    sequenceDiagram
        autonumber
        actor P as Petani (Gapoktan)
        participant S as Sistem AgriChain (SaaS)
        actor D as Distributor
        
        P->>S: 1. Registrasi & Verifikasi Lahan
        P->>S: 2. Input Data Panen (Komoditas, Kuantitas, Tanggal)
        S-->>S: 3. Validasi Data & Generate Unique 'Batch ID'
        S-->>S: 4. Ubah Status Batch menjadi 'Available'
        S->>D: 5. Render Data Real-time di Dashboard Distributor
        D->>S: 6. Temukan & Pilih Batch yang Sesuai
        D->>S: 7. Ajukan Permintaan (Order)
        S->>P: 8. Notifikasi Permintaan Pembelian
        P->>S: 9. Konfirmasi & Setujui Order
        S-->>S: 10. Update Status logistik (Track & Trace)
        S->>D: 11. Monitoring Status Pengiriman hingga 'Completed'
    ```

    1. **Input (Fase Hulu):** Petani melakukan pendaftaran sistem (divalidasi Admin). Petani me-register lokasi detail lahan mereka. Saat masa pasca-panen, Petani membukukan komoditas ke dalam sistem, menginput parameter: *Commodity Type* (misal: Padi IR64), *Quantity* (misal: 5000), *Unit* (misal: Kg), dan *Harvest Date*.
    2. **Proses (Fase Sistem & Matching):** Server merespons dengan mem-validasi *input* data dan melakukan enkapsulasi data tersebut menjadi sebuah entitas *Batch* dengan pembuatan kode unik *Traceability* secara rahasia (misal: `BATCH-XYZ-123`). Status *Batch* ini diubah secara *real-time* menjadi *'Available'* di dalam *database* relasional sistem.
    3. **Output (Fase Hilir & Logistik):** Distributor yang sudah login mengakses halaman '*Available Batches*' pada UI mereka dan seketika melihat daftar *batch-batch* baru (*dashboard* ter-*update* langsung). Distributor mengajukan permintaan (*Order*) terhadap *batch* tersebut. Setelah terkonfirmasi oleh pihak petani, status *batch* berubah dan dapat dilacak (*track & trace*) rute logistiknya hingga transaksi diselesaikan (Status: *Delivered/Completed*).

---

## 6. Impact & Outcome
*   **Manfaat Utama Jika Solusi Diterapkan:**
    Penerapan AgriChain akan menciptakan **Evolusi Logistik Pangan Berbasis Data**. Manfaat absolut utamanya adalah transparansi 100% pada pergerakan hasil bumi (Smart Logistics). Bagi petani, mereka di-pemberdayakan untuk menjadi "**Digital Framers**"—meningkatkan nilai jual komoditas mereka melalui jaminan sertifikasi catatan jejak sistem yang tidak dapat disangkal. Bagi distributor besar, AgriChain berperan sebagai *aggregator* pasokan canggih yang mereduksi biaya operasi *sourcing* antarwilayah secara radikal. Pada skala nasional, sistem ini adalah purwarupa pangkalan data ketahanan pangan yang terhindar dari bias pelaporan.

*   **Dampak Jangka Pendek dan Menengah:**
    *   **Dampak Jangka Pendek (1-6 bulan implementasi):** Terciptanya kelancaran integrasi pasar mikro bagi mitra gabungan kelompok tani (Gapoktan) lokal; pemetaan riil lokasi geografis lahan pertanian pada sistem; dan percepatan waktu *matching* antara masa panen dan kesiapan armada angkut distributor.
    *   **Dampak Jangka Menengah (1-3 tahun implementasi):** Terbangunnya ekosistem logistik pangan otonom (pemetaan suplai versus *demand* yang terautomasi) di setidaknya lima provinsi percontohan. Pemerintah setempat (Dinas Pertanian) maupun institusi finansial dapat menggunakan '*credit scoring*' berdasarkan jejak performa catatan *Batch* panen harian/bulanan di platform untuk memfasilitasi injeksi kredit usaha rakyat (KUR) yang lebih sehat.

---

## 7. Innovation & Differentiation
*   **Apa yang Membuat Solusi Ini Berbeda?:**
    Diferensiasi sentral AgriChain adalah pendekatan mikroskopisnya (pencatatan per *Batch*) untuk menyelesaikan makro-problem. Tidak seperti *e-commerce marketplace* pertanian umum yang hanya fokus pada konsep '*Buy & Sell*' mentah, AgriChain menitikberatkan teknologi pada aspek komputasi rekaman siklus hidup barang (*Life-Cycle Traceability*), menjamin *authenticity* komoditas mulai dari kode unik, detail dimensi lahan penghasil, hingga pemrosesan yang mulus didukung ekologi antarmuka (*UI/UX*) paling responsif pada standar web terkini (React + Tailwind) agar kurva adopsi teknologi oleh petani (yang umumnya di rentang umur lanjut) menjadi serendah mungkin.

*   **Posisi Solusi Dibanding Pendekatan atau Produk yang Sudah Ada:**
    Produk yang beredar saat ini umumnya terbagi menjadi dua ekstrem: sistem ERP korporat (seperti SAP) yang harganya amat sangat mahal, rumit, dan tidak dirancang untuk petani mikro; atau aplikasi toko hasil tani sederhana yang minim validasi logistik silang. AgriChain hadir secara unik memotong tengah jurang tersebut sebagai platform '*B2B Agri-Logistics Infrastructure as a Service*'. AgriChain bersifat ringan, adaptif terhadap perangkat bermutu rendah (melalui optimalisasi sisi klien dengan React State Management), namun menyimpan tenaga analitik level korporat di panel Adminnya (menyajikan ringkasan rasio *total batches*, metrik konversi *distribution*, bar-chart demografi *user* sesuai dengan fitur *dashboard* kami).

---

## 8. Technical Approach
*   **Teknologi Utama yang Digunakan:**
    AgriChain mengadopsi tumpukan ekosistem web modern (Modern Javascript Stack).
    *   **Front-End Web Apps:** Dikembangkan murni menggunakan pustaka **React.js**. Penulisan kode diwajibkan menggunakan **TypeScript** (`.tsx`/`.ts`) sepenuhnya guna menjamin tipe keamanan berlapis pada kompilasi tingkat tinggi (seperti pendefinisian `interface Farm`, `interface Batch`, dll), dan dibalut sintaks estetik tata letak responsif via **Tailwind CSS**.
    *   **Back-End Microservices Framework:** Menggusnakan teknologi **Node.js** beralaskan kerangka kerja **Express.js**, mewujudkan RESTful API yang melayani puluhan *endpoints* rute (contoh: `/api/farmer/farms`, `/api/admin/batches`). 
    *   **Security Protocol:** JSON Web Token (JWT) yang tertanam statis pada siklus *Middleware Request/Response Interceptor* di *library* Axios klien.

*   **Pemilihan dan Penggunaan Teknologi:**
    Kami berinvestasi pada React dan TypeScript secara sengaja demi integritas (*reliability*) platform tingkat produksi. Penggarapan logika bisnis menggunakan React hooks state yang kuat, sembari menghadirkan antar-muka *single page application (SPA)* yang amat ringan merespons transisi halaman; mencegah gangguan latensi parah jika aplikasi diakses petani di area dengan kualitas sinyal marjinal. Pada sektor REST API Backend, asinkronitas alami pada Node.js memungkinkan platform memroses antrean volume pendaftaran '*batch*' dari ribuan titik lahan secara bersamaan (*I/O non-blocking*).

*   **Algoritma Solusi:**
    Layanan *core-engine* AgriChain saat ini mempraktekan Algoritma *Heuristic Mapping & Filtering* pada level sistem dasar untuk mempertautkan *Available Batches* secara geospasial relasional dengan data prefensi profil para distributor (*demand and supply mapping*). Dalam peta jalan pasca-Hackathon, *backend* dirancang sangat modular (*loosely coupled controller*) agar dengan mudah dapat diinjeksikan model *Machine Learning Regression Decision Tree* yang difungsikan untuk menganalisis data historis durasi perputaran Batch berdasarkan jenis komoditas tertentu terhadap prediksi cuaca di lokasi lahan yang ada.

*   **Data atau Input Utama yang Digunakan:**
    Keandalan suatu platform pasca-panen berdasar pada tingkat kredibilitas input-nya. 
    1. **Master Identity Data:** Otorisasi pengguna multijenjang bersandar pada data identitas utama dengan model *Role Based*. Data ini meliputi detail valid kontak, perizinan distributor, dan *mapping* entitas institusional masing-masing entitas (*Petani/Distributor/Admin*).
    2. **Geospatial & Spatial Data:** Lahan tani (*Farm*) diamankan datanya mencakup *Farm Name*, *Size* (Hektar), *Geolocation Parameter* yang dikunci validasinya saat pembuatan profil. 
    3. **Transactional Commodity Data:** Variabel kritis berupa jenis komoditas terstandarisasi industri, tonase volumetrik pasca-panen komprehensif, format tanggal panen universal, parameter tenggat kadaluwarsa terhitung (*computed*), serta sinkronisasi status pengiriman logistik seketika.

*   **Pertimbangan Keamanan dan Skalabilitas:**
    *   **Sektor Keamanan Mutakhir:** Infrastruktur komunikasi HTTP dilindungi via Token JWT terenkripsi yang memiliki durabilitas tenggat waktu sekuensial. Rutinitas *Middleware* pada *Node.js* (`authMiddleware.js`) menjamin proteksi setiap pendaftaran aset di *routing handler*, menganulir secara otomatis manipulasi mutasi *payload* data oleh peretas eksternal melalui injeksi kode bahaya (Akses 401 dan 403 akan langsung mendegradir sesi secara sepihak kembali ke halaman Login).
    *   **Sektor Skalabilitas Arsitektural:** Berpijak pada pola dasar pengembangan modular, pemisahan entitas antarmuka visual (komponen React: Card, Table, Form) dari *logic* komunikasi lapisan peladen (layanan servis `api.ts`), memudahkan pemindahan infrastruktur ke format *Containerization* skala tinggi.

---

## 9. Implementation Feasibility
*   **Status Inovasi:**
    Posisi platform AgriChain sesungguhnya berada pada tahap kematangan antara **Proof of Concept (POC) lanjutan yang bergerak menuju Minimum Viable Product (MVP)** fungsional. Kami telah membuktikan sistem dapat dikompilasi mulus, kerangka rekayasa pangkalan pangkalan datanya telah merespon sinkron dengan panel UI (Seperti modul *Farmer's Farm Creation*, pendaftaran dan visibilitas *Admin Unified Batches Dashboard*, serta diagram analitik status).

*   **Apakah Inovasi Realistis untuk Dibagun?:**
    Solusi ini berkarakter *sangat hiper-realistis*. Ideologi proyek didesain untuk merealisasikan perangkat lunak operasional murni. Pendekatan arsitektur kami (seperti sentralisasi manajemen status token Axios, dan struktur modul `Routes` pada Node.js) merupakan *Best-Practice* metodologi rekayasa peranti lunak industri kontemporer lintas-platform yang terbukti tervalidasi. Kompetensi tim komprehensif dari *design-system rendering* hingga algoritma basis data siap mentransformasi wacana ini menjadi produk terdistribusikan dalam waktu peluncuran tercepat. 

*   **Tahapan Pengembangan:**
    1. **Tahap Kuartal 1 - Finalisasi MVP (0-3 Bulan):** Optimalisasi penyambungan antarmuka *backend* untuk modul integrasi transaksi *matching* Distributor versus daftar entitas Batch. Peluncuran integrasi *dashboard Analytics* menyeluruh bagi Admin.
    2. **Tahap Kuartal 2 - Field Pilot Project (3-6 Bulan):** Sosialisasi langsung dan lokakarya (*on-boarding*) aplikasi AgriChain pada dua koperasi Gapoktan berskala desa (Kabupaten fokus agraris). Sinkronisasi proses pengujian lapangan terhadap friksi perilaku interaktif dan memitigasi anomali transaksi.
    3. **Tahap Kuartal 3 - Integrasi Enterprise & Skaling (6-12 Bulan):** Pembuahan fitur kemitraan API terbuka bagi sektor ekspedisi pihak ketiga (Third Party Logistics) untuk kalkulasi tarif armada seketika berdasarkan volumetrik dan kuantitas *Batch*, serta ekspansi basis pengguna masif melalui perizinan regulasi daerah terkait.

*   **Bisnis Model dan Keberlanjutan:**
    Keunggulan strategis keberlanjutan produk bersarang pada modifikasi **B2B SaaS (Platform Micro-Commission & Analytics Value Model)**:
    1. **Free-Tier Bagi Petani:** Strategi inklusivitas sentral dengan membebaskan seutuhnya biaya pendaftaran maupun tarif per pembaruan rekaman '*Batch*' guna memicu gelombang efek jaringan suplai besar-besaran (Akuisisi Klien Hulu Masif).
    2. **Micro-Transaction Commission Rate (Tap Model):** Sistem membebankan tarif marjinal (persentase sekian koma kecil berdasarkan *volume*) eksklusif semata pada faksi *Distributor* pada detik di mana kesepakatan *supply orders* terkonfirmasi.  Distributor diuntungkan berkali-kali lipat berkat efektivitas konsolidasi *sourcing* serta eliminasi inefisiensi survei ketersediaan panen.
    3. **Corporate Intelligence Subscriptions:** Monetisasi lapis atas melalui penjualan panel analitik tren demografi prediktif produksi wilayah (*Dashboard Dashboard Admin*) untuk keperluan perusahaan agrobisnis korporat dan kementerian-pemerintah; memastikan umur pundi kas internal *startup* berjalan stabil.
    
---

## 10. Attachment & Reference
*   **Attachment (Lampiran Dokumentasi Tampilan In-Code/Mockup):** 
    *(Catatan Peserta: Dianjurkan sangat untuk menyelipkan beberapa kliping tangkap layar dari antarmuka kode React Anda yang sudah berfungsi, contoh: Cuplikan `Dashboard.tsx` berisi bar metrik persentase status Batch sirkuler dan grafik populasi Petani/Distributor; atau tangkapan modul daftar kelola kebun di `Farms.tsx` saat dieksekusi di perambah lokal).*

*   **Reference (Sastra Rujukan Teknis & Kebijakan):**
    1. Kementerian Perencanaan Pembangunan Nasional/Bappenas (Kajian Pengelolaan Susut dan Sisa Pangan (Food Loss and Waste) secara sistematis).
    2. Standardisasi Otorisasi Keamanan Web (*OWASP Authentication Best Practices: JSON Web Tokens Security Handbook*).
    3. Pola pengembangan antarmuka antikonflik berbasis fungsional berpadanan arsitektur *Typescript-React Component-Based Interface System*.
