import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Download } from 'lucide-react';

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
        <section id="home" className="relative bg-gradient-to-b from-background to-white dark:from-slate-900 dark:to-slate-800 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">

                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3
                            }
                        }
                    }}
                    className="md:w-1/2 text-center md:text-left z-10"
                >
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                        className="text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-tight"
                    >
                        Love, Care, <br />
                        <span className="text-secondary">And Concern</span>
                    </motion.h1>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                        className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
                    >
                        Rumah kedua yang hangat bagi buah hati untuk mengenal emosi, menjalin persahabatan, dan tumbuh bahagia bersama dukungan keluarga.
                    </motion.p>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                        }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <button
                            onClick={() => handleDownload(downloadUrls.browsure, 'brosur-tk-melati.pdf')}
                            disabled={loading || !downloadUrls.browsure}
                            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-orange-600 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Download size={20} />
                            Download Brosur
                        </button>
                        <button
                            onClick={() => handleDownload(downloadUrls.formulir, 'formulir-tk-melati.pdf')}
                            disabled={loading || !downloadUrls.formulir}
                            className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-sm hover:bg-orange-50 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Download size={20} />
                            Download Formulir
                        </button>
                    </motion.div>
                </motion.div>

                {/* Image/Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:w-1/2 mt-12 md:mt-0 relative"
                >
                    <div className="relative z-10 bg-accent rounded-full w-full max-w-md mx-auto aspect-square overflow-hidden shadow-2xl">
                        <img
                            src="default_hero.png"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-40 h-40 bg-primary rounded-full opacity-20 blur-2xl"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
