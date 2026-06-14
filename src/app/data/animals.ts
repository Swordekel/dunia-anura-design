export interface Animal {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  image: string;
  description: string;
  habitat: string;
  diet: string;
  size: string;
  lifespan: string;
  conservationStatus: string;
  funFacts: string[];
  educationalInfo: {
    behavior: string;
    reproduction: string;
    threats: string;
    conservation: string;
  };
  difficulty: string;
}

export const animals: Animal[] = [
  {
    id: 1,
    name: "Poison Dart Frog",
    scientificName: "Dendrobates tinctorius",
    category: "amphibi",
    image: "https://images.unsplash.com/photo-1704112745943-2e66b8aece02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2lzb24lMjBkYXJ0JTIwZnJvZ3xlbnwxfHx8fDE3NjcwMTY0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Katak panah beracun adalah salah satu amfibi paling berwarna di dunia. Warna cerah mereka berfungsi sebagai peringatan kepada predator tentang racun yang mereka miliki.",
    habitat: "Hutan hujan tropis Amerika Selatan, terutama di lantai hutan yang lembab",
    diet: "Karnivora - memakan semut, rayap, dan serangga kecil lainnya",
    size: "2-6 cm panjang",
    lifespan: "10-15 tahun di alam liar, hingga 20 tahun dalam penangkaran",
    conservationStatus: "Least Concern - Beberapa spesies Endangered",
    funFacts: [
      "Racun mereka berasal dari makanan yang mereka konsumsi di alam liar",
      "Dalam penangkaran, mereka tidak mengembangkan racun karena perbedaan diet",
      "Suku asli Amazon menggunakan racun mereka untuk ujung panah berburu",
      "Setiap katak memiliki pola warna yang unik seperti sidik jari"
    ],
    educationalInfo: {
      behavior: "Katak ini aktif di siang hari (diurnal) dan sangat teritorial. Jantan akan bertarung untuk mempertahankan wilayah mereka dengan gulat dan vokalisasi.",
      reproduction: "Betina bertelur 2-6 butir. Jantan menjaga telur hingga menetas, kemudian membawa kecebong di punggungnya ke genangan air kecil di dedaunan.",
      threats: "Deforestasi hutan hujan, perubahan iklim, dan perdagangan hewan liar ilegal menjadi ancaman utama.",
      conservation: "Program penangkaran dan pelestarian habitat hutan hujan sangat penting untuk kelangsungan hidup spesies ini."
    },
    difficulty: "Sulit"
  },
  {
    id: 2,
    name: "Red-Eyed Tree Frog",
    scientificName: "Agalychnis callidryas",
    category: "amphibi",
    image: "https://images.unsplash.com/photo-1698435354321-0bccb1549b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBleWVkJTIwdHJlZSUyMGZyb2d8ZW58MXx8fHwxNzY3MDE3NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Katak pohon bermata merah adalah ikon hutan hujan dengan mata merah menyala yang menakjubkan. Mereka adalah spesies arboreal yang menghabiskan sebagian besar waktu di pohon.",
    habitat: "Hutan hujan tropis Amerika Tengah dan Selatan, hidup di kanopi pohon dekat sumber air",
    diet: "Karnivora - memakan jangkrik, ngengat, lalat, dan serangga terbang lainnya",
    size: "5-7 cm panjang",
    lifespan: "5 tahun di alam liar, hingga 5 tahun dalam penangkaran",
    conservationStatus: "Least Concern",
    funFacts: [
      "Mata merah mereka digunakan untuk mengejutkan predator (startle coloration)",
      "Mereka dapat mengubah warna kulit untuk kamuflase",
      "Kaki berwarna oranye terang hanya terlihat saat melompat",
      "Tidur dengan mata tertutup, menyembunyikan warna merah yang mencolok"
    ],
    educationalInfo: {
      behavior: "Nokturnal dan arboreal. Mereka memiliki bantalan perekat di kaki yang memungkinkan mereka menempel di permukaan licin dan vertikal.",
      reproduction: "Betina bertelur 40 butir di atas daun yang menggantung di atas air. Saat menetas, kecebong jatuh langsung ke air di bawahnya.",
      threats: "Kehilangan habitat karena deforestasi, polusi air, dan perubahan iklim yang mempengaruhi pola hujan.",
      conservation: "Dilindungi di beberapa taman nasional. Penelitian tentang dampak perubahan iklim terhadap siklus reproduksi sedang berlangsung."
    },
    difficulty: "Sedang"
  },
  {
    id: 3,
    name: "African Bullfrog",
    scientificName: "Pyxicephalus adspersus",
    category: "amphibi",
    image: "https://images.unsplash.com/photo-1685331010370-56f1a0791079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVsbGZyb2d8ZW58MXx8fHwxNzY3MDE3NzE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Katak banteng Afrika adalah salah satu katak terbesar di dunia. Jantan sangat protektif terhadap telur dan kecebong mereka, bahkan melawan predator yang jauh lebih besar.",
    habitat: "Sabana dan padang rumput di sub-Sahara Afrika, hidup di dekat kolam musiman",
    diet: "Karnivora oportunistik - memakan serangga, tikus, burung kecil, reptil, dan bahkan katak lain",
    size: "Jantan hingga 24 cm, betina 12 cm",
    lifespan: "20-40 tahun",
    conservationStatus: "Least Concern",
    funFacts: [
      "Dapat hidup di bawah tanah hingga 10 bulan selama musim kering",
      "Jantan memiliki duri di jempol untuk pertarungan",
      "Suara panggilan jantan bisa terdengar hingga 1.4 km",
      "Dapat memakan mangsa hingga setengah ukuran tubuh mereka"
    ],
    educationalInfo: {
      behavior: "Sangat agresif dan teritorial. Jantan akan melindungi kecebong mereka dengan gigitan kuat yang bisa melukai.",
      reproduction: "Bertelur hingga 4000 butir di kolam musiman. Jantan menjaga telur dan menggali saluran air untuk kecebong saat kolam mengering.",
      threats: "Perburuan untuk konsumsi manusia di beberapa wilayah, polusi, dan hilangnya habitat lahan basah.",
      conservation: "Program edukasi masyarakat tentang peran penting katak dalam ekosistem dan pengendalian hama."
    },
    difficulty: "Mudah"
  },
  {
    id: 4,
    name: "Mandarin Fish",
    scientificName: "Synchiropus splendidus",
    category: "ikan",
    image: "https://images.unsplash.com/photo-1550016681-60a1d9d23bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5kYXJpbiUyMGRyYWdvbmV0JTIwZmlzaHxlbnwxfHx8fDE3NjcwMTc3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Ikan mandarin adalah salah satu ikan laut paling berwarna dan indah. Mereka terkenal dengan warna biru elektrik dan pola oranye yang spektakuler, hasil dari pigmen seluler bukan pantulan cahaya.",
    habitat: "Terumbu karang Indo-Pasifik, hidup di laguna yang terlindung dan terumbu dangkal",
    diet: "Karnivora - memakan copepoda, amphipoda, dan invertebrata kecil lainnya",
    size: "6-8 cm panjang",
    lifespan: "10-15 tahun",
    conservationStatus: "Least Concern - namun rentan terhadap degradasi terumbu karang",
    funFacts: [
      "Satu-satunya ikan vertebrata yang memiliki warna biru sejati (bukan iridescent)",
      "Kulitnya menghasilkan lendir beracun yang melindungi dari parasit dan predator",
      "Ritual kawin mereka spektakuler, terjadi saat senja dengan 'tarian' yang rumit",
      "Tidak memiliki sisik - kulit mereka tertutup lendir tebal"
    ],
    educationalInfo: {
      behavior: "Sangat pemalu dan aktif saat senja. Mereka menghabiskan hari dengan bersembunyi di celah karang dan berburu copepoda di antara karang.",
      reproduction: "Pasangan monogami melakukan ritual tarian kawin yang rumit. Telur dilepaskan di kolom air dan larva planktonik.",
      threats: "Degradasi terumbu karang, pemutihan karang, penangkapan berlebihan untuk akuarium, dan polusi laut.",
      conservation: "Perlindungan terumbu karang dan program penangkaran berkelanjutan penting untuk melindungi populasi liar."
    },
    difficulty: "Sulit"
  },
  {
    id: 5,
    name: "Lionfish",
    scientificName: "Pterois volitans",
    category: "ikan",
    image: "https://images.unsplash.com/photo-1729799831872-3cda04f81531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uZmlzaCUyMG9jZWFufGVufDF8fHx8MTc2Njk5Njc5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Ikan singa adalah predator yang cantik namun mematikan dengan sirip seperti pita dan duri beracun. Di beberapa wilayah, mereka menjadi spesies invasif yang merusak ekosistem lokal.",
    habitat: "Terumbu karang Indo-Pasifik (asli), juga invasif di Atlantik Barat dan Karibia",
    diet: "Karnivora - memakan ikan kecil, krustasea, dan moluska",
    size: "30-38 cm panjang",
    lifespan: "10-15 tahun",
    conservationStatus: "Least Concern - tetapi spesies invasif di beberapa wilayah",
    funFacts: [
      "Dapat memakan ikan hingga setengah ukuran tubuh mereka dalam satu tegukan",
      "Duri mereka mengandung racun yang menyebabkan rasa sakit luar biasa pada manusia",
      "Tidak memiliki predator alami di wilayah invasif mereka",
      "Betina dapat bertelur hingga 30,000 butir setiap 4 hari"
    ],
    educationalInfo: {
      behavior: "Predator ambush yang berburu dengan mengepakkan sirip pektoralnya untuk menggerumuni mangsa. Aktif saat fajar dan senja.",
      reproduction: "Sangat produktif dengan laju reproduksi tinggi. Telur mengapung dan menetas dalam 36 jam, menyebar dengan arus laut.",
      threats: "Di habitat asli: degradasi terumbu. Di wilayah invasif: mereka yang menjadi ancaman bagi ikan asli dan ekosistem terumbu.",
      conservation: "Program pengendalian populasi di wilayah invasif. Kampanye 'Eat Lionfish' mendorong konsumsi untuk mengurangi populasi invasif."
    },
    difficulty: "Sedang"
  },
  {
    id: 6,
    name: "Seahorse",
    scientificName: "Hippocampus",
    category: "ikan",
    image: "https://images.unsplash.com/photo-1615708257979-d365fa66d1cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFob3JzZSUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzY3MDE3NzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Kuda laut adalah ikan unik dengan postur tegak dan kepala berbentuk seperti kuda. Mereka terkenal karena jantan yang hamil dan melahirkan anak.",
    habitat: "Perairan pantai tropis dan sedang di seluruh dunia, hidup di padang lamun dan terumbu karang",
    diet: "Karnivora - memakan zooplankton, krustasea kecil, dan larva ikan",
    size: "1.5-35 cm tergantung spesies",
    lifespan: "1-5 tahun tergantung spesies",
    conservationStatus: "Vulnerable hingga Endangered (banyak spesies terancam)",
    funFacts: [
      "Jantan yang hamil, bukan betina - betina mentransfer telur ke kantung jantan",
      "Dapat menggerakkan mata secara independen seperti bunglon",
      "Tidak memiliki gigi atau perut - makanan langsung masuk ke usus",
      "Pasangan monogami yang melakukan 'tarian' setiap pagi untuk memperkuat ikatan"
    ],
    educationalInfo: {
      behavior: "Perenang lambat yang menggunakan sirip dorsal untuk propulsi. Ekor prehensile digunakan untuk berpegangan pada tanaman laut.",
      reproduction: "Setelah kawin rumit, betina mentransfer telur ke kantung jantan. Jantan mengerami 100-1000 telur selama 2-4 minggu sebelum 'melahirkan'.",
      threats: "Penangkapan berlebihan untuk pengobatan tradisional, akuarium, dan suvenir. Degradasi habitat padang lamun dan terumbu karang.",
      conservation: "Banyak spesies dilindungi CITES. Program penangkaran dan restorasi habitat padang lamun sedang dilakukan di seluruh dunia."
    },
    difficulty: "Sulit"
  }
];

export const categories = [
  { id: 'all', name: 'Semua Hewan', icon: '🌍' },
  { id: 'amphibi', name: 'Amfibi', icon: '🐸' },
  { id: 'ikan', name: 'Ikan Laut', icon: '🐠' }
];