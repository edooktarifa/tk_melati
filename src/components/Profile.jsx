import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const Profile = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const q = query(collection(db, "teachers"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const teachersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    image: doc.data().profileImg
                }));
                setTeachers(teachersData);
            } catch (error) {
                console.error("Error fetching teachers: ", error);
            }
        };

        fetchTeachers();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const featureVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.45, ease: "easeOut" }
        }
    };

    return (
        <section id="about" className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE WITH ANIMATION */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-30%" }} // FIX UTAMA ANIMASI
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl font-extrabold text-text dark:text-white mb-6"
                        >
                            Profil TK Melati
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                        >
                            Berdiri sejak 1986 dengan fokus awal pada keunggulan akademis, TK Melati bertransformasi penuh pada tahun 2021. Kini, kami mengusung pendidikan holistik yang tidak hanya mengasah kecerdasan kognitif, tetapi juga memprioritaskan pembangunan karakter dan kematangan emosi anak.
                        </motion.p>

                        <motion.div variants={itemVariants} className="space-y-4">
                            {[
                                "Pengembangan Mental Positif",
                                "Hafalan Cepat & Kreatif",
                                "Pembelajaran Interaktif"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={featureVariants}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle className="text-secondary" size={24} />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE (NO ANIMATION) */}
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>

                        <div className="relative bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl border border-blue-100 dark:border-gray-700 shadow-lg">
                            <h3 className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-4">Guru / Pengajar</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Guru ramah, sabar & mendampingi murid secara penuh perhatian.
                            </p>

                            <div className="flex -space-x-4">
                                {teachers.map((teacher, i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 rounded-full border-2 border-orange-300 dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden"
                                    >
                                        <img
                                            src={teacher.image}
                                            alt={teacher.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Profile;
