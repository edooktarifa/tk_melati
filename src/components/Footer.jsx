import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 dark:bg-purple-900/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg">
                                <span className="font-bold text-xl">✿</span>
                            </div>
                            <span className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight">TK MELATI</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
                            Membentuk generasi cerdas, kreatif, dan berakhlak mulia melalui pendidikan yang penuh kasih sayang dan kegembiraan.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Tautan Cepat</h4>
                        <ul className="space-y-4">
                            <li><a href="#home" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"><span>•</span> Beranda</a></li>
                            <li><a href="#about" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"><span>•</span> Tentang Kami</a></li>
                            <li><a href="#programs" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"><span>•</span> Program</a></li>
                            <li><a href="#teachers" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2"><span>•</span> Guru</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                                <span>Jl. Melati Indah No. 123, Jakarta Selatan, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <Phone size={20} className="text-primary shrink-0" />
                                <span>+62 123 4567 890</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <Mail size={20} className="text-primary shrink-0" />
                                <span>info@tkmelati.sch.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} TK Melati. All rights reserved.
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm flex items-center gap-1">
                        Dibuat dengan <Heart size={14} className="text-red-500 fill-red-500" /> untuk Pendidikan Indonesia
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
