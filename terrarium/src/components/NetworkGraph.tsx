import { useRef, useEffect, useState, useCallback } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from 'd3-force';
import { networkNodes, networkLinks, type NetworkNode } from '../data/sampleData';

interface SimNode extends SimulationNodeDatum {
  id: string;
  label: string;
  type: 'person' | 'company';
  group: number;
}

interface SimLink extends SimulationLinkDatum<SimNode> {
  label: string;
}

const groupColors: Record<number, string> = {
  1: '#a78bfa',
  2: '#4de1f2',
  3: '#f472b6',
  4: '#f2a94d',
  5: '#6ee7b7',
};

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const linksRef = useRef<SimLink[]>([]);
  const simRef = useRef<ReturnType<typeof forceSimulation<SimNode>> | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const nodes = nodesRef.current;
    const links = linksRef.current;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Draw links
    for (const link of links) {
      const source = link.source as SimNode;
      const target = link.target as SimNode;
      if (source.x == null || target.x == null) continue;

      const isHighlighted =
        hoveredNode &&
        ((source.id === hoveredNode.id) || (target.id === hoveredNode.id));

      ctx.beginPath();
      ctx.moveTo(cx + source.x, cy + source.y!);
      ctx.lineTo(cx + target.x, cy + target.y!);
      ctx.strokeStyle = isHighlighted ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.07)';
      ctx.lineWidth = isHighlighted ? 1.5 : 0.5;
      ctx.stroke();

      // Label on link if highlighted
      if (isHighlighted) {
        const mx = cx + (source.x + target.x) / 2;
        const my = cy + (source.y! + target.y!) / 2;
        ctx.font = '9px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.textAlign = 'center';
        ctx.fillText(link.label, mx, my - 4);
      }
    }

    // Draw nodes
    for (const node of nodes) {
      if (node.x == null || node.y == null) continue;

      const isHovered = hoveredNode?.id === node.id;
      const isConnected =
        hoveredNode &&
        links.some(
          (l) =>
            ((l.source as SimNode).id === hoveredNode.id && (l.target as SimNode).id === node.id) ||
            ((l.target as SimNode).id === hoveredNode.id && (l.source as SimNode).id === node.id)
        );
      const dimmed = hoveredNode && !isHovered && !isConnected;

      const x = cx + node.x;
      const y = cy + node.y;
      const color = groupColors[node.group] || '#888';
      const radius = node.type === 'company' ? 8 : 5;

      // Glow
      if (isHovered || isConnected) {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        grad.addColorStop(0, color + '40');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.beginPath();
      if (node.type === 'company') {
        const s = radius;
        ctx.moveTo(x - s, y - s);
        ctx.lineTo(x + s, y - s);
        ctx.lineTo(x + s, y + s);
        ctx.lineTo(x - s, y + s);
        ctx.closePath();
      } else {
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = dimmed ? color + '30' : color;
      ctx.fill();

      // Label
      ctx.font = `${isHovered ? '600 11px' : '400 10px'} Inter, sans-serif`;
      ctx.fillStyle = dimmed ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, x, y + radius + 14);
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [hoveredNode]);

  useEffect(() => {
    const nodes: SimNode[] = networkNodes.map((n) => ({ ...n, x: undefined, y: undefined }));
    const links: SimLink[] = networkLinks.map((l) => ({
      source: l.source,
      target: l.target,
      label: l.label,
    }));

    nodesRef.current = nodes;
    linksRef.current = links;

    const sim = forceSimulation(nodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance(80)
      )
      .force('charge', forceManyBody().strength(-200))
      .force('center', forceCenter(0, 0))
      .force('collide', forceCollide(25))
      .alphaDecay(0.02);

    simRef.current = sim;
    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      sim.stop();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [draw]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      mouseRef.current = { x: mx, y: my };

      const nodes = nodesRef.current;
      let found: SimNode | null = null;
      for (const node of nodes) {
        if (node.x == null || node.y == null) continue;
        const dx = node.x - mx;
        const dy = node.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < 18) {
          found = node;
          break;
        }
      }
      setHoveredNode(found);
      canvas.style.cursor = found ? 'pointer' : 'default';
    },
    []
  );

  return (
    <div className="card network-card" ref={containerRef}>
      <div className="card-header">
        <div className="card-icon" style={{ color: 'var(--accent-violet)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="6" r="3"/>
            <circle cx="19" cy="6" r="3"/>
            <circle cx="12" cy="18" r="3"/>
            <line x1="5" y1="9" x2="12" y2="15"/>
            <line x1="19" y1="9" x2="12" y2="15"/>
          </svg>
        </div>
        <h3 className="card-title">Network</h3>
      </div>
      <canvas
        ref={canvasRef}
        className="network-canvas"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
      />
      <div className="network-legend">
        {Object.entries(groupColors).map(([group, color]) => {
          const labels: Record<string, string> = {
            '1': 'Pioneers', '2': 'OpenAI', '3': 'Anthropic', '4': 'Google/DeepMind', '5': 'Meta',
          };
          return (
            <span key={group} className="globe-legend-item">
              <span className="globe-legend-dot" style={{ background: color }} />
              {labels[group]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
