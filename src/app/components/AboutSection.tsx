import { motion } from 'motion/react';
import { Award, BookOpen, Heart, Users, Sparkles, CheckCircle, Microscope, GraduationCap } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: BookOpen,
      title: 'Konten Edukatif',
      description: 'Artikel dan panduan lengkap tentang habitat, perilaku, dan konservasi hewan eksotis.',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Microscope,
      title: 'Berbasis Sains',
      description: 'Informasi yang akurat dan terpercaya berdasarkan penelitian ilmiah terkini.',
      gradient: 'from-primary/20 to-emerald-500/20'
    },
    {
      icon: Heart,
      title: 'Konservasi',
      description: 'Meningkatkan kesadaran tentang pentingnya melindungi spesies langka dan habitatnya.',
      gradient: 'from-rose-500/20 to-pink-500/20'
    },
    {
      icon: GraduationCap,
      title: 'Untuk Semua',
      description: 'Platform belajar yang cocok untuk pelajar, pendidik, dan pecinta hewan.',
      gradient: 'from-amber-500/20 to-orange-500/20'
    }
  ];

  const missions = [
    'Menyediakan informasi edukatif berkualitas tinggi',
    'Meningkatkan kesadaran konservasi',
    'Mendukung penelitian dan edukasi',
    'Membangun komunitas pecinta alam',
    'Melindungi keanekaragaman hayati',
    'Menginspirasi generasi masa depan'
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-full blur-3xl"
      />

      <div className="relative container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-6 backdrop-blur-xl bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/30 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Tentang Kami
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-emerald-200 via-primary to-emerald-400 bg-clip-text text-transparent tracking-tight">
            DuniaAnura
          </h2>
          <p className="text-lg md:text-xl text-emerald-200/60 max-w-3xl mx-auto leading-relaxed">
            Platform edukasi hewan eksotis terpercaya sejak 2015
          </p>
        </motion.div>

        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-24"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500" />
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-3xl p-10 md:p-12 shadow-2xl">
              <h3 className="text-3xl text-primary mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                Misi Kami
              </h3>
              <div className="space-y-6 text-emerald-100/80 text-lg leading-relaxed">
                <p>
                  DuniaAnura lahir dari kecintaan mendalam terhadap keindahan dan keunikan amfibi serta kehidupan laut eksotis. 
                  Kami percaya bahwa edukasi adalah kunci untuk melindungi spesies-spesies luar biasa ini dari kepunahan.
                </p>
                <p>
                  Melalui platform kami, kami menyediakan informasi ilmiah yang akurat dan mudah dipahami tentang habitat, 
                  perilaku, dan ancaman yang dihadapi oleh amfibi dan ikan laut. Setiap konten disusun dengan cermat berdasarkan 
                  penelitian terkini dan bekerja sama dengan para ahli herpetologi dan biologi kelautan.
                </p>
                <p>
                  Visi kami adalah menciptakan generasi yang peduli terhadap konservasi dan keanekaragaman hayati. 
                  Kami tidak hanya fokus pada penyediaan informasi, tetapi juga membangun komunitas pecinta alam yang bertanggung jawab 
                  dan aktif dalam upaya pelestarian lingkungan.
                </p>
              </div>

              {/* Mission Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-10">
                {missions.map((mission, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 backdrop-blur-xl bg-white/5 border border-primary/10 rounded-2xl hover:border-primary/30 transition-all group"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-emerald-200/80">{mission}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
              <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-3xl p-8 hover:border-primary/40 transition-all">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl text-emerald-100 mb-3">{feature.title}</h4>
                <p className="text-sm text-emerald-200/60 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50+', label: 'Spesies Didokumentasi' },
              { value: '10K+', label: 'Pembaca Bulanan' },
              { value: '100+', label: 'Artikel Edukatif' },
              { value: '15+', label: 'Pakar Kolaborator' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all" />
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-2xl p-6 text-center hover:border-primary/40 transition-all">
                  <div className="text-4xl md:text-5xl bg-gradient-to-br from-primary to-emerald-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-emerald-200/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur group-hover:blur-md transition-all opacity-50" />
              <div className="relative px-10 py-5 bg-gradient-to-r from-primary to-emerald-400 text-black rounded-2xl shadow-lg text-lg flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Dukung Konservasi
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 backdrop-blur-xl bg-white/5 border-2 border-primary/30 text-primary rounded-2xl hover:bg-white/10 hover:border-primary/50 transition-all text-lg flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Mulai Belajar
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
