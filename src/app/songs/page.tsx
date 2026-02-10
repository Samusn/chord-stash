'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Song } from '@/types/song';
import { getSongs, deleteSong, updateSong } from '@/lib/songs';

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSongs(getSongs());
  }, []);

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase()) ||
      s.chords.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  function handleDelete(id: string) {
    deleteSong(id);
    setSongs(getSongs());
  }

  function handleToggleStatus(song: Song) {
    const newStatus = song.status === 'learning' ? 'mastered' : 'learning';
    updateSong(song.id, { status: newStatus });
    setSongs(getSongs());
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F2] via-[#F5F1EB] to-[#F0EBE4] dark:from-[#2D241A] dark:via-[#3A2F24] dark:to-[#46392E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-[#46392E]/60 border border-[#E8E1D6] dark:border-[#5A4A3A] text-[#6B5F4F] dark:text-[#D4C4B0] hover:bg-white dark:hover:bg-[#46392E] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#4A3E2E] dark:text-[#F5E6D3]"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                My Songs
              </h1>
              <p className="text-sm text-[#8B7A65] dark:text-[#C4B8A8]">
                {songs.length} {songs.length === 1 ? 'song' : 'songs'}
              </p>
            </div>
          </div>
          <Link
            href="/songs/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#B8966F] hover:bg-[#A8865F] dark:bg-[#D4B48A] dark:hover:bg-[#C4A47A] text-white dark:text-[#2D241A] font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add Song</span>
          </Link>
        </div>

        <div className="relative mb-6">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7A65] dark:text-[#C4B8A8]" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, artist or chord..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8E1D6] dark:border-[#5A4A3A] bg-white/70 dark:bg-[#46392E]/70 text-[#4A3E2E] dark:text-[#F5E6D3] placeholder-[#8B7A65] dark:placeholder-[#C4B8A8] focus:outline-none focus:ring-2 focus:ring-[#B8966F]/30 focus:border-[#B8966F] transition-all"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#B8966F]/10 dark:bg-[#D4B48A]/10 flex items-center justify-center">
              <span className="text-3xl text-[#B8966F] dark:text-[#D4B48A]">♪</span>
            </div>
            <h2 className="text-xl font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] mb-2">
              {search ? 'No songs found' : 'No songs yet'}
            </h2>
            <p className="text-[#8B7A65] dark:text-[#C4B8A8] mb-6 max-w-sm mx-auto">
              {search ? 'Try a different search term.' : 'Add your first song to get started!'}
            </p>
            {!search && (
              <Link
                href="/songs/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8966F] hover:bg-[#A8865F] dark:bg-[#D4B48A] dark:hover:bg-[#C4A47A] text-white dark:text-[#2D241A] font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Song
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((song) => (
              <div
                key={song.id}
                className="group bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl overflow-hidden hover:shadow-md hover:border-[#D4A574]/30 dark:hover:border-[#B8946A]/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                  <Link href={`/songs/${song.id}`} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-lg font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] truncate">
                        {song.title}
                      </h3>
                      <span
                        className={`flex-shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          song.status === 'mastered'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}
                      >
                        {song.status === 'mastered' ? 'Mastered' : 'Learning'}
                      </span>
                    </div>
                    <p className="text-sm text-[#8B7A65] dark:text-[#C4B8A8] mb-2">{song.artist}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {song.chords.slice(0, 5).map((chord, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-[#F5F1EB] dark:bg-[#3A2F24] text-[#6B5F4F] dark:text-[#D4C4B0] border border-[#E8E1D6]/60 dark:border-[#5A4A3A]/60"
                        >
                          {chord}
                        </span>
                      ))}
                      {song.chords.length > 5 && (
                        <span className="text-xs text-[#8B7A65] dark:text-[#C4B8A8]">+{song.chords.length - 5}</span>
                      )}
                      {song.strummingPattern && (
                        <span className="text-xs font-bold text-[#B8966F] dark:text-[#D4B48A] ml-1">{song.strummingPattern}</span>
                      )}
                    </div>
                  </Link>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleToggleStatus(song)}
                      className="p-2 rounded-lg text-[#8B7A65] hover:text-[#B8966F] hover:bg-[#B8966F]/10 transition-all"
                      title="Toggle status"
                    >
                      <svg className="w-4 h-4" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(song.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-[#8B7A65] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <Link href={`/songs/${song.id}`} className="p-2 rounded-lg text-[#8B7A65] hover:text-[#B8966F] hover:bg-[#B8966F]/10 transition-all">
                      <svg className="w-4 h-4" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
