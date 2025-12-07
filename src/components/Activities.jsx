import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Palette, Gamepad2, Stars } from 'lucide-react';

const Activities = () => {
    const activities = [
        {
            title: "Asah Motorik & Logika",
            desc: "Kegiatan bermain yang dirancang khusus untuk melatih kekuatan otot tubuh (motorik halus) dan merangsang kemampuan anak memecahkan masalah sederhana lewat permainan yang edukatif",
            icon: <BookOpen size={32} className="text-white" />,
            color: "bg-primary",
            gradient: "from-orange-400 to-orange-600",
            shadow: "shadow-orange-500/20"
        },
        {
            title: "Seni & Kreativitas",
            desc: "Kegiatan menyenangkan untuk menyalurkan imajinasi anak. Meliputi aktivitas menggambar, bernyanyi, dan bermain peran (roleplay) agar anak berani berekspresi dan tampil percaya diri.",
            icon: <Palette size={32} className="text-white" />,
            color: "bg-secondary",
            gradient: "from-teal-400 to-teal-600",
            shadow: "shadow-teal-500/20"
        },
        {
            title: "Pembiasaan Mandiri",
            desc: "Melatih kedisiplinan anak lewat rutinitas sederhana sehari-hari. Mulai dari berbaris rapi, menaruh sesuatu pada tempatnya, hingga adab makan dan berbicara, untuk membentuk kebiasaan tertib dan tanggung jawab sejak dini.",
            icon: <Gamepad2 size={32} className="text-white" />,
            color: "bg-accent",
            gradient: "from-amber-400 to-amber-600",
            shadow: "shadow-amber-500/20"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
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
        <section id="programs" className="py-24 relative bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Background Texture/Blobs */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-100/50 dark:bg-orange-900/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.div variants={cardVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-sm font-semibold mb-6">
                        <Stars size={16} />
                        <span>Program Unggulan</span>
                    </motion.div>

                    <motion.h2
                        variants={cardVariants}
                        className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6"
                    >
                        Kegiatan <span className="text-secondary">Anak</span>
                    </motion.h2>
                    <motion.p
                        variants={cardVariants}
                        className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
                    >
                        Beragam aktivitas seru yang dirancang khusus untuk mendukung tumbuh kembang buah hati Anda secara optimal.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-8 lg:gap-12"
                >
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className="group relative h-full"
                        >
                            <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none transform transition-transform duration-300 group-hover:scale-[1.02]"></div>
                            <div className="relative p-8 h-full flex flex-col items-center text-center border border-white/50 dark:border-white/5 rounded-[2rem] backdrop-blur-sm bg-white/50 dark:bg-slate-800/50">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activity.gradient} flex items-center justify-center mb-8 shadow-lg ${activity.shadow} group-hover:rotate-6 transition-transform duration-300`}>
                                    {activity.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{activity.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
                                    {activity.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Activities;
