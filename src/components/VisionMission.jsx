import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Star, Sparkles } from 'lucide-react';

const VisionMission = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="vision" className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-teal-50 dark:bg-teal-900/10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.div variants={cardVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        <span>Komitmen Kami</span>
                    </motion.div>

                    <motion.h2
                        variants={cardVariants}
                        className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6"
                    >
                        Visi & <span className="text-secondary">Misi</span>
                    </motion.h2>
                    <motion.p
                        variants={cardVariants}
                        className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
                    >
                        Dengan semangat Love, Care, and Concern, visi dan misi TK Melati hadir untuk membentuk generasi kecil yang cerdas, berkarakter, dan siap melangkah.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-8 lg:gap-12"
                >
                    {/* Vision */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2rem] text-center shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                    >
                        <div className="bg-primary/10 dark:bg-primary/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-primary rotate-3 hover:rotate-6 transition-transform">
                            <Target size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Visi</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                            "Menjadi mitra terpercaya dalam membangun fondasi karakter dan kecerdasan emosi anak yang kokoh, melalui sinergi keluarga yang harmonis dan lingkungan pendidikan yang inklusif serta membahagiakan."
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2rem] text-center shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-300 relative z-10 md:-mt-8"
                    >
                        <div className="bg-secondary/10 dark:bg-secondary/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-secondary -rotate-3 hover:-rotate-6 transition-transform">
                            <Heart size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Misi</h3>
                        <ul className="text-slate-600 dark:text-slate-300 text-left space-y-3 text-sm">
                            <li className="flex gap-2">
                                <span className="text-secondary">•</span>
                                Membangun Kematangan Emosional dan Karakter
                            </li>
                            <li className="flex gap-2">
                                <span className="text-secondary">•</span>
                                Mewujudkan Keselarasan Pola Asuh
                            </li>
                            <li className="flex gap-2">
                                <span className="text-secondary">•</span>
                                Menghadirkan Lingkungan Belajar yang Adaptif dan Ceria
                            </li>
                            <li className="flex gap-2">
                                <span className="text-secondary">•</span>
                                Menanamkan Nilai Spiritual dan Toleransi Universal
                            </li>
                        </ul>
                    </motion.div>

                    {/* Values */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                        className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[2rem] text-center shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300"
                    >
                        <div className="bg-accent/10 dark:bg-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-orange-500 rotate-3 hover:rotate-6 transition-transform">
                            <Star size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Value</h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-4">
                            Mengusung nilai <strong>Love, Care, dan Concern</strong>.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                            Kami mendidik dengan hati, berkolaborasi erat dengan orang tua, serta fokus memahami emosi unik setiap anak.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default VisionMission;
