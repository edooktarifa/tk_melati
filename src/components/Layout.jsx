import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />
            <main>
                {children}
            </main>
            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 py-12 border-t border-blue-50 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400">
                                    <span className="font-bold text-lg">✿</span>
                                </div>
                                <span className="text-xl font-bold text-orange-400">TK MELATI</span>
                            </div>
                            <p className="text-sm leading-relaxed max-w-xs">
                                Membentuk generasi cerdas, kreatif, dan berakhlak mulia. Bergabunglah bersama kami untuk masa depan buah hati yang gemilang.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold text-text dark:text-white mb-4">Tautan</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#home" className="hover:text-orange-400 transition-colors">Beranda</a></li>
                                <li><a href="#about" className="hover:text-orange-400 transition-colors">Tentang Kami</a></li>
                                <li><a href="#programs" className="hover:text-orange-400 transition-colors">Program</a></li>
                                <li><a href="#teachers" className="hover:text-orange-400 transition-colors">Guru</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-text dark:text-white mb-4">Sosial Media</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-orange-400 transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-orange-400 transition-colors">YouTube</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-slate-800 pt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} TK Melati. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
