import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Sparkles } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="relative min-h-screen py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Animated Orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-full blur-3xl"
      />

      <div className="relative container mx-auto max-w-7xl">
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
              Get In Touch
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-emerald-200 via-primary to-emerald-400 bg-clip-text text-transparent tracking-tight">
            Hubungi Kami
          </h2>
          <p className="text-lg md:text-xl text-emerald-200/60 max-w-3xl mx-auto leading-relaxed">
            Punya pertanyaan tentang edukasi hewan? Tim kami siap membantu
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-all" />
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-3xl p-8">
                <h3 className="text-2xl text-primary mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Contact Information
                </h3>
                <p className="text-emerald-200/60 mb-8 leading-relaxed">
                  Don't hesitate to contact us through various channels below. 
                  Our team will respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  value: '+62 812-3456-7890',
                  subtitle: 'Mon - Sat, 09:00 - 18:00 WIB',
                  gradient: 'from-blue-500/20 to-cyan-500/20'
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp',
                  value: '+62 812-3456-7890',
                  subtitle: 'Fast response 24/7',
                  gradient: 'from-green-500/20 to-emerald-500/20'
                },
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'info@duniaanura.com',
                  subtitle: 'Response within 24 hours',
                  gradient: 'from-purple-500/20 to-pink-500/20'
                },
                {
                  icon: MapPin,
                  title: 'Address',
                  value: 'Jl. Herpetologi No. 123',
                  subtitle: 'Jakarta Selatan, DKI Jakarta',
                  gradient: 'from-amber-500/20 to-orange-500/20'
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${contact.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all`} />
                  <div className="relative flex items-start gap-5 p-6 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-2xl hover:border-primary/40 transition-all">
                    <div className={`w-14 h-14 bg-gradient-to-br ${contact.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <contact.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-emerald-100 mb-1">{contact.title}</h4>
                      <p className="text-emerald-200/80 mb-1">{contact.value}</p>
                      <p className="text-sm text-emerald-300/50">{contact.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all" />
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h4 className="text-lg text-emerald-100">Business Hours</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-emerald-200/80">
                    <span>Monday - Friday</span>
                    <span>09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between text-emerald-200/80">
                    <span>Saturday</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-emerald-200/60">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all" />
              <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/20 rounded-3xl p-10 shadow-2xl">
                <h3 className="text-3xl text-primary mb-8 flex items-center gap-3">
                  <Send className="w-8 h-8" />
                  Send Message
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-emerald-200/80 mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-5 py-4 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl text-emerald-100 placeholder:text-emerald-400/40 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-emerald-200/80 mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="name@email.com"
                        className="w-full px-5 py-4 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl text-emerald-100 placeholder:text-emerald-400/40 focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-emerald-200/80 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+62 812-3456-7890"
                      className="w-full px-5 py-4 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl text-emerald-100 placeholder:text-emerald-400/40 focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-emerald-200/80 mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="How can we help you?"
                      className="w-full px-5 py-4 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl text-emerald-100 placeholder:text-emerald-400/40 focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-emerald-200/80 mb-3">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Write your message here..."
                      className="w-full px-5 py-4 backdrop-blur-xl bg-white/5 border border-primary/20 rounded-2xl text-emerald-100 placeholder:text-emerald-400/40 focus:outline-none focus:border-primary/50 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="relative w-full group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur group-hover:blur-md transition-all opacity-50" />
                    <div className="relative w-full px-8 py-5 bg-gradient-to-r from-primary to-emerald-400 text-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg text-lg">
                      <Send className="w-5 h-5" />
                      Send Message
                    </div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}