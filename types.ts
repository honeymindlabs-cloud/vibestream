export interface Video {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  createdAt: number;
}

export interface VideoContextType {
  videos: Video[];
  addVideo: (url: string, title?: string) => void;
  removeVideo: (id: string) => void;
  getVideo: (id: string) => Video | undefined;
}