import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, List, Play, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-violet-400 bg-violet-400/10' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-white fill-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">VibeStream</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive('/')}`}>
            <PlusCircle size={20} />
            Add Video
          </Link>
          <Link to="/list" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive('/list')}`}>
            <List size={20} />
            Library
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-900">
             <p className="text-xs text-zinc-500">VibeStream v1.0</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
            </div>
            <h1 className="text-lg font-bold">VibeStream</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full mb-20 md:mb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 p-2 flex justify-around z-50 pb-safe">
        <Link to="/" className={`flex flex-col items-center p-2 rounded-lg ${isActive('/')}`}>
            <PlusCircle size={24} />
            <span className="text-[10px] mt-1">Add</span>
        </Link>
        <Link to="/list" className={`flex flex-col items-center p-2 rounded-lg ${isActive('/list')}`}>
            <List size={24} />
            <span className="text-[10px] mt-1">Library</span>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;