import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Palette, Gamepad2 } from 'lucide-react';

const Activities = () => {
    const activities = [
        {
            title: "Asah Motorik & Logika",
            desc: "Kegiatan bermain yang dirancang khusus untuk melatih kekuatan otot tubuh (motorik halus) dan merangsang kemampuan anak memecahkan masalah sederhana lewat permainan yang edukatif",
            icon: <BookOpen size={32} className="text-white" />,
            color: "bg-primary"
        },
        {
            title: "Seni & Kreativitas",
            desc: "Kegiatan menyenangkan untuk menyalurkan imajinasi anak. Meliputi aktivitas menggambar, bernyanyi, dan bermain peran (roleplay) agar anak berani berekspresi dan tampil percaya diri.",
            icon: <Palette size={32} className="text-white" />,
            color: "bg-secondary"
        },
        {
            title: "Pembiasaan Mandiri",
            desc: "Melatih kedisiplinan anak lewat rutinitas sederhana sehari-hari. Mulai dari berbaris rapi, menaruh sesuatu pada tempatnya, hingga adab makan dan berbicara, untuk membentuk kebiasaan tertib dan tanggung jawab sejak dini.",
            icon: <Gamepad2 size={32} className="text-white" />,
            color: "bg-accent"
        },
        // {
        //     title: "Bina Karakter & Emosi",
        //     desc: "Sesi khusus dimana guru membimbing anak mengenal perasaan mereka (senang, sedih, marah), mengajarkan cara berteman yang baik, serta menanamkan sopan santun melalui cerita dan diskusi ringan.",
        //     icon: <BookOpen size={32} className="text-white" />,
        //     color: "bg-primary"
        // },
        // {
        //     title: "Kognitif & Nilai Agama",
        //     desc: "Pengenalan dasar membaca, berhitung, dan pengetahuan agama yang disampaikan dengan metode ceria (visual dan audiovisual). Anak belajar tanpa merasa terbebani, tetap aktif, dan gembira.",
        //     icon: <Palette size={32} className="text-white" />,
        //     color: "bg-secondary"
        // },

    ];

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
        <section id="programs" className="py-20 bg-blue-50 dark:bg-slate-900">
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
                        className="text-4xl font-extrabold text-text dark:text-white mb-4"
                    >
                        Kegiatan Anak
                    </motion.h2>
                    <motion.p
                        variants={titleVariants}
                        className="text-xl text-gray-600 dark:text-gray-300"
                    >
                        Beragam aktivitas seru untuk tumbuh kembang anak.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
                        >
                            <motion.div
                                whileHover={{ rotate: 6, scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className={`${activity.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md rotate-3`}
                            >
                                {activity.icon}
                            </motion.div>
                            <h3 className="text-2xl font-bold text-text dark:text-white mb-3">{activity.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {activity.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Activities;
