import React, { useState, useEffect } from 'react';
import { Quote, MessageCircleHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

// Testimonial Skeleton
const TestimonialSkeleton = () => (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-8 rounded-[2rem] h-full flex flex-col border border-white/50 dark:border-white/10 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 z-20"></div>
        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 mb-6"></div>
        <div className="flex-1 space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4"></div>
        </div>
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-24 mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-16"></div>
            </div>
        </div>
    </div>
);

const TestimonialCard = ({ testimonial, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = testimonial.text.length > 150;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{
                opacity: 1,
                y: 0,
                // Floating animation
                translateY: [0, -10, 0],
            }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                translateY: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                }
            }}
            whileHover={{ scale: 1.02, translateY: -5, transition: { duration: 0.2 } }}
            className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-8 rounded-[2rem] relative shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 dark:border-white/10 flex flex-col h-full group"
        >
            <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                <Quote size={48} className="transform rotate-180" />
            </div>

            <div className="flex-grow mb-6 relative z-10">
                <motion.div
                    initial={false}
                    animate={{
                        height: isExpanded ? "auto" : "7.5rem",
                        maskImage: isExpanded
                            ? "linear-gradient(to bottom, black 100%, black 100%)"
                            : "linear-gradient(to bottom, black 60%, transparent 100%)",
                        WebkitMaskImage: isExpanded
                            ? "linear-gradient(to bottom, black 100%, black 100%)"
                            : "linear-gradient(to bottom, black 60%, transparent 100%)"
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed italic">
                        "{testimonial.text}"
                    </p>
                </motion.div>
                {isLongText && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary hover:text-purple-600 dark:hover:text-purple-400 font-semibold text-sm mt-3 focus:outline-none transition-colors"
                    >
                        {isExpanded ? 'Sembunyikan' : 'Baca Selengkapnya'}
                    </button>
                )}
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-700/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Orang tua dari {testimonial.child}</p>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially for masonry feel

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const testimonialsRef = collection(db, 'testimonials');
                const q = query(testimonialsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const testimonialsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().parentsName,
                    text: doc.data().feedback,
                    child: doc.data().class,
                    createdAt: doc.data().createdAt
                }));

                setTestimonials(testimonialsData);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const loadMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    return (
        <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')] opacity-[0.03] dark:opacity-[0.02]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-sm font-semibold mb-6">
                        <MessageCircleHeart size={16} />
                        <span>Kata Mereka</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6">
                        Review Orang Tua <span className="text-primary">Murid</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Cerita dan pengalaman nyata dari para orang tua yang telah mempercayakan pendidikan ananda di TK Melati.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <TestimonialSkeleton key={i} />
                        ))
                    ) : testimonials.length > 0 ? (
                        <AnimatePresence>
                            {testimonials.slice(0, visibleCount).map((testimonial, index) => (
                                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-slate-500">Belum ada testimonial.</p>
                        </div>
                    )}
                </div>

                {!loading && visibleCount < testimonials.length && (
                    <div className="text-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={loadMore}
                            className="px-8 py-3 bg-white dark:bg-slate-800 text-primary dark:text-white font-bold rounded-full shadow-lg border border-primary/20 hover:shadow-xl transition-all"
                        >
                            Muat Lebih Banyak
                        </motion.button>
                    </div>
                )}
            </div>
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
