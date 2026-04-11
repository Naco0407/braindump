import { useRef, useState } from 'react';
import { timelineEvents, type TimelineEvent } from '../data/sampleData';

const categoryConfig: Record<string, { color: string; label: string }> = {
  person: { color: '#a78bfa', label: '人物' },
  company: { color: '#4de1f2', label: '企業' },
  event: { color: '#f2a94d', label: 'イベント' },
  publication: { color: '#f472b6', label: '論文・発表' },
};

function TimelineNode({ event, isActive, onClick }: {
  event: TimelineEvent;
  isActive: boolean;
  onClick: () => void;
}) {
  const { color } = categoryConfig[event.category];

  return (
    <div
      className={`timeline-node ${isActive ? 'timeline-node--active' : ''}`}
      onClick={onClick}
    >
      <div className="timeline-node-year" style={{ color }}>{event.date}</div>
      <div className="timeline-node-dot-wrapper">
        <div
          className="timeline-node-dot"
          style={{
            background: color,
            boxShadow: isActive ? `0 0 12px ${color}80` : 'none',
            transform: isActive ? 'scale(1.5)' : 'scale(1)',
          }}
        />
      </div>
      <div className="timeline-node-content">
        <h4 className="timeline-node-title">{event.title}</h4>
        {isActive && (
          <p className="timeline-node-desc">{event.description}</p>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="card timeline-card">
      <div className="card-header">
        <div className="card-icon" style={{ color: 'var(--accent-rose)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <h3 className="card-title">Timeline</h3>
        <div className="timeline-legend">
          {Object.entries(categoryConfig).map(([key, { color, label }]) => (
            <span key={key} className="globe-legend-item">
              <span className="globe-legend-dot" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="timeline-scroll" ref={scrollRef}>
        <div className="timeline-line" />
        {timelineEvents.map((event) => (
          <TimelineNode
            key={event.id}
            event={event}
            isActive={activeId === event.id}
            onClick={() => setActiveId(activeId === event.id ? null : event.id)}
          />
        ))}
      </div>
    </div>
  );
}
