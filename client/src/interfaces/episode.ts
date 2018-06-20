export interface Episode {
  id: number;
  title: string;
  description: string;
  waveform_url: string;
  waveform_data: {
    width: number;
    height: number;
    samples: number[];
  };
  stream_url: string;
  streamable: boolean;
  created_at: Date;
  duration: number;
  showNotes: string;
  showNotesHTML: string;
}
