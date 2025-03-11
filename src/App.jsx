import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';
import DetailView from './pages/DetailView';
import { DetectionProvider } from './context/DetectionContext';

function App() {
  return (
    <DetectionProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 w-full">
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
              <Route path="/details/:id" element={<DetailView />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DetectionProvider>
  );
}

export default App;