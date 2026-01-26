const PawsAnimated = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large animated paw - top left */}
            <svg className="absolute top-20 left-10 w-32 h-32 text-[#A79A95] opacity-100 animate-pulse" style={{ animationDuration: '3s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="65" rx="15" ry="20" />
                <ellipse cx="35" cy="45" rx="8" ry="12" />
                <ellipse cx="50" cy="40" rx="8" ry="12" />
                <ellipse cx="65" cy="45" rx="8" ry="12" />
            </svg>

            {/* Large animated paw - bottom right */}
            <svg className="absolute bottom-40 right-20 w-40 h-40 text-[#252120] opacity-100 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="65" rx="15" ry="20" />
                <ellipse cx="35" cy="45" rx="8" ry="12" />
                <ellipse cx="50" cy="40" rx="8" ry="12" />
                <ellipse cx="65" cy="45" rx="8" ry="12" />
            </svg>

            {/* Medium animated paw - middle right */}
            <svg className="absolute top-1/2 right-10 w-24 h-24 text-[#A79A95] opacity-100 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="65" rx="12" ry="16" />
                <ellipse cx="38" cy="48" rx="6" ry="9" />
                <ellipse cx="50" cy="44" rx="6" ry="9" />
                <ellipse cx="62" cy="48" rx="6" ry="9" />
            </svg>

            {/* Small animated paw - top right */}
            <svg className="absolute top-40 right-1/4 w-20 h-20 text-[#252120] opacity-20 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="60" rx="10" ry="14" />
                <ellipse cx="40" cy="46" rx="5" ry="8" />
                <ellipse cx="50" cy="43" rx="5" ry="8" />
                <ellipse cx="60" cy="46" rx="5" ry="8" />
            </svg>

            {/* Small animated paw - bottom left */}
            <svg className="absolute bottom-1/3 left-1/4 w-20 h-20 text-[#A79A95] opacity-20 animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '1.5s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="60" rx="10" ry="14" />
                <ellipse cx="40" cy="46" rx="5" ry="8" />
                <ellipse cx="50" cy="43" rx="5" ry="8" />
                <ellipse cx="60" cy="46" rx="5" ry="8" />
            </svg>

            {/* Trail of animated small paws - diagonal */}
            <svg className="absolute top-1/3 left-1/3 w-16 h-16 text-[#252120] opacity-25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '0.7s', transform: 'rotate(20deg)' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="60" rx="9" ry="12" />
                <ellipse cx="42" cy="48" rx="4" ry="7" />
                <ellipse cx="50" cy="45" rx="4" ry="7" />
                <ellipse cx="58" cy="48" rx="4" ry="7" />
            </svg>

            <svg className="absolute top-1/3 left-1/3 w-16 h-16 text-[#A79A95] opacity-25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '1.2s', transform: 'rotate(35deg) translateX(3rem) translateY(2rem)' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="60" rx="9" ry="12" />
                <ellipse cx="42" cy="48" rx="4" ry="7" />
                <ellipse cx="50" cy="45" rx="4" ry="7" />
                <ellipse cx="58" cy="48" rx="4" ry="7" />
            </svg>

            <svg className="absolute top-1/3 left-1/3 w-16 h-16 text-[#252120] opacity-25 animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '1.7s', transform: 'rotate(50deg) translateX(6rem) translateY(4rem)' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="60" rx="9" ry="12" />
                <ellipse cx="42" cy="48" rx="4" ry="7" />
                <ellipse cx="50" cy="45" rx="4" ry="7" />
                <ellipse cx="58" cy="48" rx="4" ry="7" />
            </svg>

            {/* Additional scattered animated paws */}
            <svg className="absolute top-2/3 right-1/3 w-18 h-18 text-[#A79A95] opacity-20 animate-pulse" style={{ animationDuration: '3.7s', animationDelay: '0.9s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="60" rx="10" ry="14" />
                <ellipse cx="40" cy="46" rx="5" ry="8" />
                <ellipse cx="50" cy="43" rx="5" ry="8" />
                <ellipse cx="60" cy="46" rx="5" ry="8" />
            </svg>

            <svg className="absolute top-1/4 left-1/2 w-22 h-22 text-[#252120] opacity-100 animate-pulse" style={{ animationDuration: '4.2s', animationDelay: '1.8s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="65" rx="12" ry="16" />
                <ellipse cx="38" cy="48" rx="6" ry="9" />
                <ellipse cx="50" cy="44" rx="6" ry="9" />
                <ellipse cx="62" cy="48" rx="6" ry="9" />
            </svg>

            <svg className="absolute bottom-1/4 right-1/4 w-20 h-20 text-[#A79A95] opacity-20 animate-pulse" style={{ animationDuration: '3.3s', animationDelay: '0.5s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="60" rx="10" ry="14" />
                <ellipse cx="40" cy="46" rx="5" ry="8" />
                <ellipse cx="50" cy="43" rx="5" ry="8" />
                <ellipse cx="60" cy="46" rx="5" ry="8" />
            </svg>

            <svg className="absolute top-3/4 left-20 w-24 h-24 text-[#252120] opacity-100 animate-pulse" style={{ animationDuration: '3.9s', animationDelay: '2s' }} viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="50" cy="65" rx="12" ry="16" />
                <ellipse cx="38" cy="48" rx="6" ry="9" />
                <ellipse cx="50" cy="44" rx="6" ry="9" />
                <ellipse cx="62" cy="48" rx="6" ry="9" />
            </svg>
        </div>
    )
}

export default PawsAnimated