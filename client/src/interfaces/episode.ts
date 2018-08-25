export interface Episode {
  episodeId: number;
  title: string;
  description: string;
  waveform_url: string;
  waveform: {
    width: number;
    height: number;
    samples: number[];
  };
  streamUrl: string;
  streamable: boolean;
  createdAt: Date;
  lastModified: Date;
  duration: number;
  showNotes: string;
  showNotesHTML: string;
}
