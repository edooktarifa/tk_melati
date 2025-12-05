import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const TestimonialCard = ({ testimonial }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongText = testimonial.text.length > 150;

    return (
        <div className="bg-background dark:bg-slate-800 p-8 rounded-3xl relative shadow-lg border border-gray-100 dark:border-slate-700 h-full flex flex-col transition-all duration-300">
            <Quote className="absolute top-6 left-6 text-primary opacity-20" size={48} />
            <div className="relative z-10 flex-grow mb-3">
                <p className={`text-gray-700 dark:text-gray-300 text-lg italic ${!isExpanded ? 'line-clamp-4' : ''}`}>
                    "{testimonial.text}"
                </p>
                {isLongText && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary font-semibold text-sm mt-2 hover:underline focus:outline-none"
                    >
                        {isExpanded ? 'Sembunyikan' : 'Selengkapnya'}
                    </button>
                )}
            </div>
            <div>
                <h4 className="font-bold text-text dark:text-white text-xl">{testimonial.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.child}</p>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch testimonials from Firebase
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
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
                setError(null);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError('Gagal memuat testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Calculate visible testimonials for current page
    const visibleTestimonials = testimonials.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    // Handle edge case where last page might have fewer items
    // If we are on the last page and it's not full, we might want to show some previous items to fill the grid
    // But for simplicity, let's just show what's there.

    return (
        <section id="testimonials" className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">Review Orang Tua Murid</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Apa kata mereka tentang TK Melati.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 min-h-[300px] flex items-center justify-center">
                        <p>{error}</p>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 min-h-[300px] flex items-center justify-center">
                        <p>Belum ada testimonial yang tersedia.</p>
                    </div>
                ) : (
                    <>
                        <div className="relative">
                            {/* Carousel Content */}
                            <div className="overflow-hidden min-h-[300px] px-4 md:px-20 cursor-grab active:cursor-grabbing">
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.2}
                                        onDragEnd={(e, { offset, velocity }) => {
                                            const swipe = offset.x;

                                            if (swipe < -50) {
                                                nextSlide();
                                            } else if (swipe > 50) {
                                                prevSlide();
                                            }
                                        }}
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {visibleTestimonials.map((testimonial) => (
                                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-primary w-8' : 'bg-secondary/30 hover:bg-secondary/50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
