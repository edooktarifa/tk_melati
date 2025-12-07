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

const TestimonialCard = ({ testimonial }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = testimonial.text.length > 150;

    return (
        <div className="h-full">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-8 rounded-[2rem] relative shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-white/10 flex flex-col h-full group">
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
            </div>
        </div>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

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

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
            // Reset index to 0 on resize to avoid out of bounds
            setCurrentIndex(0);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const paginate = (newDirection) => {
        if (loading || testimonials.length === 0) return;
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            let nextIndex = prev + newDirection;
            if (nextIndex < 0) nextIndex = totalPages - 1;
            if (nextIndex >= totalPages) nextIndex = 0;
            return nextIndex;
        });
    };

    // Calculate visible items for current page
    const visibleTestimonials = testimonials.slice(
        currentIndex * itemsPerPage,
        currentIndex * itemsPerPage + itemsPerPage
    );

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }
        })
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

                <div className="relative min-h-[400px]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        {loading ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <TestimonialSkeleton key={i} />
                                ))}
                            </motion.div>
                        ) : testimonials.length > 0 ? (
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-grab active:cursor-grabbing touch-pan-y"
                            >
                                {visibleTestimonials.map((testimonial) => (
                                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-slate-500">Belum ada testimonial.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center mt-12 space-x-3">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-500 ease-out ${index === currentIndex
                                        ? 'bg-primary w-12 shadow-lg shadow-primary/30'
                                        : 'bg-slate-300 dark:bg-slate-600 w-2 hover:bg-slate-400'
                                    }`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
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
