import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVideo } from './VideoContext';
import { Link2, Type, ChevronRight } from 'lucide-react';
import { getYoutubeId } from './utils';

const InputScreen = () => {
  const { addVideo } = useVideo();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!getYoutubeId(url)) {
        setError('Please enter a valid YouTube URL');
        return;
    }

    addVideo(url, title || 'Untitled Vibe');
    navigate('/list');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-400 mb-6 ring-1 ring-violet-500/20">
                <Link2 size={32} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-zinc-100">Add a Stream</h2>
            <p className="text-zinc-400">Paste a YouTube link to add it to your collection.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Video URL</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link2 className="text-zinc-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                </div>
                <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all placeholder:text-zinc-600"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300 ml-1">Title <span className="text-zinc-600 font-normal">(Optional)</span></label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Type className="text-zinc-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                </div>
                <input
                    type="text"
                    placeholder="My Awesome Video"
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all placeholder:text-zinc-600"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-violet-900/20 flex items-center justify-center gap-2 group mt-4"
          >
            <span>Add to Library</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputScreen;