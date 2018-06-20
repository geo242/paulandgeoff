export interface Episode {
  id: number;
  title: string;
  description: string;
  waveform_url: string;
  created_at: Date;
  duration: number;
  showNotes: string;
  showNotesHTML: string;
}
