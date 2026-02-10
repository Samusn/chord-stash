import { Song } from '@/types/song';

const STORAGE_KEY = 'chord-stash-songs';

export function getSongs(): Song[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveSongs(songs: Song[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

export function addSong(song: Omit<Song, 'id' | 'createdAt' | 'updatedAt'>): Song {
  const songs = getSongs();
  const newSong: Song = {
    ...song,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  songs.push(newSong);
  saveSongs(songs);
  return newSong;
}

export function deleteSong(id: string): void {
  const songs = getSongs().filter((s) => s.id !== id);
  saveSongs(songs);
}

export function updateSong(id: string, updates: Partial<Song>): Song | null {
  const songs = getSongs();
  const index = songs.findIndex((s) => s.id === id);
  if (index === -1) return null;
  songs[index] = { ...songs[index], ...updates, updatedAt: new Date().toISOString() };
  saveSongs(songs);
  return songs[index];
}
