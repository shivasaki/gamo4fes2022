export interface Artist {
  id: number | null;
  name: string;
  snsLink: string | null;
}

export interface StageArtist {
  date: string | null;
  artists: Artist[];
  channel: number | null;
  locationName: string | null;
}
