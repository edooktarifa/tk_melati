import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const RunningText = () => {
    // The text to display
    const text = "Hati-hati penipuan! TK Melati tidak menyediakan pendaftaran online dan tidak menerima pembayaran via transfer. Semua proses dilakukan langsung di sekolah.";

    // Create an array to repeat the text enough times to fill the screen width + extra for seamless looping
    // We'll render this block twice for the seamless effect
    const content = (
        <div className="flex items-center gap-16 px-8">
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-300 fill-yellow-300/20" />
                    <span className="text-sm md:text-base font-semibold tracking-wide text-white drop-shadow-sm">
                        {text}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 overflow-hidden py-3 shadow-md border-b border-white/10 relative z-40 mt-5">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex shrink-0"
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {content}
                </motion.div>
                <motion.div
                    className="flex shrink-0"
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {content}
                </motion.div>
            </div>
        </div>
    );
};

export default RunningText;
