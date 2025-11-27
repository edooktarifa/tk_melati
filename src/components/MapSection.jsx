import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const MapSection = () => {
    return (
        <section id="map" className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-4xl font-extrabold text-text dark:text-white mb-6">Kunjungi Kami</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Yuk datang ke TK Melati! Buat jadwal atur atau langsung berkunjung untuk mengenal kami lebih dekat
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text dark:text-white">Alamat</h4>
                                    <p className="text-gray-600 dark:text-gray-300">Jl. Tanjung Duren Utara 3 No.9, RT.9/RW.3, Tj. Duren Utara, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470, Indonesia</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 dark:bg-secondary/20 p-3 rounded-full text-secondary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text dark:text-white">Kontak</h4>
                                    <p className="text-gray-600 dark:text-gray-300">+62 858-2000-9353</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-full text-accent">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text dark:text-white">Waktu Operasional</h4>
                                    <p className="text-gray-600 dark:text-gray-300">Senin – Jumat: 07.30 – 17.00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Embed */}
                    <div className="h-96 bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden p-2">
                        <iframe
                            src="https://www.google.com/maps?q=TK%20Melati%2C%20Jl.%20Tanjung%20Duren%20Utara%203%20No.9%2C%20Jakarta%20Barat&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '1.5rem' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps – TK Melati"
                        ></iframe>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default MapSection;
