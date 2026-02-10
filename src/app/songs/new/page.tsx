'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addSong } from '@/lib/songs';

export default function NewSongPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [chordsInput, setChordsInput] = useState('');
  const [strummingPattern, setStrummingPattern] = useState('');
  const [lyricBlocks, setLyricBlocks] = useState<
    { id: string; type: 'section' | 'line'; label: string; chords: string; text: string }[]
  >([{ id: '1', type: 'line', label: '', chords: '', text: '' }]);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'learning' | 'mastered'>('learning');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;

    const chords = chordsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    addSong({
      title: title.trim(),
      artist: artist.trim(),
      chords,
      strummingPattern: strummingPattern.trim(),
      lyrics: serializeLyrics(),
      notes: notes.trim(),
      status,
    });

    router.push('/songs');
  }

  function addSection() {
    setLyricBlocks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'section', label: '', chords: '', text: '' },
    ]);
  }

  function addLine() {
    setLyricBlocks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'line', label: '', chords: '', text: '' },
    ]);
  }

  function updateBlock(id: string, field: string, value: string) {
    setLyricBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  }

  function removeBlock(id: string) {
    setLyricBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  function serializeLyrics(): string {
    const parts: string[] = [];
    lyricBlocks.forEach((block, i) => {
      if (block.type === 'section' && block.label.trim()) {
        if (i > 0) parts.push('');
        parts.push(`[${block.label.trim()}]`);
      } else if (block.type === 'line') {
        if (block.chords.trim()) parts.push(block.chords);
        if (block.text.trim()) parts.push(block.text);
      }
    });
    return parts.join('\n').trim();
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-[#E8E1D6] dark:border-[#5A4A3A] bg-[#FAF8F5] dark:bg-[#3A2F24] text-[#4A3E2E] dark:text-[#F5E6D3] placeholder-[#8B7A65]/50 focus:outline-none focus:ring-2 focus:ring-[#B8966F]/30 focus:border-[#B8966F] transition-all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F6F2] via-[#F5F1EB] to-[#F0EBE4] dark:from-[#2D241A] dark:via-[#3A2F24] dark:to-[#46392E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-8 sm:py-12">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <Link
            href="/songs"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-[#46392E]/60 border border-[#E8E1D6] dark:border-[#5A4A3A] text-[#6B5F4F] dark:text-[#D4C4B0] hover:bg-white dark:hover:bg-[#46392E] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#4A3E2E] dark:text-[#F5E6D3]"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            Add New Song
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8]">Song Info</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] mb-1.5">
                  Title <span className="text-red-400">*</span>
                </label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Wonderwall" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="artist" className="block text-sm font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] mb-1.5">
                  Artist <span className="text-red-400">*</span>
                </label>
                <input id="artist" type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="e.g. Oasis" required className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] mb-2">Status</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('learning')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    status === 'learning'
                      ? 'bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400'
                      : 'bg-[#FAF8F5] border-[#E8E1D6] text-[#8B7A65] dark:bg-[#3A2F24] dark:border-[#5A4A3A] dark:text-[#C4B8A8]'
                  }`}
                >
                  Learning
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('mastered')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    status === 'mastered'
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-400'
                      : 'bg-[#FAF8F5] border-[#E8E1D6] text-[#8B7A65] dark:bg-[#3A2F24] dark:border-[#5A4A3A] dark:text-[#C4B8A8]'
                  }`}
                >
                  Mastered
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8]">Chords & Strumming</h2>

            <div>
              <label htmlFor="chords" className="block text-sm font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] mb-1.5">
                Chords
              </label>
              <input id="chords" type="text" value={chordsInput} onChange={(e) => setChordsInput(e.target.value)} placeholder="Em, G, D, A7sus4" className={inputClass} />
              <p className="mt-1.5 text-xs text-[#8B7A65] dark:text-[#C4B8A8]">Separate chords with commas</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] mb-1.5">
                Strumming Pattern
              </label>

              <div className="flex items-center min-h-[52px] px-4 py-2.5 rounded-xl border border-[#E8E1D6] dark:border-[#5A4A3A] bg-[#FAF8F5] dark:bg-[#3A2F24] mb-3">
                {strummingPattern ? (
                  <span className="text-2xl font-bold text-[#B8966F] dark:text-[#D4B48A] tracking-widest select-none">
                    {strummingPattern}
                  </span>
                ) : (
                  <span className="text-[#8B7A65]/50 text-sm">Tap the arrows below to build your pattern...</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStrummingPattern((p) => p + '↓')}
                  className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[#E8E1D6] dark:border-[#5A4A3A] text-xl font-bold text-[#B8966F] dark:text-[#D4B48A] hover:bg-[#B8966F]/10 dark:hover:bg-[#D4B48A]/10 hover:border-[#B8966F] dark:hover:border-[#D4B48A] active:scale-90 transition-all"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setStrummingPattern((p) => p + '↑')}
                  className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[#E8E1D6] dark:border-[#5A4A3A] text-xl font-bold text-[#B8966F] dark:text-[#D4B48A] hover:bg-[#B8966F]/10 dark:hover:bg-[#D4B48A]/10 hover:border-[#B8966F] dark:hover:border-[#D4B48A] active:scale-90 transition-all"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => setStrummingPattern((p) => p + 'x')}
                  className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[#E8E1D6] dark:border-[#5A4A3A] text-xl font-bold text-[#8B7A65] dark:text-[#C4B8A8] hover:bg-[#B8966F]/10 dark:hover:bg-[#D4B48A]/10 hover:border-[#B8966F] dark:hover:border-[#D4B48A] active:scale-90 transition-all"
                  title="Mute / Ghost strum"
                >
                  x
                </button>
                <button
                  type="button"
                  onClick={() => setStrummingPattern((p) => p + ' ')}
                  className="flex items-center justify-center h-12 px-4 rounded-xl border-2 border-dashed border-[#E8E1D6] dark:border-[#5A4A3A] text-xs font-semibold text-[#8B7A65] dark:text-[#C4B8A8] hover:bg-[#B8966F]/10 dark:hover:bg-[#D4B48A]/10 hover:border-[#B8966F] dark:hover:border-[#D4B48A] active:scale-90 transition-all"
                  title="Add space / separator"
                >
                  Space
                </button>

                <div className="w-px h-8 bg-[#E8E1D6] dark:bg-[#5A4A3A] mx-1"></div>

                <button
                  type="button"
                  onClick={() => setStrummingPattern((p) => p.slice(0, -1))}
                  className="flex items-center justify-center h-12 px-4 rounded-xl border-2 border-[#E8E1D6] dark:border-[#5A4A3A] text-sm font-semibold text-[#8B7A65] dark:text-[#C4B8A8] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 hover:border-red-300 dark:hover:border-red-800 active:scale-90 transition-all"
                  title="Remove last"
                >
                  ← Undo
                </button>
                <button
                  type="button"
                  onClick={() => setStrummingPattern('')}
                  className="flex items-center justify-center h-12 px-4 rounded-xl border-2 border-[#E8E1D6] dark:border-[#5A4A3A] text-sm font-semibold text-[#8B7A65] dark:text-[#C4B8A8] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 hover:border-red-300 dark:hover:border-red-800 active:scale-90 transition-all"
                  title="Clear all"
                >
                  Clear
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8]">Lyrics</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addSection}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-dashed border-[#E8E1D6] dark:border-[#5A4A3A] text-[#B8966F] dark:text-[#D4B48A] hover:bg-[#B8966F]/10 transition-colors"
                >
                  + Section
                </button>
                <button
                  type="button"
                  onClick={addLine}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E8E1D6] dark:border-[#5A4A3A] text-[#8B7A65] dark:text-[#C4B8A8] hover:bg-[#B8966F]/10 transition-colors"
                >
                  + Line
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {lyricBlocks.map((block) => (
                <div key={block.id} className="group relative">
                  {block.type === 'section' ? (
                    <div className="flex items-center gap-1 pt-2">
                      <span className="text-[#B8966F] dark:text-[#D4B48A] font-bold text-base select-none">[</span>
                      <input
                        type="text"
                        value={block.label}
                        onChange={(e) => updateBlock(block.id, 'label', e.target.value)}
                        placeholder="Verse 1, Chorus, Bridge..."
                        className="flex-1 px-1.5 py-1 bg-transparent text-sm font-semibold text-[#4A3E2E] dark:text-[#F5E6D3] placeholder-[#8B7A65]/40 focus:outline-none"
                      />
                      <span className="text-[#B8966F] dark:text-[#D4B48A] font-bold text-base select-none">]</span>
                      <button
                        type="button"
                        onClick={() => removeBlock(block.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-[#8B7A65] hover:text-red-500 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-[#E8E1D6] dark:border-[#5A4A3A] overflow-hidden">
                      <input
                        type="text"
                        value={block.chords}
                        onChange={(e) => updateBlock(block.id, 'chords', e.target.value)}
                        placeholder="Am  C  G  Em"
                        className="w-full px-3 py-2 bg-[#B8966F]/5 dark:bg-[#D4B48A]/5 text-[#B8966F] dark:text-[#D4B48A] font-mono font-bold text-sm placeholder-[#B8966F]/25 border-b border-[#E8E1D6] dark:border-[#5A4A3A] focus:outline-none focus:bg-[#B8966F]/10 dark:focus:bg-[#D4B48A]/10"
                      />
                      <div className="flex">
                        <input
                          type="text"
                          value={block.text}
                          onChange={(e) => updateBlock(block.id, 'text', e.target.value)}
                          placeholder="Lyrics text..."
                          className="flex-1 px-3 py-2 bg-white/30 dark:bg-[#46392E]/30 text-[#4A3E2E] dark:text-[#F5E6D3] font-mono text-sm placeholder-[#8B7A65]/30 focus:outline-none focus:bg-white/60 dark:focus:bg-[#46392E]/60"
                        />
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          className="opacity-0 group-hover:opacity-100 px-2.5 text-[#8B7A65] hover:text-red-500 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {lyricBlocks.length === 0 && (
              <p className="text-center text-sm text-[#8B7A65]/50 py-6">
                Add sections and lines to build your lyrics
              </p>
            )}
          </section>

          <section className="bg-white/70 dark:bg-[#46392E]/70 border border-[#E8E1D6] dark:border-[#5A4A3A] rounded-2xl p-5 sm:p-6 space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8B7A65] dark:text-[#C4B8A8]">Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Capo on 2nd fret, fingerpicking intro, tempo ~120 BPM..."
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </section>

          <div className="flex items-center gap-3 pb-8">
            <Link
              href="/songs"
              className="flex-1 py-3 text-center rounded-xl border border-[#E8E1D6] dark:border-[#5A4A3A] text-[#6B5F4F] dark:text-[#D4C4B0] font-semibold hover:bg-white/60 dark:hover:bg-[#46392E]/60 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#B8966F] hover:bg-[#A8865F] dark:bg-[#D4B48A] dark:hover:bg-[#C4A47A] text-white dark:text-[#2D241A] font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Save Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
