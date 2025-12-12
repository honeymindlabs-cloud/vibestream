import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { VideoProvider } from './contexts/VideoContext';
import Layout from './components/Layout';
import InputScreen from './screens/InputScreen';
import ListScreen from './screens/ListScreen';
import PlayerScreen from './screens/PlayerScreen';

function App() {
  return (
    <VideoProvider>
      <HashRouter>
        <Layout>
          <Routes>
            {/* Screen 1: Input */}
            <Route path="/" element={<InputScreen />} />
            
            {/* Screen 2: List */}
            <Route path="/list" element={<ListScreen />} />
            
            {/* Screen 3: Player */}
            <Route path="/play/:id" element={<PlayerScreen />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </VideoProvider>
  );
}

export default App;