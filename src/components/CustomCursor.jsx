import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const MAGNET_RANGE = 88;
const MAGNET_PULL = 1;
const LERP_SPEED = 0.12; 
const INTERACTIVE = 'a, button';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringWrapRef = useRef(null);
  const ringRef = useRef(null);
  
  const current = useRef({ x: -200, y: -200, w: 34, h: 34, br: 17 });
  const target = useRef({ x: -200, y: -200, w: 34, h: 34, br: 17 });
  
  const pos = useRef({ x: -200, y: -200 });
  const rafId = useRef(null);
  const [hover,  setHover]  = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      const mx = e.clientX, my = e.clientY;
      pos.current = { x: mx, y: my };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }

      const el = document.elementFromPoint(mx, my)?.closest(INTERACTIVE);

      if (el) {
        target.current = {
          x: mx,
          y: my,
          w: 56, 
          h: 56,
          br: 28
        };
        setHover(true);
      } else {
        const nodes = document.querySelectorAll(INTERACTIVE);
        let minDist = Infinity, best = null;
        
        nodes.forEach(node => {
          const rect = node.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          if (rect.width > 200 || rect.height > 120) return;

          const cx = rect.left + rect.width  / 2;
          const cy = rect.top  + rect.height / 2;
          const d  = Math.hypot(cx - mx, cy - my);
          if (d < minDist) { minDist = d; best = { cx, cy, d }; }
        });

        if (best && best.d < MAGNET_RANGE) {
          const pull = (1 - best.d / MAGNET_RANGE) * MAGNET_PULL;
          target.current = {
            x: mx + (best.cx - mx) * pull,
            y: my + (best.cy - my) * pull,
            w: 34, h: 34, br: 17
          };
        } else {
          target.current = { x: mx, y: my, w: 34, h: 34, br: 17 };
        }
        setHover(false);
      }
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const loop = () => {
      current.current.x  = lerp(current.current.x, target.current.x, LERP_SPEED);
      current.current.y  = lerp(current.current.y, target.current.y, LERP_SPEED);
      current.current.w  = lerp(current.current.w, target.current.w, LERP_SPEED);
      current.current.h  = lerp(current.current.h, target.current.h, LERP_SPEED);
      current.current.br = lerp(current.current.br, target.current.br, LERP_SPEED);

      if (ringWrapRef.current && ringRef.current) {
        ringWrapRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
        
        ringRef.current.style.width = `${current.current.w}px`;
        ringRef.current.style.height = `${current.current.h}px`;
        ringRef.current.style.borderRadius = `${current.current.br}px`;
        ringRef.current.style.margin = `-${current.current.h / 2}px 0 0 -${current.current.w / 2}px`;
      }
      
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      <div ref={dotRef} className={`c-dot${hover ? ' c-dot--hover' : ''}${hidden ? ' c-dot--hidden' : ''}`} />
      <div ref={ringWrapRef} className="c-ring-wrap">
        <div ref={ringRef} className={`c-ring${hover ? ' c-ring--hover' : ''}${hidden ? ' c-ring--hidden' : ''}`} />
      </div>
    </>
  );
}