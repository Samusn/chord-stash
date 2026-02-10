'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Song } from '@/types/song';
import { getSongs, deleteSong, updateSong } from '@/lib/songs';

interface LyricBlock {
  type: 'section' | 'line' | 'empty';
  label?: string;
  chords?: string;
  text?: string;
}

function isChordLine(line: string): boolean {
  if (!line.trim()) return false;
  const tokens = line.trim().split(/\s+/);
  const chordPattern = /^[A-G][#b]?(m|M|maj|min|dim|aug|sus[24]?|add\d*|7|9|11|13|6|2|4|5)*(\/[A-G][#b]?)?$/;
  const chordCount = tokens.filter((t) => chordPattern.test(t)).length;
  return tokens.length > 0 && chordCount / tokens.length >= 0.5;
}

function parseLyrics(raw: string): LyricBlock[] {
  const lines = raw.split('\n');
  const blocks: LyricBlock[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      blocks.push({ type: 'empty' });
      i++;
      continue;
    }
    const sectionMatch = line.trim().match(/^\[(.+)\]$/);
    if (sectionMatch) {
      blocks.push({ type: 'section', label: sectionMatch[1] });
      i++;
      continue;
    }
    if (isChordLine(line)) {
      const next = i + 1 < lines.length ? lines[i + 1] : '';
      const nextIsEmpty = !next.trim();
      const nextIsSection = next.trim().match(/^\[.+\]$/);
      const nextIsChord = isChordLine(next);
      if (!nextIsEmpty && !nextIsSection && !nextIsChord && next) {
        blocks.push({ type: 'line', chords: line, text: next });
        i += 2;
      } else {
        blocks.push({ type: 'line', chords: line, text: '' });
        i++;
      }
      continue;
    }
    blocks.push({ type: 'line', chords: '', text: line });
    i++;
  }
  return blocks;
}

export default function SongDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    const found = getSongs().find((s) => s.id === id);
    if (!found) {
      router.push('/songs');
      return;
    }
    setSong(found);
  }, [id, router]);

  function toggleStatus() {
    if (!song) return;
    const newStatus = song.status === 'learning' ? 'mastered' : 'learning';
    const updated = updateSong(song.id, { status: newStatus });
    if (updated) setSong(updated);
  }

  function handleDelete() {
    if (!song) return;
    deleteSong(song.id);
    router.push('/songs');
  }

  if (!song) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F2] via-[#F5F1EB] to-[#F0EBE4] dark:from-[#2D241A] dark:via-[#3A2F24] dark:to-[#46392E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/songs"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-[#46392E]/60 border border-[#E8E1D6] dark:border-[#5A4A3A] text-[#6B5F4F] dark:text-[#D4C4B0] hover:bg-white dark:hover:bg-[#46392E] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#4A3E2E] dark:text-[#F5E6D3]"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {song.title}
            </h1>
            <button
              onClick={toggleStatus}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full cursor-pointer transition-all hover:scale-105 ${
                song.status === 'mastered'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              }`}
            >
              {song.status === 'mastered' ? 'Mastered' : 'Learning'}
            </button>
          </div>
          <p className="text-lg text-[#8B7A65] dark:text-[#C4B8A8]">{song.artist}</p>
        </div>

        <div className="space-y-6">
          {song.chords.length > 0 && (
            <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8] mb-3">Chords</h2>
              <div className="flex flex-wrap gap-2">
                {song.chords.map((chord, i) => (
                  <span
                    key={i}
                    className="text-base font-mono font-bold px-4 py-2 rounded-xl bg-[#F5F1EB] dark:bg-[#3A2F24] text-[#4A3E2E] dark:text-[#F5E6D3] border border-[#E8E1D6] dark:border-[#5A4A3A]"
                  >
                    {chord}
                  </span>
                ))}
              </div>
            </section>
          )}

          {song.strummingPattern && (
            <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8] mb-3">Strumming Pattern</h2>
              <span className="text-3xl font-bold text-[#B8966F] dark:text-[#D4B48A] tracking-widest">
                {song.strummingPattern}
              </span>
            </section>
          )}

          {song.lyrics && (
            <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8] mb-4">Lyrics</h2>
              <div className="space-y-0.5">
                {parseLyrics(song.lyrics).map((block, i) => {
                  if (block.type === 'empty') return <div key={i} className="h-4" />;
                  if (block.type === 'section')
                    return (
                      <h3
                        key={i}
                        className="text-xs font-bold text-[#B8966F] dark:text-[#D4B48A] pt-5 pb-1 uppercase tracking-widest"
                      >
                        [{block.label}]
                      </h3>
                    );
                  return (
                    <div key={i} className="font-mono overflow-x-auto">
                      {block.chords && (
                        <div className="text-sm font-bold text-[#B8966F] dark:text-[#D4B48A] whitespace-pre leading-snug select-all">
                          {block.chords}
                        </div>
                      )}
                      {block.text && (
                        <div className="text-sm text-[#4A3E2E] dark:text-[#F5E6D3] whitespace-pre leading-relaxed">
                          {block.text}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {song.notes && (
            <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8] mb-3">Notes</h2>
              <p className="text-[#4A3E2E] dark:text-[#F5E6D3] leading-relaxed whitespace-pre-wrap">{song.notes}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
