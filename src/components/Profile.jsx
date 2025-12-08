import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { CheckCircle, Users, Trophy, Heart } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

const CountUp = ({ to }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const spring = useSpring(0, { stiffness: 50, damping: 20 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (inView) {
            spring.set(parseInt(to));
        }
    }, [inView, spring, to]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
    }, [spring]);

    return <span ref={ref}>{displayValue}{to.toString().includes('+') ? '+' : ''}</span>;
};

const Profile = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const q = query(
                    collection(db, "teachers"),
                    orderBy("createdAt", "desc"),
                    limit(4)
                );
                const querySnapshot = await getDocs(q);
                const teachersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    image: doc.data().profileImg
                }));
                // Fill with placeholders if less than 4 (logic omitted for brevity, using what we have)
                setTeachers(teachersData);
            } catch (error) {
                console.error("Error fetching teachers: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const stats = [
        { icon: <Users size={20} />, label: "Murid", value: "15+" },
        { icon: <Trophy size={20} />, label: "Prestasi", value: "10+" },
        { icon: <Heart size={20} />, label: "Guru", value: "5+" },
    ];

    return (
        <section id="about" ref={containerRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden relative">
            {/* Decorative Background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-32 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT SIDE WITH SPLIT REVEAL ANIMATION */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold mb-4"
                        >
                            Tentang Kami
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6 leading-tight">
                            Membangun Generasi <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">Cerdas & Berkarakter</span>
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            Berdiri sejak 1986 dengan fokus awal pada keunggulan akademis, TK Melati bertransformasi penuh pada tahun 2021. Kini, kami mengusung pendidikan holistik yang tidak hanya mengasah kecerdasan kognitif, tetapi juga memprioritaskan pembangunan karakter dan kematangan emosi anak.
                        </p>

                        {/* Stats Grid with CountUp */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                    className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
                                >
                                    <div className="text-secondary dark:text-secondary mb-2 flex justify-center transform transition-transform hover:scale-110 duration-300">{stat.icon}</div>
                                    <div className="font-bold text-xl text-slate-800 dark:text-white">
                                        <CountUp to={stat.value} />
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {[
                                "Pengembangan Mental Positif",
                                "Hafalan Cepat & Kreatif",
                                "Pembelajaran Interaktif"
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-default"
                                >
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400 shadow-sm">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-200 font-medium text-lg">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE (Card) WITH PARALLAX */}
                    <motion.div
                        style={{ y }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 rounded-[3rem] rotate-3 blur-sm animate-pulse"></div>
                        <div className="relative bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Guru Pengajar</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Berdedikasi & Profesional</p>
                                </div>
                                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full text-orange-600 dark:text-orange-400 animate-bounce">
                                    <Heart fill="currentColor" size={24} />
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed italic">
                                "Kami percaya setiap anak istimewa. Tugas kami adalah menemukan bakat mereka dan membimbingnya dengan penuh kasih sayang."
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-4 pl-4">
                                    {loading ? (
                                        [...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200"
                                            />
                                        ))
                                    ) : (
                                        teachers.map((teacher, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 48 }} // 48px = w-12
                                                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                                                className="relative w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden shadow-md hover:scale-110 hover:z-10 transition-transform cursor-pointer group"
                                                title={teacher.name}
                                            >
                                                <img
                                                    src={teacher.image}
                                                    alt={teacher.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        ))
                                    )}
                                    <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 z-0">
                                        +5
                                    </div>
                                </div>

                                <button
                                    onClick={() => document.getElementById('teachers')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors shadow-sm hover:shadow-md"
                                >
                                    Lihat Semua
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

        </section>
    );
};

export default Profile;
