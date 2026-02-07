import Link from 'next/link';

export default function SongsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F2] via-[#F5F1EB] to-[#F0EBE4] dark:from-[#2D241A] dark:via-[#3A2F24] dark:to-[#46392E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 sm:py-12">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-[#46392E]/60 border border-[#E8E1D6] dark:border-[#5A4A3A] text-[#6B5F4F] dark:text-[#D4C4B0] hover:bg-white dark:hover:bg-[#46392E] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#4A3E2E] dark:text-[#F5E6D3]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Songs
          </h1>
        </div>
      </div>
    </div>
  );
}
