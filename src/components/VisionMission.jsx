import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Star } from 'lucide-react';

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

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="vision" className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={titleVariants}
                        className="text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4"
                    >
                        Visi & Misi
                    </motion.h2>
                    <motion.p
                        variants={titleVariants}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                    >
                        Dengan semangat Love, Care, and Concern, visi dan misi TK Melati hadir untuk membentuk generasi kecil yang cerdas, berkarakter, dan siap melangkah.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-12"
                >
                    {/* Vision */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        className="bg-background dark:bg-slate-800 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-text dark:text-white mb-4">Visi</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Menjadi mitra terpercaya dalam membangun fondasi karakter dan kecerdasan emosi anak yang kokoh, melalui sinergi keluarga yang harmonis dan lingkungan pendidikan yang inklusif serta membahagiakan.
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        className="bg-background dark:bg-slate-800 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-text dark:text-white mb-4">Misi</h3>
                        <ul className="text-gray-700 dark:text-gray-300 text-left space-y-2">
                            <li>• Membangun Kematangan Emosional dan Karakter</li>
                            <li>• Mewujudkan Keselarasan Pola Asuh</li>
                            <li>• Menghadirkan Lingkungan Belajar yang Adaptif dan Ceria</li>
                            <li>• Menanamkan Nilai Spiritual dan Toleransi Universal</li>
                        </ul>
                    </motion.div>

                    {/* Values */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        className="bg-background dark:bg-slate-800 rounded-3xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                            <Star size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-text dark:text-white mb-4">Value</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Mengusung nilai Love, Care, dan Concern, kami mendidik dengan hati, berkolaborasi erat dengan orang tua, serta fokus memahami emosi unik setiap anak.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default VisionMission;
