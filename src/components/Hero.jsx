import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Download, Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
    const [downloadUrls, setDownloadUrls] = useState({
        browsure: '',
        formulir: ''
    });
    const [loading, setLoading] = useState(true);

    // Fetch download URLs from Firebase
    useEffect(() => {
        const fetchDownloadUrls = async () => {
            try {
                setLoading(true);
                const formulirRef = collection(db, 'formulir');
                const q = query(formulirRef, limit(1));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setDownloadUrls({
                        browsure: data.browsure || '',
                        formulir: data.formulir || ''
                    });
                }
            } catch (err) {
                console.error('Error fetching download URLs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDownloadUrls();
    }, []);

    // Handle download
    const handleDownload = (url, filename) => {
        if (!url) {
            alert('File belum tersedia');
            return;
        }

        try {
            // For Firebase Storage URLs, add response-content-disposition parameter
            let downloadUrl = url;

            // Check if it's a Firebase Storage URL
            if (url.includes('firebasestorage.googleapis.com')) {
                const separator = url.includes('?') ? '&' : '?';
                downloadUrl = url + separator + 'response-content-disposition=attachment;filename=' + encodeURIComponent(filename);
            }

            // Create a temporary anchor element and trigger download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Terjadi kesalahan saat mendownload file');
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden pt-20">
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:mix-blend-normal dark:bg-primary/10"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:mix-blend-normal dark:bg-secondary/10"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:mix-blend-normal dark:bg-accent/10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Text Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2,
                                    duration: 0.8
                                }
                            }
                        }}
                        className="md:w-1/2 text-center md:text-left"
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-purple-100 dark:border-white/10 shadow-sm mb-6"
                        >
                            <Sparkles size={16} className="text-primary animate-pulse" />
                            <span className="text-sm font-semibold text-primary/90 dark:text-purple-300">Pendaftaran Murid Baru Telah Dibuka</span>
                        </motion.div>

                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white mb-6 leading-[1.1] tracking-tight"
                        >
                            Love, Care, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative">
                                And Concern
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed"
                        >
                            Rumah kedua yang hangat bagi buah hati untuk mengenal emosi, menjalin persahabatan, dan tumbuh bahagia bersama dukungan keluarga.
                        </motion.p>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleDownload(downloadUrls.browsure, 'brosur-tk-melati.pdf')}
                                disabled={loading || !downloadUrls.browsure}
                                className="group relative bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Download size={20} />
                                    Download Brosur
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleDownload(downloadUrls.formulir, 'formulir-tk-melati.pdf')}
                                disabled={loading || !downloadUrls.formulir}
                                className="group bg-white dark:bg-white/5 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 px-8 py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                            >
                                <Download size={20} />
                                Download Formulir
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Image/Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 relative z-10"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[3rem] rotate-6 opacity-20 blur-lg transform scale-105"></div>
                            <div className="relative bg-white dark:bg-slate-800 p-2 rounded-[3rem] shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
                                <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] relative group">
                                    <img
                                        src="default_hero.png"
                                        alt="Anak-anak TK Melati"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-600"
                            >
                                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-xl text-green-600 dark:text-green-400">
                                    <Sparkles size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Terakreditasi</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">Nilai A</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll Down</span>
                <ArrowRight className="rotate-90" size={20} />
            </motion.div>
        </section>
    );
};

export default Hero;
