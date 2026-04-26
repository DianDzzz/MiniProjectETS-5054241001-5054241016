// data.js — product catalog (Bahasa Indonesia)
'use strict';

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'laptop', label: 'Laptop' },
  { id: 'audio', label: 'Audio' },
  { id: 'appliances', label: 'Peralatan Rumah' },
  { id: 'smartphone', label: 'Smartphone' },
];

const BRANDS = ['Apple', 'HP', 'Sony', '4Tech', 'IKEA', 'Hitachi'];

const PRODUCTS = [
  { id: 'p001', sku: 'APL-MBP-01', name: 'MacBook Pro M3', brand: 'Apple', category: 'laptop',
    price: 19999000, oldPrice: 22999000, rating: 4.9, reviews: 542, stock: 8,
    colors: [{name:'Silver',hex:'#d4d4d1'},{name:'Space Black',hex:'#1a1a1c'}], sizes: ['16GB/512GB','16GB/1TB'], badge: 'POPULER',
    image: 'Assets/komputer_apple.png',
    summary: 'Laptop profesional dengan chip Apple M3 dan layar Retina 14".', 
    desc: 'MacBook Pro dengan chip M3, RAM unified memory hingga 24GB, dan SSD hingga 2TB. Baterai tahan hingga 18 jam.',
    specs: [['Chip','Apple M3'],['RAM','16GB unified'],['Storage','512GB/1TB SSD'],['Layar','14" Retina 3072×1964'],['Baterai','18 jam'], ['Berat','1.6 kg']], shape: 'laptop' },
  
  { id: 'p002', sku: 'HP-LPT-02', name: 'HP Pavilion 15', brand: 'HP', category: 'laptop',
    price: 8999000, oldPrice: 9999000, rating: 4.6, reviews: 324, stock: 12,
    colors: [{name:'Silver',hex:'#d4d4d1'},{name:'Dark Gray',hex:'#3a3a3d'}], sizes: ['i5/8GB/256GB','i7/16GB/512GB'],
    image: 'Assets/laptop_hp.png',
    summary: 'Laptop bisnis 15" dengan Intel i5 atau i7.',
    desc: 'HP Pavilion dengan prosesor Intel Core generasi terbaru, RAM hingga 16GB, dan SSD 512GB untuk performa cepat.',
    specs: [['Prosesor','Intel Core i5/i7'],['RAM','8-16GB DDR5'],['Storage','256GB/512GB SSD'],['Layar','15.6" FHD IPS'],['Baterai','10 jam'],['Berat','1.75 kg']], shape: 'laptop' },
  
  { id: 'p003', sku: 'SONY-HP-03', name: 'Sony WH-1000XM5', brand: 'Sony', category: 'audio',
    price: 5999000, oldPrice: 6999000, rating: 4.8, reviews: 876, stock: 15,
    colors: [{name:'Black',hex:'#0a0a0a'},{name:'Silver',hex:'#d4d4d1'}], sizes: null,
    image: 'Assets/headphone_sony.png',
    summary: 'Headphone premium dengan ANC terbaik di kelasnya.',
    desc: 'Sony WH-1000XM5 dengan noise cancellation adaptif 8-mic, driver 30mm, dan baterai 30 jam. Suara Hi-Res bersertifikat.',
    specs: [['Driver','30mm dynamic'],['Baterai','30 jam'],['ANC','8-mic adaptive'],['Codec','LDAC'],['Berat','250g'],['Tahan Air','IPX4']], shape: 'circles' },
  
  { id: 'p004', sku: '4TCH-HP-04', name: '4Tech Headphones Pro', brand: '4Tech', category: 'audio',
    price: 1299000, oldPrice: 1699000, rating: 4.5, reviews: 412, stock: 20,
    colors: [{name:'Black',hex:'#0a0a0a'},{name:'White',hex:'#f5f5f3'}], sizes: null,
    image: 'Assets/headphone_4tech.png',
    summary: 'Headphone nirkabel dengan bass yang dalam.',
    desc: '4Tech Headphones dengan driver 40mm, Bluetooth 5.3, ANC aktif, dan baterai 50 jam. Desain ergonomis untuk kenyamanan maksimal.',
    specs: [['Driver','40mm'],['Baterai','50 jam'],['ANC','Active'],['Bluetooth','5.3'],['Berat','280g'],['Charging','USB-C']], shape: 'circles' },
  
  { id: 'p005', sku: '4TCH-SPK-05', name: '4Tech Speaker', brand: '4Tech', category: 'audio',
    price: 899000, oldPrice: null, rating: 4.4, reviews: 267, stock: 18,
    colors: [{name:'Black',hex:'#0a0a0a'},{name:'Gray',hex:'#6b6b68'}], sizes: null,
    image: 'Assets/speaker_4tech.png',
    summary: 'Speaker Bluetooth portabel dengan bass premium.',
    desc: '4Tech Speaker dengan daya 30W, bass reflex, waterproof IPX7, dan baterai 20 jam. Cocok untuk outdoor dan indoor.',
    specs: [['Daya','30W'],['Bluetooth','5.2'],['Baterai','20 jam'],['Tahan Air','IPX7'],['Jangkauan','30m'],['Berat','650g']], shape: 'pills' },
  
  { id: 'p006', sku: 'IKEA-WSH-06', name: 'IKEA Washing Machine', brand: 'IKEA', category: 'appliances',
    price: 4499000, oldPrice: null, rating: 4.7, reviews: 189, stock: 6,
    colors: [{name:'White',hex:'#f5f5f3'},{name:'Gray',hex:'#9a9a96'}], sizes: ['7kg','9kg'],
    image: 'Assets/mesincuci_ikea.png',
    summary: 'Mesin cuci pintar dengan kapasitas besar.',
    desc: 'IKEA Washing Machine dengan kapasitas 7-9kg, 15 program cuci, teknologi hemat energi, dan kontrol aplikasi mobile.',
    specs: [['Kapasitas','7-9 kg'],['Program','15 mode'],['RPM','1400 rpm'],['Energi','A+++'],['Noise','72dB'],['Dimensi','595×840×550mm']], shape: 'square' },
  
  { id: 'p007', sku: 'HIT-TV-07', name: 'Hitachi Smart TV 55"', brand: 'Hitachi', category: 'appliances',
    price: 6499000, oldPrice: 7999000, rating: 4.8, reviews: 243, stock: 9,
    colors: [{name:'Black',hex:'#0a0a0a'}], sizes: ['43"','55"','65"'], badge: 'DISKON 20%',
    image: 'Assets/tv_hitachi.png',
    summary: 'Smart TV 4K dengan layar DLED berkualitas tinggi.',
    desc: 'Hitachi Smart TV dengan resolusi 4K, refresh rate 60Hz, HDR10+, dan sistem operasi Android TV terbaru untuk streaming unlimited.',
    specs: [['Resolusi','4K UHD (3840×2160)'],['Panel','DLED'],['Refresh Rate','60Hz'],['Smart OS','Android TV 12'],['Konektivitas','WiFi 6, Ethernet'],['Power','120W']], shape: 'square' },
  
  { id: 'p008', sku: 'APL-IPN-08', name: 'iPhone 15 Pro', brand: 'Apple', category: 'smartphone',
    price: 16999000, oldPrice: 18999000, rating: 4.9, reviews: 1203, stock: 14,
    colors: [{name:'Titanium Black',hex:'#1a1a1c'},{name:'Titanium Gold',hex:'#c9a86a'}], sizes: ['128GB','256GB','512GB'],
    image: 'Assets/handphone_apple.png',
    summary: 'Smartphone flagship Apple dengan kamera 48MP Pro.',
    desc: 'iPhone 15 Pro dengan chip A17 Pro, kamera 48MP dengan zoom 12x, layar Super Retina XDR 6.1", dan baterai yang tahan seharian penuh.',
    specs: [['Layar','6.1" Super Retina XDR'],['Chip','A17 Pro'],['Kamera','48MP Pro + 12MP Ultra Wide'],['Baterai','3200mAh'],['Tahan Air','IP69'],['Berat','187g']], shape: 'pills' },
  
  { id: 'p009', sku: 'SONY-XPR-09', name: 'Sony Xperia Pro', brand: 'Sony', category: 'smartphone',
    price: 13999000, oldPrice: 15999000, rating: 4.7, reviews: 387, stock: 11,
    colors: [{name:'Black',hex:'#0a0a0a'},{name:'Gray',hex:'#6b6b68'}], sizes: ['256GB','512GB'],
    image: 'Assets/handphone_sony.png',
    summary: 'Flagship Sony dengan kamera Zeiss yang legendaris.',
    desc: 'Sony Xperia Pro dengan kamera triple Zeiss 12MP + 12MP + 8MP, prosesor Snapdragon 8 Gen 3, layar 6.5" AMOLED 120Hz, dan baterai 5000mAh.',
    specs: [['Layar','6.5" AMOLED 120Hz'],['Chip','Snapdragon 8 Gen 3'],['Kamera','Triple Zeiss (12+12+8MP)'],['RAM','12GB'],['Storage','256-512GB'],['Baterai','5000mAh']], shape: 'pills' },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Unggulan' },
  { id: 'newest', label: 'Terbaru' },
  { id: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
  { id: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
  { id: 'rating', label: 'Rating Tertinggi' },
];

const formatRupiah = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

const CART_KEY = 'TumBAS.cart.v1';
const AUTH_KEY = 'TumBAS.auth.v1';

const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (c) => { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch {} };
const loadAuth = () => { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; } };
const saveAuth = (a) => { try { localStorage.setItem(AUTH_KEY, JSON.stringify(a)); } catch {} };

window.TumBAS_DATA = { CATEGORIES, BRANDS, PRODUCTS, SORT_OPTIONS, formatRupiah, loadCart, saveCart, loadAuth, saveAuth };
