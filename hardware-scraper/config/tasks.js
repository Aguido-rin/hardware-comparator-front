// config/tasks.js

export const TASKS = [
  // ==========================================
  // PROCESADORES (CPUs)
  // ==========================================
  // --- AMD ---
  { keyword: "amd ryzen 5 5600g", category: "cpu", store: "Amazon" },
  { keyword: "amd ryzen 5 5600x", category: "cpu", store: "Amazon" },
  { keyword: "amd ryzen 7 5700x", category: "cpu", store: "Amazon" },
  { keyword: "amd ryzen 7 5800x3d", category: "cpu", store: "Amazon" },
  { keyword: "amd ryzen 5 7600x", category: "cpu", store: "Amazon" },
  { keyword: "amd ryzen 7 7800x3d", category: "cpu", store: "Amazon" },
  { keyword: "amd ryzen 9 7950x", category: "cpu", store: "Amazon" },
  // --- Intel ---
  { keyword: "intel core i3 12100f", category: "cpu", store: "Amazon" },
  { keyword: "intel core i5 12400f", category: "cpu", store: "Amazon" },
  { keyword: "intel core i5 13400f", category: "cpu", store: "Amazon" },
  { keyword: "intel core i5 13600k", category: "cpu", store: "Amazon" },
  { keyword: "intel core i7 13700k", category: "cpu", store: "Amazon" },
  { keyword: "intel core i7 14700k", category: "cpu", store: "Amazon" },
  { keyword: "intel core i9 14900k", category: "cpu", store: "Amazon" },

  // ==========================================
  // TARJETAS DE VIDEO (GPUs)
  // ==========================================
  // --- NVIDIA ---
  { keyword: "rtx 3060 12gb", category: "gpu", store: "Amazon" },
  { keyword: "rtx 4060 8gb", category: "gpu", store: "Amazon" },
  { keyword: "rtx 4060 ti", category: "gpu", store: "Amazon" },
  { keyword: "rtx 4070 super", category: "gpu", store: "Amazon" },
  { keyword: "rtx 4070 ti super", category: "gpu", store: "Amazon" },
  { keyword: "rtx 4080 super", category: "gpu", store: "Amazon" },
  // --- AMD Radeon ---
  { keyword: "rx 6600 8gb", category: "gpu", store: "Amazon" },
  { keyword: "rx 6700 xt", category: "gpu", store: "Amazon" },
  { keyword: "rx 7600 8gb", category: "gpu", store: "Amazon" },
  { keyword: "rx 7800 xt", category: "gpu", store: "Amazon" },

  // ==========================================
  // MEMORIA RAM
  // ==========================================
  // Búsquedas genéricas por marca y tecnología para atrapar los mejores kits
  { keyword: "ram ddr4 16gb corsair vengeance", category: "ram", store: "Amazon" },
  { keyword: "ram ddr4 32gb kingston fury", category: "ram", store: "Amazon" },
  { keyword: "ram ddr4 16gb g.skill trident z", category: "ram", store: "Amazon" },
  { keyword: "ram ddr5 32gb corsair dominator", category: "ram", store: "Amazon" },
  { keyword: "ram ddr5 32gb kingston beast", category: "ram", store: "Amazon" },
  { keyword: "ram ddr5 32gb g.skill flare", category: "ram", store: "Amazon" },
  { keyword: "ram ddr5 32gb crucial", category: "ram", store: "Amazon" },

  // ==========================================
  // ALMACENAMIENTO (SSD / NVMe)
  // ==========================================
  { keyword: "ssd nvme 1tb samsung 980 pro", category: "storage", store: "Amazon" },
  { keyword: "ssd nvme 1tb samsung 990 pro", category: "storage", store: "Amazon" },
  { keyword: "ssd nvme 1tb kingston nv2", category: "storage", store: "Amazon" },
  { keyword: "ssd nvme 1tb western digital sn850x", category: "storage", store: "Amazon" },
  { keyword: "ssd nvme 2tb crucial p3 plus", category: "storage", store: "Amazon" },
  { keyword: "ssd sata 1tb kingston a400", category: "storage", store: "Amazon" },
  { keyword: "ssd sata 1tb crucial mx500", category: "storage", store: "Amazon" },

  // ==========================================
  // MONITORES GAMER
  // ==========================================
  { keyword: "monitor gamer 144hz ips", category: "monitor", store: "Amazon" },
  { keyword: "monitor gamer 165hz asus tuf", category: "monitor", store: "Amazon" },
  { keyword: "monitor gamer 240hz lg ultragear", category: "monitor", store: "Amazon" },
  { keyword: "monitor samsung odyssey g5", category: "monitor", store: "Amazon" },
  { keyword: "monitor aoc 24g2", category: "monitor", store: "Amazon" },
  { keyword: "monitor gigabyte m27q", category: "monitor", store: "Amazon" },

  // ==========================================
  // FUENTES DE PODER (PSU)
  // ==========================================
  { keyword: "power supply 650w 80 plus bronze corsair", category: "psu", store: "Amazon" },
  { keyword: "power supply 750w 80 plus gold evga", category: "psu", store: "Amazon" },
  { keyword: "power supply 850w 80 plus gold seasonic", category: "psu", store: "Amazon" },
  { keyword: "power supply 1000w 80 plus gold asus rog", category: "psu", store: "Amazon" },

  // ==========================================
  // PLACAS MADRE (Motherboards)
  // ==========================================
  // --- AMD (AM4 / AM5) ---
  { keyword: "motherboard b550 asus", category: "motherboard", store: "Amazon" },
  { keyword: "motherboard b550 msi tomahawk", category: "motherboard", store: "Amazon" },
  { keyword: "motherboard b650 gigabyte aorus", category: "motherboard", store: "Amazon" },
  { keyword: "motherboard x670 asus tuf", category: "motherboard", store: "Amazon" },
  // --- Intel (LGA 1700) ---
  { keyword: "motherboard b760 msi", category: "motherboard", store: "Amazon" },
  { keyword: "motherboard z790 asus prime", category: "motherboard", store: "Amazon" },
  { keyword: "motherboard z790 gigabyte", category: "motherboard", store: "Amazon" },
];
