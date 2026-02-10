export interface Song {
  id: string;
  title: string;
  artist: string;
  chords: string[];
  strummingPattern: string;
  lyrics: string;
  notes: string;
  status: 'learning' | 'mastered';
  createdAt: string;
  updatedAt: string;
}
