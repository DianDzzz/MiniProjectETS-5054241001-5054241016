// data.js — product catalog (Bahasa Indonesia)
'use strict';

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'audio', label: 'Audio' },
  { id: 'wearables', label: 'Wearables' },
  { id: 'laptop', label: 'Laptop' },
  { id: 'kamera', label: 'Kamera' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'aksesoris', label: 'Aksesoris' },
];

const BRANDS = ['Nimbus', 'Lumen', 'Northwave', 'Kairo', 'Veridian', 'Halcyon'];

const PRODUCTS = [
  { id: 'p001', sku: 'NMB-AUR-01', name: 'Aurora Headphone Pro', brand: 'Nimbus', category: 'audio',
    price: 4299000, oldPrice: 4899000, rating: 4.8, reviews: 1284, stock: 12,
    colors: [{name:'Graphite',hex:'#2a2a2c'},{name:'Bone',hex:'#e8e4dc'},{name:'Forest',hex:'#2d4a3e'}], sizes: null, badge: 'BARU',
    summary: 'Headphone over-ear dengan ANC adaptif dan baterai 60 jam.',
    desc: 'Aurora Pro menghadirkan peredam bising adaptif generasi ketiga, driver dinamis 40mm, dan sambungan multipoint untuk dua perangkat sekaligus. Bantalan memory foam yang dilapisi kulit nabati membuatnya nyaman digunakan seharian penuh.',
    specs: [['Driver','40mm dynamic'],['Baterai','60 jam (ANC off)'],['Bluetooth','5.4 LE Audio'],['Codec','LDAC, aptX Adaptive'],['Berat','248 gram'],['Pengisian','USB-C, 10 menit = 5 jam']], shape: 'circles' },
  { id: 'p002', sku: 'LMN-PIX-08', name: 'Pixel Buds Halo', brand: 'Lumen', category: 'audio',
    price: 1899000, oldPrice: null, rating: 4.6, reviews: 642, stock: 0,
    colors: [{name:'Putih',hex:'#f5f5f3'},{name:'Hitam',hex:'#0a0a0a'}], sizes: null,
    summary: 'Earbuds TWS dengan spatial audio dan ANC.',
    desc: 'Earbuds ringkas dengan spatial audio, deteksi telinga otomatis, dan tahan air IPX5. Casing pengisian nirkabel dengan baterai total 28 jam.',
    specs: [['Driver','11mm'],['Baterai','7+21 jam'],['Bluetooth','5.3'],['Tahan air','IPX5'],['Berat','4.8g per bud'],['Pengisian','USB-C / Qi']], shape: 'pills' },
  { id: 'p003', sku: 'NWV-FLO-12', name: 'Northwave Flow Watch', brand: 'Northwave', category: 'wearables',
    price: 3450000, oldPrice: 3999000, rating: 4.7, reviews: 412, stock: 7,
    colors: [{name:'Silver',hex:'#c8c8c4'},{name:'Midnight',hex:'#1a1a1c'}], sizes: ['41mm','45mm'],
    summary: 'Smartwatch GPS dengan layar AMOLED selalu aktif.',
    desc: 'Pelacakan kebugaran multi-sport dengan GPS dual-band, monitor SpO2, dan layar AMOLED 1.4 inci yang selalu aktif. Tahan air hingga 50 meter.',
    specs: [['Layar','1.4" AMOLED'],['GPS','Dual-band'],['Baterai','14 hari biasa'],['Tahan air','5 ATM'],['Sensor','SpO2, ECG, suhu kulit'],['Konektivitas','BLE 5.3, NFC']], shape: 'square' },
  { id: 'p004', sku: 'KAI-MBX-15', name: 'Kairo MBX-15 Laptop', brand: 'Kairo', category: 'laptop',
    price: 24900000, oldPrice: null, rating: 4.9, reviews: 218, stock: 4,
    colors: [{name:'Space',hex:'#3a3a3d'},{name:'Silver',hex:'#d4d4d1'}], sizes: ['M3 / 16GB / 512GB','M3 Pro / 24GB / 1TB'], badge: 'STOK TIPIS',
    summary: 'Laptop ultra-portabel 15" dengan layar mini-LED.',
    desc: 'Bodi aluminium CNC, layar mini-LED 15.3 inci 120Hz, baterai 22 jam. Dirancang untuk kreator yang membutuhkan performa di mana saja.',
    specs: [['Layar','15.3" mini-LED 120Hz'],['Prosesor','Kairo M3 / M3 Pro'],['Memori','16–24GB unified'],['SSD','512GB / 1TB NVMe'],['Baterai','22 jam'],['Berat','1.55 kg']], shape: 'laptop' },
  { id: 'p005', sku: 'VRD-ZRO-04', name: 'Veridian Zero Camera', brand: 'Veridian', category: 'kamera',
    price: 18750000, oldPrice: 21000000, rating: 4.8, reviews: 156, stock: 3,
    colors: [{name:'Hitam',hex:'#0a0a0a'}], sizes: null,
    summary: 'Kamera mirrorless full-frame 24MP.',
    desc: 'Sensor full-frame 24MP back-illuminated, IBIS 5-axis 7.5 stop, perekaman video 6K open-gate. Bodi tahan cuaca dengan dual card slot CFexpress.',
    specs: [['Sensor','24MP full-frame BSI'],['IBIS','5-axis, 7.5 stop'],['Video','6K 30p, 4K 120p'],['ISO','100–51,200'],['Card','CFexpress + SD'],['Berat','658 gram (body)']], shape: 'camera' },
  { id: 'p006', sku: 'HAL-VEC-07', name: 'Halcyon Vector Mouse', brand: 'Halcyon', category: 'gaming',
    price: 1249000, oldPrice: null, rating: 4.5, reviews: 891, stock: 24,
    colors: [{name:'Putih',hex:'#f5f5f3'},{name:'Hitam',hex:'#0a0a0a'},{name:'Magenta',hex:'#c026d3'}], sizes: null,
    summary: 'Mouse gaming nirkabel 8K Hz dengan sensor 36K DPI.',
    desc: 'Polling rate 8000Hz, sensor optik 36,000 DPI, baterai 90 jam. Berat hanya 58 gram dengan kerangka magnesium.',
    specs: [['Sensor','36K DPI optical'],['Polling','8000 Hz'],['Baterai','90 jam'],['Berat','58 gram'],['Switch','Optical, 100M klik'],['Konektivitas','2.4GHz / Bluetooth']], shape: 'mouse' },
  { id: 'p007', sku: 'NMB-LUM-22', name: 'Lumen Desk Lamp', brand: 'Lumen', category: 'aksesoris',
    price: 1650000, oldPrice: null, rating: 4.4, reviews: 327, stock: 18,
    colors: [{name:'Putih',hex:'#f5f5f3'},{name:'Hitam',hex:'#0a0a0a'}], sizes: null,
    summary: 'Lampu meja LED dengan kontrol pintar.',
    desc: 'Suhu warna yang dapat disesuaikan 2700K–6500K, sensor cahaya sekitar otomatis, dan kontrol melalui aplikasi atau dial fisik.',
    specs: [['Sumber cahaya','LED 12W'],['Suhu warna','2700–6500K'],['CRI','Ra 95+'],['Kontrol','Aplikasi + dial'],['Daya','USB-C PD'],['Tinggi','52 cm']], shape: 'lamp' },
  { id: 'p008', sku: 'KAI-KEY-09', name: 'Kairo Key75 Keyboard', brand: 'Kairo', category: 'gaming',
    price: 2899000, oldPrice: 3199000, rating: 4.7, reviews: 503, stock: 9,
    colors: [{name:'Putih',hex:'#f5f5f3'},{name:'Hitam',hex:'#0a0a0a'},{name:'Cream',hex:'#e8e4dc'}], sizes: ['ANSI','ISO'],
    summary: 'Keyboard mekanis 75% wireless dengan layar OLED.',
    desc: 'Bodi aluminium CNC, switch hot-swappable, gasket-mount dengan 5 lapis peredam, layar OLED 1 inci untuk metrik.',
    specs: [['Layout','75% (84 keys)'],['Switch','Hot-swap 5-pin'],['Mount','Gasket'],['Konektivitas','USB-C / 2.4G / BT'],['Baterai','4000 mAh'],['Layar','1" OLED']], shape: 'keyboard' },
  { id: 'p009', sku: 'NMB-CDL-03', name: 'Cradle USB-C Hub', brand: 'Nimbus', category: 'aksesoris',
    price: 749000, oldPrice: null, rating: 4.3, reviews: 1102, stock: 56,
    colors: [{name:'Space',hex:'#3a3a3d'}], sizes: null,
    summary: 'Hub USB-C 8-in-1 dengan output HDMI 4K 60Hz.',
    desc: 'Bodi aluminium dengan 8 port: HDMI 4K, USB-A 3.2 ×3, USB-C PD 100W, SD/microSD, RJ45 Ethernet 1Gbps.',
    specs: [['Port','8 (HDMI/USB-A/C/SD/RJ45)'],['HDMI','4K @ 60Hz'],['PD','100W passthrough'],['Ethernet','1 Gbps'],['Bahan','Aluminium CNC'],['Panjang kabel','20 cm']], shape: 'hub' },
  { id: 'p010', sku: 'VRD-LNS-50', name: 'Veridian 50mm f/1.4 Lens', brand: 'Veridian', category: 'kamera',
    price: 8900000, oldPrice: null, rating: 4.9, reviews: 89, stock: 5,
    colors: [{name:'Hitam',hex:'#0a0a0a'}], sizes: null,
    summary: 'Lensa prima 50mm dengan aperture f/1.4.',
    desc: '11 elemen dalam 9 grup termasuk 3 elemen aspherical dan 2 elemen ED. Diafragma 11-bilah untuk bokeh yang halus.',
    specs: [['Focal length','50mm'],['Aperture','f/1.4 – f/16'],['Elemen','11 / 9 grup'],['Bilah','11 (circular)'],['Berat','420 gram'],['Filter','67mm']], shape: 'lens' },
  { id: 'p011', sku: 'HAL-PAD-02', name: 'Halcyon Studio Pad', brand: 'Halcyon', category: 'aksesoris',
    price: 549000, oldPrice: null, rating: 4.2, reviews: 234, stock: 41,
    colors: [{name:'Charcoal',hex:'#2a2a2c'},{name:'Sand',hex:'#d8c8a8'}], sizes: ['L (90×40)','XL (110×50)'],
    summary: 'Mousepad besar dengan permukaan microweave.',
    desc: 'Permukaan microweave anti-air dengan dasar karet anti-slip 4mm. Tepi yang dijahit rapi.',
    specs: [['Permukaan','Microweave nylon'],['Dasar','Natural rubber 4mm'],['Anti-air','Ya'],['Tepi','Jahit'],['Ukuran L','90×40 cm'],['Ukuran XL','110×50 cm']], shape: 'pad' },
  { id: 'p012', sku: 'NWV-RNG-05', name: 'Northwave Ring', brand: 'Northwave', category: 'wearables',
    price: 4999000, oldPrice: null, rating: 4.6, reviews: 178, stock: 11,
    colors: [{name:'Silver',hex:'#c8c8c4'},{name:'Hitam',hex:'#1a1a1c'},{name:'Gold',hex:'#c9a86a'}], sizes: ['7','8','9','10','11','12'], badge: 'EKSKLUSIF',
    summary: 'Cincin pintar pelacak tidur dan kebugaran.',
    desc: 'Pelacak tidur, HRV, dan suhu tubuh dalam bentuk cincin titanium 2.4mm. Baterai 7 hari.',
    specs: [['Bahan','Titanium grade 5'],['Tebal','2.4mm'],['Sensor','HR, HRV, SpO2, suhu'],['Baterai','7 hari'],['Tahan air','10 ATM'],['Berat','4 gram']], shape: 'ring' },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Unggulan' },
  { id: 'newest', label: 'Terbaru' },
  { id: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
  { id: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
  { id: 'rating', label: 'Rating Tertinggi' },
];

const formatRupiah = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

const CART_KEY = 'nimbus.cart.v1';
const AUTH_KEY = 'nimbus.auth.v1';

const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch {} };
const loadAuth = () => { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; } };
const saveAuth = (a) => { try { localStorage.setItem(AUTH_KEY, JSON.stringify(a)); } catch {} };

window.NIMBUS_DATA = { CATEGORIES, BRANDS, PRODUCTS, SORT_OPTIONS, formatRupiah, loadCart, saveCart, loadAuth, saveAuth };
