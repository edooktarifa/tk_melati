import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const teachers = [
    {
        id: 1,
        name: "Ida Jubaedah ",
        role: "Wali Kelas TK B",
        bio: "Mengajar lebih Taman kanak Melati lebih dari 20 tahun.",
        color: "bg-primary"
    },
    {
        id: 2,
        name: "Neneng Sudarsih",
        role: "Wali Kelas TK A",
        bio: "Mengajar di taman kanak Melati selama 2 tahun",
        color: "bg-secondary"
    },
    {
        id: 3,
        name: "Maryati",
        role: "Wali Kelas KB",
        bio: "Mengajar di taman kanak melati kurang lebih 8 tahun",
        color: "bg-accent"
    },
    {
        id: 4,
        name: "Dian Nurhayati Anwar",
        role: "Guru Bahasa Inggris",
        bio: "Mengajar di taman kanak melati lebih dari 15 tahun",
        color: "bg-secondary"
    },
    {
        id: 5,
        name: "Afrian Wibisono",
        role: "Guru Seni",
        bio: "Mengajar di taman kanak melati lebih dari 5 tahun.",
        color: "bg-accent"
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
                    <h2 className="text-4xl font-extrabold text-text dark:text-white mb-4">Guru TK Melati</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Pendidik penuh dedikasi yang berkomitmen untuk tumbuh kembang anak Anda.</p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="flex justify-center items-center">
                        <button onClick={prevSlide} className="absolute left-0 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:block text-gray-600 dark:text-gray-300">
                            <ChevronLeft size={32} />
                        </button>

                        <div className="w-full md:w-2/3 h-96 relative flex items-center justify-center">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                    className={`w-full h-full ${teachers[currentIndex].color} rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center shadow-2xl text-white`}
                                >
                                    <div className="w-32 h-32 md:w-48 md:h-48 bg-white/20 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8 shrink-0">
                                        <span className="text-6xl">👩‍🏫</span>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl font-bold mb-2">{teachers[currentIndex].name}</h3>
                                        <p className="text-xl font-medium mb-4 opacity-90">{teachers[currentIndex].role}</p>
                                        <p className="text-lg opacity-90">{teachers[currentIndex].bio}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button onClick={nextSlide} className="absolute right-0 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:block text-gray-600 dark:text-gray-300">
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
