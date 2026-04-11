import { useState } from 'react';
import Globe from './components/Globe';
import NetworkGraph from './components/NetworkGraph';
import Bookshelf from './components/Bookshelf';
import Timeline from './components/Timeline';
import './App.css';

type Page = 'globe' | 'network' | 'library' | 'timeline';

const pages: { id: Page; label: string; sublabel: string }[] = [
  { id: 'globe', label: 'Map', sublabel: '地理と拠点' },
  { id: 'network', label: 'Network', sublabel: '人物と組織' },
  { id: 'library', label: 'Library', sublabel: '読書記録' },
  { id: 'timeline', label: 'Timeline', sublabel: '年表' },
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('globe');

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">T</span>
          <div>
            <h1 className="sidebar-title">Terrarium</h1>
            <p className="sidebar-subtitle">Research Explorer</p>
          </div>
        </div>

        <div className="sidebar-nav">
          {pages.map((page) => (
            <button
              key={page.id}
              className={`nav-item ${currentPage === page.id ? 'nav-item--active' : ''}`}
              onClick={() => setCurrentPage(page.id)}
            >
              <NavIcon page={page.id} />
              <div className="nav-item-text">
                <span className="nav-item-label">{page.label}</span>
                <span className="nav-item-sublabel">{page.sublabel}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">Research notes &amp; discoveries</p>
        </div>
      </nav>

      <main className="page-content">
        {currentPage === 'globe' && <Globe />}
        {currentPage === 'network' && <NetworkGraph />}
        {currentPage === 'library' && <Bookshelf />}
        {currentPage === 'timeline' && <Timeline />}
      </main>
    </div>
  );
}

function NavIcon({ page }: { page: Page }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (page) {
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case 'network':
      return <svg {...props}><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><line x1="5" y1="8.5" x2="12" y2="15.5"/><line x1="19" y1="8.5" x2="12" y2="15.5"/></svg>;
    case 'library':
      return <svg {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
    case 'timeline':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  }
}

export default App;
