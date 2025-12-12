import React from 'react';
import { Link } from 'react-router-dom';
import { useVideo } from './VideoContext';
import { getThumbnailUrl } from './utils';
import { Play, Trash2, Clock, Inbox } from 'lucide-react';

const ListScreen = () => {
  const { videos, removeVideo } = useVideo();

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
            <Inbox size={32} className="text-zinc-600" />
        </div>
        <h3 className="text-xl font-semibold text-zinc-200 mb-2">Your library is empty</h3>
        <p className="text-zinc-500 max-w-xs mx-auto mb-8">Start by adding some YouTube videos to curate your personal vibe.</p>
        <Link
          to="/"
          className="bg-zinc-100 text-zinc-950 hover:bg-zinc-200 px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Add First Video
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Library</h2>
        <span className="text-zinc-500 text-sm font-medium bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            {videos.length} {videos.length === 1 ? 'Video' : 'Videos'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-900/10 flex flex-col"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-video bg-zinc-950 overflow-hidden">
              <img
                src={getThumbnailUrl(video.youtubeId)}
                alt={video.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                 <Link to={`/play/${video.id}`} className="transform scale-90 group-hover:scale-100 transition-transform duration-200">
                    <div className="w-14 h-14 bg-violet-600/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                        <Play size={24} className="fill-white text-white ml-1" />
                    </div>
                 </Link>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-zinc-100 line-clamp-2 leading-snug mb-2 group-hover:text-violet-400 transition-colors">
                {video.title}
              </h3>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-800/50">
                 <div className="flex items-center text-xs text-zinc-500 gap-1">
                    <Clock size={12} />
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                 </div>
                 
                 <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if(confirm('Delete this video?')) removeVideo(video.id);
                    }}
                    className="text-zinc-500 hover:text-red-400 p-2 -mr-2 rounded-lg hover:bg-red-400/10 transition-colors"
                    title="Remove video"
                 >
                    <Trash2 size={16} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListScreen;