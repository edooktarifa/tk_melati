import React, { useState, useEffect } from 'react';
import { Menu, X, Flower2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('Beranda');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            // Scroll Spy Logic
            const sections = navLinks.map(link => link.href.substring(1));
            let current = '';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if section is visible in viewport (with some offset)
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = navLinks.find(link => link.href === `#${section}`)?.name || '';
                    }
                }
            }

            if (current) {
                setActiveLink(current);
            } else if (window.scrollY < 100) {
                setActiveLink('Beranda');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Call once on mount to set initial active state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '#home' },
        { name: 'Profil', href: '#about' },
        { name: 'Guru', href: '#teachers' },
        { name: 'Visi & Misi', href: '#vision' },
        { name: 'Kegiatan', href: '#programs' },
        { name: 'Testimoni', href: '#testimonials' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900 ${scrolled ? 'shadow-md py-2' : 'py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-white rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400">
                            <img src="tk_melati_logo.png" alt="" className="w-10 h-10" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-primary leading-none tracking-wide">
                                TK MELATI
                            </span>
                            <span className="text-[10px] text-secondary tracking-wider uppercase font-semibold">
                                Cerdas & Berkarakter
                            </span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.querySelector(link.href);
                                    if (element) {
                                        const offsetTop = element.offsetTop - 80; // Adjust for navbar height
                                        window.scrollTo({
                                            top: offsetTop,
                                            behavior: 'smooth'
                                        });
                                        setActiveLink(link.name);
                                    }
                                }}
                                className={`relative font-medium text-sm transition-colors duration-200 ${activeLink === link.name
                                    ? 'text-primary dark:text-purple-400'
                                    : 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-purple-400'
                                    }`}
                            >
                                {link.name}
                                {activeLink === link.name && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                        <a
                            href="https://wa.me/6285820009353?text=%22Selamat%20datang%20di%20TK%20Melati%2C%20ada%20yang%20bisa%20kami%20bantu%20hari%20ini%3F%22"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-pink-500 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            Hubungi Kami
                        </a>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle Dark Mode"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 p-2 transition-colors focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg absolute top-full left-0 right-0"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsOpen(false);
                                        setTimeout(() => {
                                            const element = document.querySelector(link.href);
                                            if (element) {
                                                const offsetTop = element.offsetTop - 80;
                                                window.scrollTo({
                                                    top: offsetTop,
                                                    behavior: 'smooth'
                                                });
                                                setActiveLink(link.name);
                                            }
                                        }, 100);
                                    }}
                                    className={`block text-base font-medium transition-colors ${activeLink === link.name
                                        ? 'text-orange-500 dark:text-orange-400'
                                        : 'text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400'
                                        }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="https://wa.me/6282386836164?text=%22Selamat%20datang%20di%20TK%20Melati%2C%20ada%20yang%20bisa%20kami%20bantu%20hari%20ini%3F%22"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center bg-yellow-400 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-yellow-500 transition-all"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
