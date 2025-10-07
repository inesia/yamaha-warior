import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Trophy, Share2, Users, ArrowRight, Upload, Award, TrendingUp, Gift, Video, Instagram, Camera } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const Landing = () => {
  const navigate = useNavigate()

  const handleJoinChallenge = (challengeId = null) => {
    // Simpan challenge ID yang dipilih ke localStorage untuk redirect setelah login
    if (challengeId) {
      localStorage.setItem('selectedChallengeId', challengeId.toString())
    }
    
    // Redirect ke halaman login
    navigate('/login')
  }

  const heroSlides = [
    {
      id: 1,
      title: 'Jadilah Warior',
      subtitle: 'Ikuti Challenge Yamaha dan Raih Hadiahnya',
      image: '/images/hero1.jpg',
      cta: 'Mulai Challenge',
    },
    {
      id: 2,
      title: 'Bagikan Momenmu',
      subtitle: 'Tunjukkan Kebanggaanmu di Social Media',
      image: '/images/hero2.jpg',
      cta: 'Lihat Challenge',
    },
    {
      id: 3,
      title: 'Menangkan Hadiah',
      subtitle: 'Berkompetisi dan Dapatkan Hadiah Menarik',
      image: '/images/hero3.jpg',
      cta: 'Join Sekarang',
    },
  ]

  const featuredChallenges = [
    {
      id: 1,
      hashtag: '#PILANOMYSTYLE',
      title: 'Pilano My Style',
      target: 'Wanita Muda',
      product: 'Yamaha Filano',
      description: 'Peserta membuat video TikTok atau Instagram Reels yang menunjukkan momen sehari-hari dengan gaya feminim dan pastel yang memorable.',
      requirements: [
        'Perlihatkan gaya riding yang mix-and-match outfit keren hari dengan motor gaya hidup chic',
        'Gunakan hashtag #PilanoMyStyle',
      ],
      reward: 'Yamaha Filano, produk kecantikan',
      color: 'from-pink-500 to-purple-500',
      image: 'https://yamahasumberbarumotor.com/wp-content/uploads/2023/12/banner-1.jpg',
    },
    {
      id: 2,
      hashtag: '#FAZZIOFASHIONRIDE',
      title: 'Fazzio Fashion Ride',
      target: 'Wanita Muda',
      product: 'Yamaha Fazzio',
      description: 'Peserta membuat video Instagram atau TikTok yang menunjukkan gaya outfit paling keren dengan Yamaha Fazzio.',
      requirements: [
        'Kreatifitas pemilihan lokasi, outfit, dan tema',
        'Gunakan hashtag #FazzioFashionRide',
      ],
      reward: 'Voucher fashion, tas, dan paket skin care',
      color: 'from-blue-500 to-cyan-500',
      image: 'https://www.tjahaja-baru.com/uploads/products/groups/banner/a9bf749187c4656490e4ae1e06158a2f.jpeg',
    },
    {
      id: 3,
      hashtag: '#NMAXSTYLE',
      title: 'NMAX Your Style',
      target: 'Lifestyle Enthusiast',
      product: 'Yamaha NMAX',
      description: 'Ekspresi diri dan gaya hidup urban dengan NMAX. Tunjukkan petualangan singkat dan lifestyle kamu bersama NMAX.',
      requirements: [
        'Video perjalanan singkat dengan NMAX',
        'Tunjukkan gaya hidup urban yang dinamis',
      ],
      reward: 'Gadget, voucher traveling, dan merchandise NMAX',
      color: 'from-yellow-500 to-orange-500',
      image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    },
    {
      id: 4,
      hashtag: '#NMAXSMARTJOURNEY',
      title: 'NMAX Smart Journey',
      target: 'Professional Muda',
      product: 'Yamaha NMAX',
      description: 'Tantangan membuat video dokumentasi perjalanan untuk profesional muda yang menunjukkan sisi kepraktisan, efisiensi, dan gaya hidup smart professional.',
      requirements: [
        'Dokumentasi perjalanan daily commute atau trip',
        'Tunjukkan aspek kepraktisan, flur kecerdasan',
      ],
      reward: 'Gadget pendukung mobilitas, earphones, tas laptop, dan power bank',
      color: 'from-indigo-500 to-blue-600',
      image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    },
  ]

  const howItWorksSteps = [
    {
      icon: Upload,
      title: 'Upload Konten',
      description: 'Bagikan momen berkendara Yamaha kamu di social media',
    },
    {
      icon: Share2,
      title: 'Dapatkan Poin',
      description: 'Raih poin untuk setiap submission yang valid',
    },
    {
      icon: Award,
      title: 'Menangkan Hadiah',
      description: 'Bersaing untuk mendapatkan hadiah eksklusif',
    },
  ]

  const stats = [
    { number: '10K+', label: 'Warior Aktif' },
    { number: '50K+', label: 'Challenge Selesai' },
    { number: '500+', label: 'Hadiah Dibagikan' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Swiper */}
      <section className="relative h-[80vh] bg-gradient-yamaha overflow-hidden" style={{ margin: 0, padding: 0 }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full"
          style={{ 
            margin: 0, 
            padding: 0,
            overflow: 'hidden',
            borderRadius: 0,
            border: 'none',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide 
              key={slide.id} 
              style={{ 
                margin: 0, 
                padding: 0, 
                overflow: 'hidden',
                border: 'none',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              <div 
                className="relative h-full w-full" 
                style={{ 
                  margin: 0, 
                  padding: 0, 
                  overflow: 'hidden',
                  border: 'none',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                {/* Background Image with overlay */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    overflow: 'hidden',
                    border: 'none',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    style={{ 
                      display: 'block',
                      margin: 0,
                      padding: 0,
                      border: 'none',
                      outline: 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-blue-900/80 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 pb-20 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-2 bg-yamaha-blue/90 backdrop-blur-sm px-4 py-2 mb-4">
                      <Trophy size={18} className="text-white" />
                      <span className="text-sm font-bold">Yamaha Warior Challenge</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl font-medium text-white/90 mb-6 max-w-md">
                      {slide.subtitle}
                    </p>
                  <button
                    onClick={() => handleJoinChallenge()}
                    className="bg-yamaha-blue hover:bg-yamaha-blue/90 text-white font-bold px-8 py-4 inline-flex items-center gap-2 transition-all clip-corner"
                  >
                    {slide.cta}
                    <ArrowRight size={20} />
                  </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Logo Badge */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-white/20 backdrop-blur-md px-5 py-2.5 border-l-4 border-yamaha-blue">
            <h2 className="text-white font-black text-lg tracking-wide">YAMAHA WARIOR</h2>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 text-white py-8">
        <div className="max-w-lg mx-auto px-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-black text-white mb-1">{stat.number}</div>
                <div className="text-xs text-blue-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-yamaha-blue/10 text-yamaha-blue px-5 py-2.5 border-l-4 border-yamaha-blue mb-4">
              <Trophy size={20} />
              <span className="font-bold text-sm">Featured Challenges</span>
            </div>
            <h2 className="text-4xl font-black text-yamaha-dark mb-4">
              Challenge Terpopuler
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pilih challenge yang sesuai dengan style dan motor Yamaha kamu
            </p>
          </motion.div>

          {/* Challenge Cards */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            {featuredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-yamaha-blue"
              >
                {/* Challenge Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${challenge.color} opacity-60`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Challenge Hashtag */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 border-l-4 border-yamaha-blue">
                      <p className="font-black text-yamaha-blue text-sm">{challenge.hashtag}</p>
                    </div>
                  </div>


                  {/* Product Name */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-black text-2xl mb-1">{challenge.title}</h3>
                    <p className="text-white/90 text-sm font-semibold">{challenge.product}</p>
                  </div>
                </div>

                {/* Challenge Content */}
                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {challenge.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-yamaha-dark font-bold text-sm mb-2 flex items-center gap-2">
                      <Video size={16} className="text-yamaha-blue" />
                      Requirements:
                    </h4>
                    <ul className="space-y-1.5">
                      {challenge.requirements.map((req, idx) => (
                        <li key={idx} className="text-gray-600 text-xs flex items-start gap-2">
                          <span className="text-yamaha-blue mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Reward */}
                  <div className="bg-gradient-to-r from-yamaha-blue/10 to-transparent border-l-4 border-yamaha-blue p-3 mb-4">
                    <h4 className="text-yamaha-dark font-bold text-sm mb-1 flex items-center gap-2">
                      <Gift size={16} className="text-yamaha-blue" />
                      Hadiah:
                    </h4>
                    <p className="text-gray-700 text-xs font-semibold">{challenge.reward}</p>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="w-full bg-gradient-yamaha hover:opacity-90 text-white font-bold py-3 flex items-center justify-center gap-2 transition-all clip-corner"
                  >
                    Ikuti Challenge
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-yamaha-blue/10 text-yamaha-blue px-4 py-2 border-l-4 border-yamaha-blue mb-4">
              <Trophy size={20} />
              <span className="font-semibold text-sm">Cara Kerjanya</span>
            </div>
            <h2 className="text-3xl font-black text-yamaha-dark mb-3">
              Mudah & Simpel
            </h2>
            <p className="text-gray-600">
              Tiga langkah mudah untuk menjadi Yamaha Warior
            </p>
          </motion.div>

          <div className="space-y-6">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 shadow-lg shadow-gray-200/50 flex items-start gap-4 border-l-4 border-yamaha-blue"
              >
                <div className="bg-gradient-yamaha p-3 text-white flex-shrink-0">
                  <step.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-yamaha-blue text-white text-xs font-black w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-lg text-yamaha-dark">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-yamaha-blue/5 -translate-y-1/2 translate-x-1/2 rotate-45"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yamaha-blue/5 translate-y-1/2 -translate-x-1/2 rotate-45"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-yamaha-blue/10 text-yamaha-blue px-5 py-2.5 border-l-4 border-yamaha-blue mb-4">
              <Users size={20} />
              <span className="font-bold text-sm">About Program</span>
            </div>
            <h2 className="text-4xl font-black text-yamaha-dark mb-6">
              Yamaha Warior Program
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
              Yamaha Warior adalah program campaign eksklusif untuk pengguna motor matic Yamaha. 
              Kami mengajak kamu untuk menjadi <span className="font-black text-yamaha-blue">share of voice</span> dengan 
              membagikan pengalaman berkendara kamu di social media.
            </p>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Setiap konten yang kamu bagikan akan mendapatkan poin, dan kamu berkesempatan 
              memenangkan berbagai hadiah menarik. Jadilah bagian dari komunitas Yamaha Warior 
              dan tunjukkan kebanggaanmu sebagai rider Yamaha!
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-yamaha p-8 text-white text-center"
            >
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="font-black text-lg mb-2">Bangun Komunitas</h3>
              <p className="text-white/90 text-sm">Bergabung dengan ribuan rider Yamaha lainnya</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-yamaha-dark p-8 text-white text-center border-4 border-yamaha-blue"
            >
              <div className="bg-yamaha-blue/20 backdrop-blur-sm w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift size={32} className="text-yamaha-blue" />
              </div>
              <h3 className="font-black text-lg mb-2">Raih Hadiah</h3>
              <p className="text-white/90 text-sm">Dapatkan hadiah menarik setiap bulannya</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 text-center border-4 border-yamaha-blue shadow-lg"
            >
              <div className="bg-yamaha-blue/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-yamaha-blue" />
              </div>
              <h3 className="font-black text-lg mb-2 text-yamaha-dark">Berkembang Bersama</h3>
              <p className="text-gray-600 text-sm">Tingkatkan skill konten kreator kamu</p>
            </motion.div>
          </div>

          {/* Social Media Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-yamaha-blue/5 to-transparent p-8 border-l-4 border-yamaha-blue"
          >
            <div className="flex items-start gap-4">
              <div className="bg-yamaha-blue text-white p-3">
                <Instagram size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-yamaha-dark font-black text-xl mb-2">Upload di Social Media</h3>
                <p className="text-gray-600 mb-4">
                  Bagikan konten challenge kamu di Instagram, TikTok, atau YouTube dengan hashtag yang sudah ditentukan.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white border-2 border-yamaha-blue text-yamaha-blue px-3 py-1 text-xs font-semibold">
                    Instagram
                  </span>
                  <span className="bg-white border-2 border-yamaha-blue text-yamaha-blue px-3 py-1 text-xs font-semibold">
                    TikTok
                  </span>
                  <span className="bg-white border-2 border-yamaha-blue text-yamaha-blue px-3 py-1 text-xs font-semibold">
                    YouTube
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-yamaha-blue via-blue-600 to-yamaha-dark text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rotate-12"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rotate-45"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 border-l-4 border-white mb-6">
              <Trophy size={20} />
              <span className="font-bold text-sm">Join Now</span>
            </div>

            <h2 className="text-5xl font-black mb-6 leading-tight">
              Siap Jadi Warior?
            </h2>
            <p className="text-white/95 text-xl mb-4 max-w-2xl mx-auto leading-relaxed">
              Bergabung dengan ribuan rider Yamaha dan mulai raih hadiah sekarang!
            </p>
            <p className="text-white/80 mb-10 max-w-xl mx-auto">
              Daftar gratis dan mulai ikuti challenge untuk mendapatkan poin dan hadiah eksklusif.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleJoinChallenge()}
              className="bg-white text-yamaha-blue font-black text-xl px-12 py-5 inline-flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all clip-corner"
            >
              Mulai Sekarang
              <ArrowRight size={26} />
            </motion.button>

            <div className="mt-8 flex items-center justify-center gap-2 text-white/80">
              <Camera size={18} />
              <p className="text-sm">
                Masuk dengan Google untuk memulai perjalanan warior kamu
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 border-l-4 border-green-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400"></div>
                <span className="text-sm font-semibold">Gratis</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 border-l-4 border-green-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400"></div>
                <span className="text-sm font-semibold">Mudah Diikuti</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 border-l-4 border-green-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400"></div>
                <span className="text-sm font-semibold">Hadiah Menarik</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yamaha-dark text-white py-12 px-6 border-t-4 border-yamaha-blue">
        <div className="max-w-4xl mx-auto">
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="font-black text-2xl mb-3 text-white">YAMAHA WARIOR</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platform campaign eksklusif untuk rider Yamaha Indonesia.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-bold text-sm mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/public/challenges')} className="block text-gray-400 hover:text-yamaha-blue transition-colors text-sm">
                  Challenge
                </button>
                <button onClick={() => navigate('/public/leaderboard')} className="block text-gray-400 hover:text-yamaha-blue transition-colors text-sm">
                  Leaderboard
                </button>
                <button onClick={() => navigate('/members')} className="block text-gray-400 hover:text-yamaha-blue transition-colors text-sm">
                  The Warior
                </button>
              </div>
            </div>

            {/* Legal */}
            <div className="text-center md:text-right">
              <h4 className="font-bold text-sm mb-4 text-white">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-yamaha-blue transition-colors text-sm">
                  Syarat & Ketentuan
                </a>
                <a href="#" className="block text-gray-400 hover:text-yamaha-blue transition-colors text-sm">
                  Kebijakan Privasi
                </a>
                <a href="#" className="block text-gray-400 hover:text-yamaha-blue transition-colors text-sm">
                  Hubungi Kami
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Yamaha Motor Indonesia. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://instagram.com/yamahaindonesia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yamaha-blue transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-yamaha-blue transition-colors"
                >
                  <Video size={20} />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-yamaha-blue transition-colors"
                >
                  <Camera size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Landing
