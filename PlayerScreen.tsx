import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useVideo } from './VideoContext';
import { ArrowLeft, ExternalLink, Share2, AlertCircle } from 'lucide-react';

const PlayerScreen = () => {
  const { id } = useParams<{ id: string }>();
  const { getVideo } = useVideo();
  const navigate = useNavigate();

  const video = id ? getVideo(id) : undefined;

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Video Not Found</h2>
        <p className="text-zinc-500 mb-6">The video you are looking for does not exist or has been removed.</p>
        <Link to="/list" className="text-violet-400 hover:text-violet-300 font-medium">
          Return to Library
        </Link>
      </div>
    );
  }

  // Adding origin fixes some playback restrictions
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&origin=${window.location.origin}`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl mx-auto">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button 
            onClick={() => navigate('/list')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
        >
            <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-zinc-800 border border-zinc-800">
                <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Library</span>
        </button>

        <button 
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all"
            onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                // Simple feedback
                const btn = document.activeElement as HTMLElement;
                const originalText = btn.innerText;
                // Just a visual vibe check, in a real app use a toast
                if(btn) btn.style.color = '#a78bfa'; // violet-400
            }}
        >
            <Share2 size={16} />
            <span className="text-sm">Share</span>
        </button>
      </div>

      {/* Main Player Container */}
      <div className="bg-zinc-900 rounded-2xl p-1.5 border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden relative group">
          <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full z-10"
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Fallback/Hint message hidden behind the iframe usually, or visible if iframe fails/loads transparently */}
          <div className="absolute inset-0 flex items-center justify-center z-0 text-zinc-600">
             Loading Stream...
          </div>
      </div>

      {/* Error / Fallback info */}
      <div className="mt-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 flex items-start gap-3">
         <AlertCircle className="text-zinc-500 shrink-0 mt-0.5" size={18} />
         <div className="text-sm text-zinc-400">
            <p>If the video doesn't play, the owner might have disabled playback on other websites.</p>
            <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1 mt-1"
            >
                Watch directly on YouTube <ExternalLink size={12} />
            </a>
         </div>
      </div>

      {/* Video Details */}
      <div className="mt-6">
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 leading-tight mb-3">
            {video.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                    Added {new Date(video.createdAt).toLocaleDateString()}
                </span>
                <span className="uppercase tracking-wider text-xs font-semibold">YouTube ID: {video.youtubeId}</span>
            </div>
      </div>
    </div>
  );
};

export default PlayerScreen;