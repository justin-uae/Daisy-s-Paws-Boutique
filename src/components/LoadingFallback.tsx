export function BrandedFallback() {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F8F4ED] via-[#FFF9F0] to-[#F5EDE4] overflow-hidden">
            {/* Animated Background Particles - Dog Boutique Theme */}
            <div className="absolute inset-0">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-[#D4A798]/30"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.7 + 0.3
                        }}
                    />
                ))}
            </div>

            {/* Paw Print Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(214, 167, 152, 0.1) 30px, rgba(214, 167, 152, 0.1) 60px),
                                    repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(139, 90, 60, 0.1) 30px, rgba(139, 90, 60, 0.1) 60px)`
                }}></div>
            </div>

            {/* Main Loader Container */}
            <div className="relative z-10 text-center">
                {/* Circular Loader with Rings - Dog Boutique Theme */}
                <div className="relative w-44 h-44 mx-auto mb-10">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#D4A798] border-r-[#8B5A3C] animate-spin-slow shadow-2xl shadow-[#D4A798]/30"></div>

                    {/* Middle Ring */}
                    <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-[#E6B8A2] border-r-[#6D4C41] animate-spin-reverse shadow-xl shadow-[#8B5A3C]/20"></div>

                    {/* Inner Ring */}
                    <div className="absolute inset-6 rounded-full border-4 border-transparent border-t-[#C19A8B] border-r-[#5D4037] animate-spin-slower"></div>

                    {/* Center Icon - Paw Print */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Paw Print Icon */}
                            <svg
                                className="w-20 h-20 text-[#5D4037] animate-pulse-scale"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="16" r="4" />
                                <circle cx="7" cy="11" r="3" />
                                <circle cx="17" cy="11" r="3" />
                                <circle cx="9" cy="8" r="2" />
                                <circle cx="15" cy="8" r="2" />
                            </svg>

                            {/* Glowing Effect - Boutique Colors */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4A798] to-[#8B5A3C] blur-2xl opacity-40 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Orbiting Bones - Dog Theme */}
                    <div className="absolute inset-0 animate-spin-orbital">
                        <div className="absolute top-0 left-1/2 w-6 h-4 bg-gradient-to-r from-[#E6B8A2] to-[#D4A798] rounded-lg -translate-x-1/2 shadow-lg shadow-[#D4A798]/50 transform rotate-45"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin-orbital-reverse">
                        <div className="absolute bottom-0 left-1/2 w-6 h-4 bg-gradient-to-r from-[#8B5A3C] to-[#6D4C41] rounded-lg -translate-x-1/2 shadow-lg shadow-[#8B5A3C]/50 transform -rotate-45"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin-orbital-slow">
                        <div className="absolute left-0 top-1/2 w-5 h-3 bg-gradient-to-r from-[#C19A8B] to-[#E6B8A2] rounded-lg -translate-y-1/2 shadow-lg shadow-[#C19A8B]/50"></div>
                    </div>
                </div>

                {/* Brand Text - Dog Boutique Theme */}
                <div className="space-y-5">
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#5D4037] via-[#8B5A3C] to-[#5D4037] bg-clip-text text-transparent animate-gradient drop-shadow-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                        Daisy's Paws
                    </h1>

                    {/* Animated Subtitle */}
                    <div className="flex items-center justify-center gap-3 text-[#6D4C41]">
                        <span className="text-lg md:text-xl font-bold animate-fade-in">Loading Your</span>
                        <span className="text-lg md:text-xl font-black text-[#8B5A3C] animate-text-glow">Pet Fashion</span>
                    </div>

                    {/* Progress Bar - Boutique Theme */}
                    <div className="w-72 h-2 mx-auto bg-white/50 rounded-full overflow-hidden backdrop-blur-sm border border-[#E6B8A2] shadow-inner">
                        <div className="h-full bg-gradient-to-r from-[#E6B8A2] via-[#D4A798] to-[#C19A8B] animate-progress rounded-full shadow-lg shadow-[#D4A798]/50"></div>
                    </div>

                    {/* Loading Dots - Boutique Colors */}
                    <div className="flex items-center justify-center gap-3 pt-6">
                        <div className="w-3 h-3 bg-[#E6B8A2] rounded-full animate-bounce-dot shadow-lg shadow-[#E6B8A2]/50"></div>
                        <div className="w-3 h-3 bg-[#D4A798] rounded-full animate-bounce-dot shadow-lg shadow-[#D4A798]/50" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-3 h-3 bg-[#C19A8B] rounded-full animate-bounce-dot shadow-lg shadow-[#C19A8B]/50" style={{ animationDelay: '0.3s' }}></div>
                    </div>

                    {/* Status Text */}
                    <p className="text-[#8B5A3C]/80 text-sm font-semibold tracking-wider uppercase pt-4">
                        Fetching Stylish Outfits...
                    </p>
                </div>
            </div>

            {/* Floating Elements - Dog Boutique Theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Right */}
                <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-[#D4A798]/20 to-[#8B5A3C]/20 rounded-full blur-3xl animate-float-slow"></div>

                {/* Bottom Left */}
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-[#8B5A3C]/20 to-[#5D4037]/20 rounded-full blur-3xl animate-float-slower"></div>

                {/* Middle Large Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#E6B8A2]/10 to-[#D4A798]/10 rounded-full blur-3xl animate-pulse-slow"></div>

                {/* Additional Accent Glows */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#D4A798]/10 rounded-full blur-2xl animate-float-slower"></div>
                <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-[#8B5A3C]/10 rounded-full blur-2xl animate-float-slow"></div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes spin-slower {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-orbital {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-orbital-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes spin-orbital-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes pulse-scale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }

                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes fade-in {
                    0%, 50% { opacity: 0.6; }
                    100% { opacity: 1; }
                }

                @keyframes text-glow {
                    0%, 100% {
                        text-shadow: 0 0 15px rgba(139, 90, 60, 0.4);
                    }
                    50% {
                        text-shadow: 0 0 25px rgba(139, 90, 60, 0.6), 0 0 35px rgba(139, 90, 60, 0.4);
                    }
                }

                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes bounce-dot {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(25px, -25px); }
                }

                @keyframes float-slower {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-35px, 35px); }
                }

                @keyframes twinkle {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.8);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.25;
                        transform: scale(1.08);
                    }
                }

                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 2s linear infinite;
                }

                .animate-spin-slower {
                    animation: spin-slower 4s linear infinite;
                }

                .animate-spin-orbital {
                    animation: spin-orbital 3s linear infinite;
                }

                .animate-spin-orbital-reverse {
                    animation: spin-orbital-reverse 4s linear infinite;
                }

                .animate-spin-orbital-slow {
                    animation: spin-orbital-slow 5s linear infinite;
                }

                .animate-pulse-scale {
                    animation: pulse-scale 2.5s ease-in-out infinite;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animate-fade-in {
                    animation: fade-in 2s ease-in-out infinite;
                }

                .animate-text-glow {
                    animation: text-glow 2s ease-in-out infinite;
                }

                .animate-progress {
                    animation: progress 1.8s ease-in-out infinite;
                }

                .animate-bounce-dot {
                    animation: bounce-dot 1.2s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 7s ease-in-out infinite;
                }

                .animate-float-slower {
                    animation: float-slower 9s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}