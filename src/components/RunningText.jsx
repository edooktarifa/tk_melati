import React from 'react';
import { AlertTriangle, PauseCircle } from 'lucide-react';

const RunningText = () => {
    const text = "Hati-hati penipuan! TK Melati tidak menyediakan pendaftaran online dan tidak menerima pembayaran via transfer. Semua proses dilakukan langsung di sekolah.";

    // Content block to repeat
    const MarqueeContent = () => (
        <div className="flex items-center gap-16 px-8 shrink-0">
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                        <AlertTriangle className="w-5 h-5 text-yellow-300 fill-yellow-300/20" />
                    </div>
                    <span className="text-white font-bold tracking-wide text-sm md:text-base drop-shadow-sm">
                        {text}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative w-full overflow-hidden z-40 group mt-5">
            {/* Vibrant Gradient Background with Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-purple-600 to-orange-500 opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

            <div
                className="relative flex py-3.5 border-b border-white/10"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                }}
            >
                {/* CSS Animation Wrapper */}
                <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
                    <MarqueeContent />
                    <MarqueeContent />
                </div>
            </div>

            {/* Pause Indicator (Optional hint) */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/50 text-xs flex items-center gap-1 pointer-events-none">
                <PauseCircle size={14} />
                <span>Paused</span>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default RunningText;
