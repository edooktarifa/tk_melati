import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Sparkles } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Custom Shimmer Skeleton
const TeacherSkeleton = () => (
    <div className="relative w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-2xl overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 z-20"></div>

        <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2rem] bg-slate-200 dark:bg-slate-700 shrink-0"></div>
        <div className="flex-1 space-y-4 w-full text-center md:text-left">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mx-auto md:mx-0"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3 mx-auto md:mx-0"></div>
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
        </div>
    </div>
);

const TeacherProfiles = () => {
    const [teachers, setTeachers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState(0);

    const colors = [
        "bg-teal-100 dark:bg-teal-900/30",
        "bg-rose-100 dark:bg-rose-900/30",
        "bg-indigo-100 dark:bg-indigo-900/30",
        "bg-emerald-100 dark:bg-emerald-900/30",
        "bg-violet-100 dark:bg-violet-900/30"
    ];

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "teachers"));
                const teachersData = querySnapshot.docs
                    .map((doc, index) => ({
                        id: doc.id,
                        ...doc.data(),
                        bio: doc.data().desc,
                        image: doc.data().profileImg,
                        color: colors[index % colors.length]
                    }))
                    .reverse();

                setTeachers(teachersData);
            } catch (error) {
                console.error("Error fetching teachers: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => (prev + newDirection + teachers.length) % teachers.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.8,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.8,
            rotateY: direction < 0 ? -45 : 45,
            transition: {
                duration: 0.5
            }
        })
    };

    return (
        <section id="teachers" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative perspective-1000">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-0 w-full h-[500px] bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 text-primary dark:text-purple-300 text-sm font-semibold mb-6 shadow-sm border border-slate-100 dark:border-white/10">
                        <GraduationCap size={16} />
                        <span>Tim Pengajar Profesional</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6">
                        Guru <span className="text-primary">TK Melati</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Mendidik dengan <Sparkles className="inline w-5 h-5 text-yellow-400" /> hati, membimbing dengan kasih.
                    </p>
                </motion.div>

                <div className="relative max-w-5xl mx-auto min-h-[500px] flex items-center justify-center">
                    {/* Navigation Buttons */}
                    {!loading && teachers.length > 0 && (
                        <>
                            <button
                                onClick={() => paginate(-1)}
                                className="absolute left-0 md:-left-12 z-30 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-xl hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-white transition-all hover:scale-110 active:scale-95 group border border-slate-100 dark:border-white/10"
                            >
                                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => paginate(1)}
                                className="absolute right-0 md:-right-12 z-30 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-xl hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-white transition-all hover:scale-110 active:scale-95 group border border-slate-100 dark:border-white/10"
                            >
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </>
                    )}

                    <div className="w-full relative px-4 md:px-12 perspective-1000">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            {loading ? (
                                <motion.div
                                    key="skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <TeacherSkeleton />
                                </motion.div>
                            ) : teachers.length > 0 ? (
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="w-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-black/50"
                                >
                                    {/* Image with 3D Float Effect */}
                                    <div className="relative group perspective-500">
                                        <div className={`absolute -inset-4 ${teachers[currentIndex].color} rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}></div>
                                        <motion.div
                                            className="relative w-48 h-48 md:w-64 md:h-64 rounded-[2rem] overflow-hidden shadow-2xl"
                                            whileHover={{ rotateY: 10, rotateX: -10 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            <img
                                                src={teachers[currentIndex].image}
                                                alt={teachers[currentIndex].name}
                                                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                                            />
                                            {/* Role Badge Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-sm font-semibold">{teachers[currentIndex].role}</p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="text-center md:text-left z-10 flex-1">
                                        <motion.h3
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-3xl md:text-4xl font-bold mb-2 text-slate-800 dark:text-white"
                                        >
                                            {teachers[currentIndex].name}
                                        </motion.h3>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-xl text-sm font-bold mb-6"
                                        >
                                            {teachers[currentIndex].role}
                                        </motion.div>

                                        <motion.p
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic"
                                        >
                                            "{teachers[currentIndex].bio}"
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>
                {/* Pagination Dots */}
                {!loading && (
                    <div className="flex justify-center mt-12 space-x-3">
                        {teachers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-500 ease-out ${index === currentIndex ? 'bg-primary w-12 shadow-lg shadow-primary/30' : 'bg-slate-300 dark:bg-slate-600 w-2 hover:bg-slate-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>


        </section>
    );
};

export default TeacherProfiles;
