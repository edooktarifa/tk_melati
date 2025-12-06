import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const Layout = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen bg-background font-sans relative">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary/80 origin-left z-[100]"
                style={{ scaleX }}
            />
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    );
};

export default Layout;
