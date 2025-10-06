// Mock data untuk admin dashboard - Yamaha Warrior Community
export const mockMembers = [
  {
    id: 1,
    email: 'ahmad.rizki@gmail.com',
    name: 'Ahmad Rizki',
    phone: '081234567890',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    yamahaBrand: 'NMAX',
    challenges: [
      { id: 1, name: 'Yamaha Ride Adventure', status: 'completed', points: 100 },
      { id: 2, name: 'Creative Photo Challenge', status: 'pending', points: 0 },
      { id: 3, name: 'Video Story Challenge', status: 'completed', points: 150 }
    ],
    totalPoints: 1250,
    joinedAt: '2024-01-15',
    lastActive: '2024-01-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    email: 'sari.indah@yahoo.com',
    name: 'Sari Indah',
    phone: '081234567891',
    address: 'Jl. Thamrin No. 456, Jakarta Pusat',
    yamahaBrand: 'Aerox',
    challenges: [
      { id: 1, name: 'Yamaha Ride Adventure', status: 'completed', points: 100 },
      { id: 2, name: 'Creative Photo Challenge', status: 'completed', points: 75 },
      { id: 4, name: 'Community Ride Challenge', status: 'pending', points: 0 }
    ],
    totalPoints: 1100,
    joinedAt: '2024-01-10',
    lastActive: '2024-01-19',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    email: 'budi.santoso@gmail.com',
    name: 'Budi Santoso',
    phone: '081234567892',
    address: 'Jl. Gatot Subroto No. 789, Jakarta Selatan',
    yamahaBrand: 'MT-15',
    challenges: [
      { id: 2, name: 'Creative Photo Challenge', status: 'completed', points: 75 },
      { id: 3, name: 'Video Story Challenge', status: 'pending', points: 0 },
      { id: 4, name: 'Community Ride Challenge', status: 'completed', points: 80 }
    ],
    totalPoints: 950,
    joinedAt: '2024-01-12',
    lastActive: '2024-01-18',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    email: 'maya.sari@gmail.com',
    name: 'Maya Sari',
    phone: '081234567893',
    address: 'Jl. Kemang Raya No. 321, Jakarta Selatan',
    yamahaBrand: 'R15',
    challenges: [
      { id: 1, name: 'Yamaha Ride Adventure', status: 'completed', points: 100 },
      { id: 3, name: 'Video Story Challenge', status: 'completed', points: 150 },
      { id: 4, name: 'Community Ride Challenge', status: 'completed', points: 80 }
    ],
    totalPoints: 1350,
    joinedAt: '2024-01-08',
    lastActive: '2024-01-21',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    email: 'doni.pratama@gmail.com',
    name: 'Doni Pratama',
    phone: '081234567894',
    address: 'Jl. Senayan No. 654, Jakarta Pusat',
    yamahaBrand: 'NMAX',
    challenges: [
      { id: 2, name: 'Creative Photo Challenge', status: 'completed', points: 75 },
      { id: 4, name: 'Community Ride Challenge', status: 'completed', points: 80 }
    ],
    totalPoints: 800,
    joinedAt: '2024-01-20',
    lastActive: '2024-01-21',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
]

export const mockChallenges = [
  {
    id: 1,
    name: 'Pilano My Style',
    periode: '2024-01-01 - 2024-01-31',
    description: 'Peserta membuat video TikTok atau Instagram Reels yang menunjukkan momen sehari-hari dengan gaya feminim dan pastel yang memorable.',
    requirements: 'Video harus menunjukkan gaya feminim dan pastel, durasi maksimal 60 detik, tag @yamahamotorindo dan #YamahaWarior, submit screenshot sebagai bukti.',
    reward: '100 points + Yamaha merchandise eksklusif',
    status: 'active',
    participants: 1250,
    submissions: 890,
    createdAt: '2024-01-01',
    image: 'https://yamahasumberbarumotor.com/wp-content/uploads/2023/12/banner-1.jpg',
    category: 'Social Media',
    difficulty: 'Easy',
    tags: ['TikTok', 'Instagram', 'Fashion', 'Pilano']
  },
  {
    id: 2,
    name: 'Fazzio Fashion Ride',
    periode: '2024-01-15 - 2024-02-15',
    description: 'Peserta membuat video Instagram atau TikTok yang menunjukkan gaya outfit paling keren dengan Yamaha Fazzio.',
    requirements: 'Video harus menunjukkan outfit keren dengan Fazzio, durasi maksimal 60 detik, tag @yamahamotorindo dan #YamahaWarior, submit screenshot sebagai bukti.',
    reward: '250 points + Voucher Yamaha senilai Rp 500.000',
    status: 'active',
    participants: 890,
    submissions: 650,
    createdAt: '2024-01-15',
    image: 'https://www.tjahaja-baru.com/uploads/products/groups/banner/a9bf749187c4656490e4ae1e06158a2f.jpeg',
    category: 'Content Creation',
    difficulty: 'Medium',
    tags: ['Fashion', 'Fazzio', 'Style', 'Content']
  },
  {
    id: 3,
    name: 'NMAX Your Style',
    periode: '2024-01-20 - 2024-02-20',
    description: 'Ekspresi diri dan gaya hidup urban dengan NMAX. Tunjukkan petualangan singkat dan lifestyle kamu bersama NMAX.',
    requirements: 'Video/foto harus menunjukkan lifestyle urban dengan NMAX, durasi maksimal 60 detik, tag @yamahamotorindo dan #YamahaWarior, submit screenshot sebagai bukti.',
    reward: '150 points + Yamaha merchandise + voucher',
    status: 'active',
    participants: 2100,
    submissions: 1650,
    createdAt: '2024-01-20',
    image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    category: 'Community',
    difficulty: 'Easy',
    tags: ['NMAX', 'Urban', 'Lifestyle', 'Adventure']
  },
  {
    id: 4,
    name: 'NMAX Smart Journey',
    periode: '2024-01-25 - 2024-02-25',
    description: 'Tantangan membuat video dokumentasi perjalanan untuk profesional muda yang menunjukkan sisi kepraktisan, efisiensi, dan gaya hidup smart professional.',
    requirements: 'Video dokumentasi perjalanan profesional, durasi maksimal 60 detik, tag @yamahamotorindo dan #YamahaWarior, submit screenshot sebagai bukti.',
    reward: '300 points + Yamaha merchandise + voucher service',
    status: 'active',
    participants: 670,
    submissions: 420,
    createdAt: '2024-01-25',
    image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    category: 'Photography',
    difficulty: 'Medium',
    tags: ['NMAX', 'Professional', 'Journey', 'Smart']
  },
  {
    id: 5,
    name: 'Yamaha Filano Hybrid',
    periode: '2024-02-01 - 2024-02-28',
    description: 'Tunjukkan gaya riding yang mix-and-match outfit keren hari dengan motor gaya hidup chic',
    requirements: 'Video/foto mix-and-match outfit dengan Filano Hybrid, durasi maksimal 60 detik, tag @yamahamotorindo dan #YamahaWarior, submit screenshot sebagai bukti.',
    reward: '500 points + Grand Prize: Helm Yamaha + Voucher Rp 1.000.000',
    status: 'active',
    participants: 345,
    submissions: 280,
    createdAt: '2024-02-01',
    image: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/11/Yamaha-Filano-Hybrid-Lux.png',
    category: 'Event',
    difficulty: 'Hard',
    tags: ['Filano', 'Hybrid', 'Fashion', 'Chic']
  }
]

export const mockSubmissions = [
  {
    id: 1,
    participantName: 'Ahmad Rizki',
    challengeName: 'Pilano My Style',
    challengeId: 1,
    url: 'https://instagram.com/p/abc123',
    screenshot: 'https://yamahasumberbarumotor.com/wp-content/uploads/2023/12/banner-1.jpg',
    status: 'approved',
    submittedAt: '2024-01-20T10:30:00Z',
    reviewedAt: '2024-01-20T15:30:00Z',
    reviewer: 'Admin Yamaha',
    notes: 'Video bagus, menunjukkan gaya feminim dan pastel dengan jelas, sesuai requirements'
  },
  {
    id: 2,
    participantName: 'Sari Indah',
    challengeName: 'Fazzio Fashion Ride',
    challengeId: 2,
    url: 'https://instagram.com/p/def456',
    screenshot: 'https://www.tjahaja-baru.com/uploads/products/groups/banner/a9bf749187c4656490e4ae1e06158a2f.jpeg',
    status: 'approved',
    submittedAt: '2024-01-19T14:20:00Z',
    reviewedAt: '2024-01-20T09:15:00Z',
    reviewer: 'Admin Yamaha',
    notes: 'Video fashion sangat kreatif, outfit keren dengan Fazzio, komposisi bagus'
  },
  {
    id: 3,
    participantName: 'Budi Santoso',
    challengeName: 'Pilano My Style',
    challengeId: 1,
    url: 'https://instagram.com/p/ghi789',
    screenshot: 'https://yamahasumberbarumotor.com/wp-content/uploads/2023/12/banner-1.jpg',
    status: 'rejected',
    submittedAt: '2024-01-18T16:45:00Z',
    reviewedAt: '2024-01-19T11:30:00Z',
    reviewer: 'Moderator Yamaha',
    notes: 'Video tidak menunjukkan gaya feminim dan pastel dengan jelas, coba buat ulang'
  },
  {
    id: 4,
    participantName: 'Maya Sari',
    challengeName: 'NMAX Your Style',
    challengeId: 3,
    url: 'https://instagram.com/p/jkl012',
    screenshot: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    status: 'approved',
    submittedAt: '2024-01-21T08:15:00Z',
    reviewedAt: '2024-01-21T12:30:00Z',
    reviewer: 'Admin Yamaha',
    notes: 'Video lifestyle urban sangat menarik, menunjukkan NMAX dengan baik'
  },
  {
    id: 5,
    participantName: 'Doni Pratama',
    challengeName: 'NMAX Smart Journey',
    challengeId: 4,
    url: 'https://instagram.com/p/mno345',
    screenshot: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    status: 'pending',
    submittedAt: '2024-01-21T16:20:00Z',
    reviewedAt: null,
    reviewer: null,
    notes: ''
  },
  {
    id: 6,
    participantName: 'Ahmad Rizki',
    challengeName: 'NMAX Your Style',
    challengeId: 3,
    url: 'https://instagram.com/p/pqr678',
    screenshot: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    status: 'approved',
    submittedAt: '2024-01-20T14:30:00Z',
    reviewedAt: '2024-01-21T10:15:00Z',
    reviewer: 'Admin Yamaha',
    notes: 'Video lifestyle bagus, menunjukkan petualangan urban dengan NMAX'
  },
  {
    id: 7,
    participantName: 'Sari Indah',
    challengeName: 'Yamaha Filano Hybrid',
    challengeId: 5,
    url: 'https://instagram.com/p/stu901',
    screenshot: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/11/Yamaha-Filano-Hybrid-Lux.png',
    status: 'approved',
    submittedAt: '2024-01-22T09:30:00Z',
    reviewedAt: '2024-01-22T14:20:00Z',
    reviewer: 'Admin Yamaha',
    notes: 'Video mix-and-match outfit sangat chic, sesuai dengan tema Filano Hybrid'
  }
]

export const mockLeaderboard = [
  {
    challengeId: 1,
    challengeName: 'Pilano My Style',
    participants: [
      { rank: 1, name: 'Ahmad Rizki', points: 100, submittedAt: '2024-01-20', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      { rank: 2, name: 'Maya Sari', points: 95, submittedAt: '2024-01-19', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
      { rank: 3, name: 'Sari Indah', points: 90, submittedAt: '2024-01-18', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
    ]
  },
  {
    challengeId: 2,
    challengeName: 'Fazzio Fashion Ride',
    participants: [
      { rank: 1, name: 'Sari Indah', points: 250, submittedAt: '2024-01-19', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
      { rank: 2, name: 'Doni Pratama', points: 240, submittedAt: '2024-01-18', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
      { rank: 3, name: 'Budi Santoso', points: 230, submittedAt: '2024-01-17', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
    ]
  },
  {
    challengeId: 3,
    challengeName: 'NMAX Your Style',
    participants: [
      { rank: 1, name: 'Maya Sari', points: 150, submittedAt: '2024-01-21', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
      { rank: 2, name: 'Ahmad Rizki', points: 145, submittedAt: '2024-01-20', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      { rank: 3, name: 'Sari Indah', points: 140, submittedAt: '2024-01-19', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
    ]
  }
]

export const mockWinners = [
  {
    challengeId: 1,
    challengeName: 'Pilano My Style',
    periode: '2024-01-01 - 2024-01-31',
    winners: [
      { rank: 1, name: 'Ahmad Rizki', points: 100, prize: 'Yamaha merchandise eksklusif + 100 points', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      { rank: 2, name: 'Maya Sari', points: 95, prize: 'Voucher Yamaha + 75 points', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
      { rank: 3, name: 'Sari Indah', points: 90, prize: 'Voucher Yamaha + 50 points', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
    ],
    totalParticipants: 1250,
    totalSubmissions: 890
  },
  {
    challengeId: 2,
    challengeName: 'Fazzio Fashion Ride',
    periode: '2024-01-15 - 2024-02-15',
    winners: [
      { rank: 1, name: 'Sari Indah', points: 250, prize: 'Voucher Yamaha senilai Rp 500.000 + 250 points', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
      { rank: 2, name: 'Doni Pratama', points: 240, prize: 'Voucher Yamaha + 200 points', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
      { rank: 3, name: 'Budi Santoso', points: 230, prize: 'Voucher Yamaha + 150 points', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
    ],
    totalParticipants: 890,
    totalSubmissions: 650
  },
  {
    challengeId: 3,
    challengeName: 'NMAX Your Style',
    periode: '2024-01-20 - 2024-02-20',
    winners: [
      { rank: 1, name: 'Maya Sari', points: 150, prize: 'Yamaha merchandise + voucher + 150 points', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
      { rank: 2, name: 'Ahmad Rizki', points: 145, prize: 'Voucher Yamaha + merchandise', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      { rank: 3, name: 'Sari Indah', points: 140, prize: 'Voucher Yamaha + merchandise', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
    ],
    totalParticipants: 2100,
    totalSubmissions: 1650
  }
]
