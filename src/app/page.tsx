import GuitarAnimation from '@/components/GuitarAnimation';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F2] via-[#F5F1EB] to-[#F0EBE4] dark:from-[#2D241A] dark:via-[#3A2F24] dark:to-[#46392E]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col items-center space-y-8 sm:space-y-10 lg:space-y-12 max-w-4xl mx-auto text-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-[#B8966F] dark:text-[#D4B48A] animate-pulse drop-shadow-sm">♫</span>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#4A3E2E] dark:text-[#F5E6D3] tracking-tight leading-tight" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  <span className="block italic">Chord</span>
                  <span className="block italic bg-gradient-to-r from-[#6B5F4F] via-[#8B7A65] to-[#6B5F4F] dark:from-[#F5E6D3] dark:via-[#E8D8C0] dark:to-[#F5E6D3] bg-clip-text text-transparent">
                    Stash
                  </span>
                </h1>
                <span className="text-4xl sm:text-5xl lg:text-6xl text-[#B8966F] dark:text-[#D4B48A] animate-pulse drop-shadow-sm" style={{ animationDelay: '0.5s' }}>♪</span>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#6B5F4F] dark:text-[#D4C4B0] font-light max-w-2xl mx-auto leading-relaxed px-4 italic">
                My personal digital songbook
              </p>
            </div>

            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574]/18 to-[#C4935F]/12 dark:from-[#B8946A]/25 dark:to-[#A68258]/18 rounded-full blur-2xl -z-10 scale-110"></div>
              <GuitarAnimation
                width={280}
                height={280}
                className="drop-shadow-2xl transition-transform hover:scale-105 duration-300"
              />
              <Link
                href="/songs"
                className="group inline-flex items-center gap-2.5 px-7 py-3 bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] text-[#4A3E2E] dark:text-[#F5E6D3] font-semibold rounded-xl shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-[#46392E] hover:border-[#B8966F]/40 dark:hover:border-[#D4B48A]/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5 text-[#B8966F] dark:text-[#D4B48A]" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                let's rock
                <svg className="w-4 h-4 text-[#B8966F] dark:text-[#D4B48A] transition-transform group-hover:translate-x-1" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-3 sm:space-x-4 w-full max-w-md mt-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4A574]/45 dark:via-[#B8946A] to-transparent"></div>
              <span className="text-[#B8966F] dark:text-[#D4B48A] text-xl sm:text-2xl font-bold">↓</span>
              <span className="text-[#B8966F] dark:text-[#D4B48A] text-xl sm:text-2xl font-bold opacity-90">↓</span>
              <span className="text-[#B8966F] dark:text-[#D4B48A] text-xl sm:text-2xl font-bold">↑</span>
              <span className="text-[#B8966F] dark:text-[#D4B48A] text-xl sm:text-2xl font-bold opacity-90">↓</span>
              <span className="text-[#B8966F] dark:text-[#D4B48A] text-xl sm:text-2xl font-bold">↑</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#D4A574]/45 dark:via-[#B8946A] to-transparent"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
