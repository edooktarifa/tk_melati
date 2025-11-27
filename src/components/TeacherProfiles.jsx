import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const teachers = [
    {
        id: 1,
        name: "Ida Jubaedah ",
        role: "Wali Kelas TK B",
        bio: "Mengajar lebih Taman kanak Melati lebih dari 20 tahun.",
        color: "bg-teal-300",
        image: "/bu_ida.jpeg"
    },
    {
        id: 2,
        name: "Neneng Sudarsih",
        role: "Wali Kelas TK A",
        bio: "Mengajar di taman kanak Melati selama 2 tahun",
        color: "bg-rose-300",
        image: "/bu_neneng.jpeg"
    },
    {
        id: 3,
        name: "Maryati",
        role: "Wali Kelas KB",
        bio: "Mengajar di taman kanak melati kurang lebih 8 tahun",
        color: "bg-indigo-300",
        image: "/bu_mar.jpeg"
    },
    {
        id: 4,
        name: "Dian Nurhayati Anwar",
        role: "Guru Bahasa Inggris",
        bio: "Mengajar di taman kanak melati lebih dari 15 tahun",
        color: "bg-emerald-300",
        image: "/ms_dian.jpeg"
    },
    {
        id: 5,
        name: "Afrian Wibisono",
        role: "Guru Seni",
        bio: "Mengajar di taman kanak melati lebih dari 5 tahun.",
        color: "bg-violet-300",
        image: "/pak_wibi.jpeg"
    }
];

const TeacherProfiles = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % teachers.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
    };

    return (
        <section id="teachers" className="py-20 bg-background dark:bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">Guru TK Melati</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Pendidik penuh dedikasi yang berkomitmen untuk tumbuh kembang anak Anda.</p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="flex justify-center items-center">
                        <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                            <ChevronLeft size={32} />
                        </button>

                        <div className="w-full md:w-2/3 h-96 relative flex items-center justify-center">
                            {/* Decorative Background Blobs */}
                            <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                            <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-full h-full bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center shadow-2xl"
                                >
                                    <div className={`w-32 h-32 md:w-48 md:h-48 ${teachers[currentIndex].color} rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8 shrink-0 shadow-lg overflow-hidden`}>
                                        <img
                                            src={teachers[currentIndex].image}
                                            alt={teachers[currentIndex].name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center md:text-left z-10">
                                        <h3 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">{teachers[currentIndex].name}</h3>
                                        <p className="text-xl font-medium mb-4 text-slate-700 dark:text-slate-200">{teachers[currentIndex].role}</p>
                                        <p className="text-lg text-slate-600 dark:text-slate-300">{teachers[currentIndex].bio}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                            <ChevronRight size={32} />
                        </button>
                    </div>

                    {/* Mobile Navigation Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {teachers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-text dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeacherProfiles;
