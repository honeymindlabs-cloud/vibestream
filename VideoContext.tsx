import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video, VideoContextType } from './types';
import { getYoutubeId } from './utils';

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vibestream_videos');
    if (saved) {
      try {
        setVideos(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse videos", e);
      }
    }
  }, []);

  // Save to local storage whenever videos change
  useEffect(() => {
    localStorage.setItem('vibestream_videos', JSON.stringify(videos));
  }, [videos]);

  const addVideo = (url: string, title: string = 'Untitled Video') => {
    const youtubeId = getYoutubeId(url);
    if (!youtubeId) {
      alert("Invalid YouTube URL");
      return;
    }

    const newVideo: Video = {
      id: crypto.randomUUID(),
      youtubeId,
      url,
      title: title || `Video ${youtubeId}`,
      createdAt: Date.now(),
    };

    setVideos((prev) => [newVideo, ...prev]);
  };

  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const getVideo = (id: string) => {
    return videos.find((v) => v.id === id);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo, removeVideo, getVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};