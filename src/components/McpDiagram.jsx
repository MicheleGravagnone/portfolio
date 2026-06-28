import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../AppContext';
import { content } from '../i18n';
import './McpDiagram.css';

const WIRES = [
  { id: 'c1', d: 'M247,310 C 330,310 365,180 455,180', anim: 1 },
  { id: 'c2', d: 'M660,210 L660,258', anim: 1 },
  { id: 'c3', d: 'M590,362 C 556,390 516,378 515,400', anim: 1, mode: 'round' },
  { id: 'c4', d: 'M745,362 C 778,390 795,378 795,400', anim: 1, mode: 'round' },
  { id: 'c5b', d: 'M777,310 C 882,310 950,302 1030,302', anim: 1 },
  { id: 'c5a', d: 'M777,310 C 888,300 950,204 1030,204', anim: 0 },
  { id: 'c5c', d: 'M777,310 C 888,322 950,400 1030,400', anim: 0 },
  { id: 'c6', d: 'M1030,338 C 952,382 952,492 762,500 C 520,508 340,502 174,368', anim: 1 }
];

const PHASES = [
  { path: 'c1', mode: 'fwd', dur: 3000, nodes: ['controller'] },
  { path: 'c2', mode: 'fwd', dur: 2000, nodes: ['orch'] },
  { path: 'c3', mode: 'round', dur: 3000, nodes: ['registry'] },
  { path: 'c4', mode: 'round', dur: 3000, nodes: ['redis'] },
  { path: 'c5b', mode: 'fwd', dur: 3300, nodes: ['s2'] },
  { path: 'c6', mode: 'fwd', dur: 3900, nodes: ['agent'] }
];

export default function McpDiagram({ className = '' }) {
  const { lang } = useApp();
  
  const i18n = content[lang]?.mcpDiagram || content.en.mcpDiagram;
  const t = i18n.text;
  const ph = i18n.phases;

  const [curPhase, setCurPhase] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const packetGroupRef = useRef(null);
  const pkGlowRef = useRef(null);
  const pkDotRef = useRef(null);
  const pkRingRef = useRef(null);

  const engine = useRef({
    destroyed: false, paused: false, resume: null,
    pathEls: {}, flowEls: {}, hotEls: {}, hotLen: {}, raf: null, timeout: null
  });

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion:reduce)').matches);
  }, []);

  useEffect(() => {
    engine.current.paused = isPaused;
    if (!isPaused && engine.current.resume) {
      const r = engine.current.resume;
      engine.current.resume = null;
      r();
    }
  }, [isPaused]);

  useEffect(() => {
    const e = engine.current;
    e.destroyed = false;

    WIRES.forEach((w) => {
      if (w.anim && e.hotEls[w.id]) {
        const len = e.hotEls[w.id].getTotalLength();
        e.hotLen[w.id] = len;
        e.hotEls[w.id].style.strokeDasharray = len;
        e.hotEls[w.id].style.strokeDashoffset = len;
      }
    });

    const scaleStage = () => {
      if (!wrapRef.current || !stageRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const s = rect.width / 1400;
      stageRef.current.style.transform = `scale(${s})`;
      wrapRef.current.style.height = `${rect.width * (600 / 1400)}px`;
    };
    
    scaleStage();
    const ro = new ResizeObserver(scaleStage);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', scaleStage, { passive: true });

    const q = (s) => wrapRef.current?.querySelector(s);

    const setHot = (id, p, active) => {
      const hot = e.hotEls[id];
      if (!hot) return;
      hot.style.opacity = active ? '.95' : '.5';
      hot.style.strokeDashoffset = e.hotLen[id] * (1 - p);
    };

    const lightNode = (name, state) => {
      const el = q(`[data-node="${name}"]`);
      if (!el) return;
      const ac = '#cdf463';
      if (state === 'active') {
        el.style.borderColor = ac; el.style.color = ac;
        el.style.boxShadow = `0 0 28px -8px ${ac}`;
        if (!reduced) el.style.animation = 'mcp_nodePulse 2.2s ease-in-out infinite';
      } else if (state === 'visited') {
        el.style.animation = 'none'; el.style.borderColor = ac; el.style.color = ac;
        el.style.boxShadow = `0 0 16px -11px ${ac}`; el.style.filter = 'saturate(.85)';
      } else {
        el.style.animation = ''; el.style.borderColor = ''; el.style.color = '';
        el.style.boxShadow = ''; el.style.filter = '';
      }
    };

    const showPacket = (on) => { if (packetGroupRef.current) packetGroupRef.current.style.opacity = on ? '1' : '0'; };
    const setPacket = (x, y) => {
      [pkGlowRef, pkDotRef, pkRingRef].forEach((ref) => {
        if (ref.current) { ref.current.setAttribute('cx', x); ref.current.setAttribute('cy', y); }
      });
    };

    const easeInOut = (time) => time < .5 ? 2 * time * time : 1 - Math.pow(-2 * time + 2, 2) / 2;

    const enterPhase = (i) => {
      setIsActive(true);
      setCurPhase(i);
      const phaseData = PHASES[i];
      if (e.flowEls[phaseData.path]) e.flowEls[phaseData.path].style.opacity = '.5';
      phaseData.nodes.forEach((n) => lightNode(n, 'active'));
      showPacket(true);
    };

    const afterPhase = (i) => {
      const phaseData = PHASES[i];
      if (e.flowEls[phaseData.path]) e.flowEls[phaseData.path].style.opacity = '.22';
      if (phaseData.mode === 'round') {
        const hot = e.hotEls[phaseData.path];
        if (hot) hot.style.opacity = '0';
      } else {
        setHot(phaseData.path, 1, false);
      }
      phaseData.nodes.forEach((n) => lightNode(n, 'visited'));
      showPacket(false);
    };

    const resetTrace = () => {
      setIsActive(false);
      WIRES.forEach((w) => {
        if (e.flowEls[w.id]) e.flowEls[w.id].style.opacity = '.16';
        if (e.hotEls[w.id]) { e.hotEls[w.id].style.opacity = '0'; e.hotEls[w.id].style.strokeDashoffset = e.hotLen[w.id]; }
      });
      ['agent', 'controller', 'orch', 'registry', 'redis', 's1', 's2', 's3'].forEach((n) => lightNode(n, 'off'));
    };

    const movePacket = (phaseData, done) => {
      const pathEl = e.pathEls[phaseData.path];
      if (!pathEl) { done && done(); return; }
      const len = pathEl.getTotalLength();
      let acc = 0, last = performance.now();

      const frame = (now) => {
        if (e.destroyed) return;
        const dt = now - last; last = now;
        if (!e.paused) acc += dt;
        const calcTime = Math.min(1, acc / phaseData.dur);
        const ez = easeInOut(calcTime);
        const frac = phaseData.mode === 'round' ? (1 - Math.abs(1 - 2 * ez)) : ez;
        const pt = pathEl.getPointAtLength(len * frac);
        setPacket(pt.x, pt.y);
        setHot(phaseData.path, frac, true);
        if (calcTime < 1) e.raf = requestAnimationFrame(frame);
        else done && done();
      };
      e.raf = requestAnimationFrame(frame);
    };

    const step = (i) => {
      if (e.destroyed) return;
      if (e.paused) { e.resume = () => step(i); return; }
      const n = PHASES.length;
      const idx = ((i % n) + n) % n;
      if (i > 0 && idx === 0) resetTrace();
      enterPhase(idx);
      movePacket(PHASES[idx], () => {
        if (e.destroyed) return;
        afterPhase(idx);
        e.timeout = setTimeout(() => step(i + 1), idx === n - 1 ? 1250 : 280);
      });
    };

    if (!reduced) {
      e.timeout = setTimeout(() => step(0), 650);
    } else {
      setIsActive(true);
      WIRES.forEach((w) => {
        if (e.flowEls[w.id]) e.flowEls[w.id].style.opacity = '.32';
        if (e.hotEls[w.id]) { e.hotEls[w.id].style.opacity = '.4'; e.hotEls[w.id].style.strokeDashoffset = '0'; }
      });
      ['controller', 'orch', 'registry', 'redis', 's2'].forEach((n) => lightNode(n, 'visited'));
      setCurPhase(5);
    }

    return () => {
      e.destroyed = true;
      if (ro) ro.disconnect();
      window.removeEventListener('resize', scaleStage);
      clearTimeout(e.timeout);
      cancelAnimationFrame(e.raf);
    };
  }, [reduced]);

  return (
    <div className={`mcp-comp ${className}`} ref={wrapRef}>
      <div ref={stageRef} style={{ position: 'absolute', left: 0, top: 0, width: '1400px', height: '600px', transformOrigin: 'top left' }}>
        
        {/* AMBIENT BACKGROUND */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: '-40px', backgroundImage: 'linear-gradient(rgba(241,238,232,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(241,238,232,.035) 1px,transparent 1px)', backgroundSize: '48px 48px', WebkitMaskImage: 'radial-gradient(ellipse 78% 72% at 50% 48%,#000 12%,transparent 82%)', maskImage: 'radial-gradient(ellipse 78% 72% at 50% 48%,#000 12%,transparent 82%)', animation: 'mcp_gdrift 30s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', left: '380px', top: '90px', width: '560px', height: '440px', background: 'radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--ac) 7%, transparent), transparent 68%)', pointerEvents: 'none' }}></div>
        </div>

        {/* CROSSHAIRS */}
        {[{ left: '18px', top: '18px' }, { right: '18px', top: '18px' }, { left: '18px', bottom: '18px' }, { right: '18px', bottom: '18px' }].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, width: '14px', height: '14px', zIndex: 5, opacity: 0.6 }}>
            <div style={{ position: 'absolute', top: '6.5px', left: 0, width: '14px', height: '1px', background: '#57544d' }}></div>
            <div style={{ position: 'absolute', left: '6.5px', top: 0, width: '1px', height: '14px', background: '#57544d' }}></div>
          </div>
        ))}

        {/* HEADER */}
        <div style={{ position: 'absolute', left: '30px', top: '26px', zIndex: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '7px', height: '7px', border: '1px solid var(--ac)', transform: 'rotate(45deg)', display: 'inline-block' }}></span>
            <span style={{ fontSize: '10px', letterSpacing: '.16em', color: '#8a8780' }}>{t['t.fig']}</span>
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '21px', letterSpacing: '-.025em', color: '#f1eee8', marginTop: '11px' }}>{t['t.title']}</div>
        </div>
        <div style={{ position: 'absolute', right: '30px', top: '26px', zIndex: 6, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '9px' }}>
          <span style={{ fontSize: '9.5px', letterSpacing: '.14em', color: '#46443e' }}>{t['t.proto']}</span>
        </div>

        {/* PLANE LABELS */}
        <div style={{ position: 'absolute', left: '96px', top: '96px', zIndex: 4, fontSize: '10px', letterSpacing: '.18em' }}><span style={{ color: '#46443e' }}>01</span> &nbsp;<span style={{ color: '#57544d' }}>{t['pl.client']}</span></div>
        <div style={{ position: 'absolute', left: '423px', top: '96px', zIndex: 4, fontSize: '10px', letterSpacing: '.18em' }}><span style={{ color: '#46443e' }}>02</span> &nbsp;<span style={{ color: '#57544d' }}>{t['pl.control']}</span></div>
        <div style={{ position: 'absolute', left: '1030px', top: '96px', zIndex: 4, fontSize: '10px', letterSpacing: '.18em' }}><span style={{ color: '#46443e' }}>03</span> &nbsp;<span style={{ color: '#57544d' }}>{t['pl.service']}</span></div>

        {/* BOUNDARIES */}
        <div style={{ position: 'absolute', left: '405px', top: '120px', width: '512px', height: '372px', zIndex: 1, border: '1px solid rgba(241,238,232,.1)', borderRadius: '9px', background: 'rgba(255,255,255,.012)' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 13px', background: '#0d0d0c', border: '1px solid rgba(241,238,232,.13)', borderRadius: '20px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ac)', boxShadow: '0 0 8px var(--ac)' }}></span>
            <span style={{ fontSize: '10px', letterSpacing: '.16em', color: '#cdcabf' }}>{t['srv.name']}</span>
            <span style={{ width: '1px', height: '11px', background: 'rgba(255,255,255,.13)' }}></span>
            <span style={{ fontSize: '9px', letterSpacing: '.06em', color: '#57544d' }}>NestJS · TypeScript</span>
          </div>
          <div style={{ position: 'absolute', right: '15px', bottom: '11px', fontSize: '9px', letterSpacing: '.05em', color: '#403e38' }}>{t['srv.sub']}</div>
        </div>
        <div style={{ position: 'absolute', left: '1005px', top: '120px', width: '352px', height: '372px', zIndex: 1, border: '1px solid rgba(241,238,232,.1)', borderRadius: '9px', background: 'rgba(255,255,255,.012)' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 13px', background: '#0d0d0c', border: '1px solid rgba(241,238,232,.13)', borderRadius: '20px' }}>
            <span style={{ width: '6px', height: '6px', border: '1px solid #6a675f', display: 'inline-block' }}></span>
            <span style={{ fontSize: '10px', letterSpacing: '.16em', color: '#cdcabf' }}>{t['q.name']}</span>
            <span style={{ width: '1px', height: '11px', background: 'rgba(255,255,255,.13)' }}></span>
            <span style={{ fontSize: '9px', letterSpacing: '.06em', color: '#57544d' }}>Docker · Kubernetes</span>
          </div>
          <div style={{ position: 'absolute', right: '15px', bottom: '11px', fontSize: '9px', letterSpacing: '.05em', color: '#403e38' }}>{t['q.sub']}</div>
        </div>

        {/* ================= SVG WIRES ================= */}
        <svg viewBox="0 0 1400 600" width="1400" height="600" style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, overflow: 'visible', pointerEvents: 'none' }}>
          
          {/* Base Wires */}
          {WIRES.map((w) => (
            <path key={`base-${w.id}`} d={w.d} fill="none" stroke="rgba(241,238,232,.13)" strokeWidth="1" />
          ))}

          {/* Flow Wires */}
          {WIRES.map((w) => w.anim ? (
            <path 
              key={`flow-${w.id}`} 
              d={w.d} 
              fill="none" 
              stroke="var(--ac)" 
              strokeWidth="1.3" 
              strokeDasharray="1.5 13" 
              strokeLinecap="round" 
              opacity="0.16" 
              className={!reduced ? 'mcp-anim-march' : ''}
              ref={(el) => { if (el) engine.current.flowEls[w.id] = el; }} 
            />
          ) : null)}

          {/* Hot Wires */}
          {WIRES.map((w) => w.anim ? (
            <path 
              key={`hot-${w.id}`} 
              d={w.d} 
              fill="none" 
              stroke="var(--ac)" 
              strokeWidth="1.8" 
              strokeLinecap="round" 
              opacity="0" 
              style={{ filter: 'drop-shadow(0 0 4px var(--ac))', transition: 'opacity .45s ease' }}
              ref={(el) => { if (el) engine.current.hotEls[w.id] = el; }} 
            />
          ) : null)}

          {/* Invisible Calculation Wires */}
          {WIRES.map((w) => (
            <path 
              key={`path-${w.id}`} 
              d={w.d} 
              fill="none" 
              stroke="none" 
              ref={(el) => { if (el) engine.current.pathEls[w.id] = el; }} 
            />
          ))}

          {/* Packet Dot */}
          <g ref={packetGroupRef} style={{ opacity: 0, transition: 'opacity .25s ease' }}>
            <circle ref={pkGlowRef} r="11" fill="var(--ac)" opacity="0.22"></circle>
            <circle ref={pkDotRef} r="3.6" fill="var(--ac)"></circle>
            <circle ref={pkRingRef} r="6" fill="none" stroke="var(--ac)" strokeWidth="1" opacity="0.5"></circle>
          </g>
        </svg>

        {/* NODES */}
        <div data-node="agent" style={{ position: 'absolute', left: '95px', top: '251px', width: '152px', height: '118px', zIndex: 3, border: '1px solid rgba(241,238,232,.15)', borderRadius: '6px', background: 'linear-gradient(180deg,rgba(255,255,255,.032),rgba(255,255,255,.006)), #0c0c0b', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ width: '11px', height: '11px', border: '1px solid var(--ac)', transform: 'rotate(45deg)', display: 'inline-block' }}></span>
            <span style={{ fontSize: '9.5px', letterSpacing: '.08em', color: '#8a8780' }}>{t['ag.type']}</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '20px', letterSpacing: '-.02em', color: '#f1eee8' }}>{t['ag.name']}</div>
            <div style={{ fontSize: '9.5px', letterSpacing: '.03em', color: '#6a675f', marginTop: '6px' }}>{t['ag.sub']}</div>
          </div>
        </div>

        <div data-node="controller" style={{ position: 'absolute', left: '455px', top: '150px', width: '412px', height: '60px', zIndex: 3, border: '1px solid rgba(241,238,232,.14)', borderRadius: '5px', background: 'linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.006))', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
            <span style={{ width: '8px', height: '8px', border: '1px solid #6a675f', display: 'inline-block' }}></span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '16px', letterSpacing: '-.01em', color: '#f1eee8' }}>{t['ct.name']}</div>
              <div style={{ fontSize: '9px', letterSpacing: '.05em', color: '#6a675f', marginTop: '3px' }}>{t['ct.sub']}</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', letterSpacing: '.03em', color: 'var(--ac)', opacity: .82 }}>POST /mcp/request</span>
        </div>

        <div data-node="orch" style={{ position: 'absolute', left: '545px', top: '258px', width: '232px', height: '104px', zIndex: 3, border: '1px solid rgba(241,238,232,.22)', borderRadius: '7px', background: 'linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.012))', padding: '14px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '8.5px', letterSpacing: '.16em', color: '#8a8780' }}>{t['or.tag']}</span>
            <span style={{ display: 'flex', gap: '3px' }}><i style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--ac)', display: 'block' }}></i><i style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#46443e', display: 'block' }}></i><i style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#46443e', display: 'block' }}></i></span>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '18px', lineHeight: 1.08, letterSpacing: '-.02em', color: '#ffffff' }}>{t['or.name']}</div>
            <div style={{ fontSize: '9px', letterSpacing: '.03em', color: '#6a675f', marginTop: '5px' }}>{t['or.sub']}</div>
          </div>
        </div>

        <div data-node="registry" style={{ position: 'absolute', left: '430px', top: '400px', width: '172px', height: '66px', zIndex: 3, border: '1px solid rgba(241,238,232,.14)', borderRadius: '5px', background: 'linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.006))', padding: '0 15px', display: 'flex', alignItems: 'center', gap: '13px', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2.5px' }}><i style={{ width: '14px', height: '1.5px', background: '#6a675f', display: 'block' }}></i><i style={{ width: '14px', height: '1.5px', background: '#6a675f', display: 'block' }}></i><i style={{ width: '9px', height: '1.5px', background: '#46443e', display: 'block' }}></i></span>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '15px', letterSpacing: '-.01em', color: '#f1eee8' }}>{t['rg.name']}</div>
            <div style={{ fontSize: '9px', letterSpacing: '.04em', color: '#6a675f', marginTop: '3px' }}>{t['rg.sub']}</div>
          </div>
        </div>

        <div data-node="redis" style={{ position: 'absolute', left: '715px', top: '400px', width: '162px', height: '66px', zIndex: 3, border: '1px solid rgba(241,238,232,.14)', borderRadius: '5px', background: 'linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.006))', padding: '0 15px', display: 'flex', alignItems: 'center', gap: '13px', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <span style={{ position: 'relative', width: '15px', height: '15px', display: 'inline-block', flexShrink: 0 }}><i style={{ position: 'absolute', left: 0, top: 0, width: '11px', height: '11px', border: '1px solid #6a675f' }}></i><i style={{ position: 'absolute', left: '4px', top: '4px', width: '11px', height: '11px', border: '1px solid #46443e' }}></i></span>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '15px', letterSpacing: '-.01em', color: '#f1eee8' }}>{t['rd.name']}</div>
            <div style={{ fontSize: '9px', letterSpacing: '.04em', color: '#6a675f', marginTop: '3px' }}>{t['rd.sub']}</div>
          </div>
        </div>

        <div data-node="s1" style={{ position: 'absolute', left: '1030px', top: '172px', width: '300px', height: '64px', zIndex: 3, border: '1px solid rgba(241,238,232,.13)', borderRadius: '5px', background: 'linear-gradient(180deg,rgba(255,255,255,.028),rgba(255,255,255,.005))', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '15px', letterSpacing: '-.01em', color: '#f1eee8' }}>{t['s1.name']}</div>
            <div style={{ fontSize: '9px', letterSpacing: '.05em', color: '#6a675f', marginTop: '3px' }}>{t['s1.type']}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '8.5px', letterSpacing: '.08em', color: '#57544d', border: '1px solid rgba(255,255,255,.13)', borderRadius: '10px', padding: '2px 8px' }}>REST</span>
            <span style={{ width: '12px', height: '12px', border: '1px solid #46443e', borderRadius: '2px', display: 'inline-block' }}></span>
          </div>
        </div>

        <div data-node="s2" style={{ position: 'absolute', left: '1030px', top: '270px', width: '300px', height: '64px', zIndex: 3, border: '1px solid rgba(241,238,232,.13)', borderRadius: '5px', background: 'linear-gradient(180deg,rgba(255,255,255,.028),rgba(255,255,255,.005))', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '15px', letterSpacing: '-.01em', color: '#f1eee8' }}>{t['s2.name']}</div>
            <div style={{ fontSize: '9px', letterSpacing: '.05em', color: '#6a675f', marginTop: '3px' }}>{t['s2.type']}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '8.5px', letterSpacing: '.08em', color: '#57544d', border: '1px solid rgba(255,255,255,.13)', borderRadius: '10px', padding: '2px 8px' }}>REST</span>
            <span style={{ width: '12px', height: '12px', border: '1px solid #46443e', borderRadius: '2px', display: 'inline-block' }}></span>
          </div>
        </div>

        <div data-node="s3" style={{ position: 'absolute', left: '1030px', top: '368px', width: '300px', height: '64px', zIndex: 3, border: '1px solid rgba(241,238,232,.13)', borderRadius: '5px', background: 'linear-gradient(180deg,rgba(255,255,255,.028),rgba(255,255,255,.005))', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color .4s ease, box-shadow .4s ease' }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '15px', letterSpacing: '-.01em', color: '#f1eee8' }}>{t['s3.name']}</div>
            <div style={{ fontSize: '9px', letterSpacing: '.05em', color: '#6a675f', marginTop: '3px' }}>{t['s3.type']}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '8.5px', letterSpacing: '.08em', color: '#57544d', border: '1px solid rgba(255,255,255,.13)', borderRadius: '10px', padding: '2px 8px' }}>REST</span>
            <span style={{ width: '12px', height: '12px', border: '1px solid #46443e', borderRadius: '2px', display: 'inline-block' }}></span>
          </div>
        </div>

        {/* CONNECTOR LABELS */}
        <div style={{ position: 'absolute', left: '300px', top: '228px', zIndex: 4, fontSize: '9px', letterSpacing: '.05em', color: '#7c786f', background: '#0b0b0a', padding: '1px 6px' }}>{t['w.c1']}</div>
        <div style={{ position: 'absolute', left: '672px', top: '226px', zIndex: 4, fontSize: '9px', letterSpacing: '.05em', color: '#6a675f', background: '#0b0b0a', padding: '1px 6px' }}>{t['w.c2']}</div>
        <div style={{ position: 'absolute', left: '440px', top: '374px', zIndex: 4, fontSize: '9px', letterSpacing: '.05em', color: '#6a675f', background: '#0b0b0a', padding: '1px 6px' }}>{t['w.c3']}</div>
        <div style={{ position: 'absolute', left: '806px', top: '374px', zIndex: 4, fontSize: '9px', letterSpacing: '.05em', color: '#6a675f', background: '#0b0b0a', padding: '1px 6px' }}>{t['w.c4']}</div>
        <div style={{ position: 'absolute', left: '885px', top: '276px', zIndex: 4, fontSize: '9px', letterSpacing: '.05em', color: '#7c786f', background: '#0b0b0a', padding: '1px 6px' }}>{t['w.c5']}</div>
        <div style={{ position: 'absolute', left: '556px', top: '516px', zIndex: 4, fontSize: '9px', letterSpacing: '.05em', color: '#7c786f', background: '#0b0b0a', padding: '1px 6px' }}>{t['w.c6']}</div>

        {/* STATUS BAR */}
        <div style={{ position: 'absolute', left: 0, top: '556px', width: '1400px', height: '42px', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--ac)', boxShadow: '0 0 8px var(--ac)', animation: 'mcp_liveDot 2s ease-in-out infinite' }}></span>
            <span style={{ fontSize: '9px', letterSpacing: '.18em', color: '#57544d' }}>{t['lg.seq']}</span>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '7px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '.08em', color: '#46443e' }}>PHASE</span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '15px', color: 'var(--ac)' }}>0{curPhase + 1}</span>
              <span style={{ fontSize: '9px', color: '#46443e' }}>/06</span>
            </span>
            <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,.1)' }}></span>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '.02em', color: '#e8e4dc' }}>
              {ph && ph[curPhase] ? ph[curPhase][0] : ''}
            </span>
            <span style={{ fontSize: '9.5px', letterSpacing: '.03em', color: '#6a675f' }}>
              {ph && ph[curPhase] ? ph[curPhase][1] : ''}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <span key={k} style={{ width: '20px', height: '2px', background: (k <= curPhase && isActive) ? 'var(--ac)' : 'rgba(255,255,255,.1)', display: 'block', transition: 'background .3s ease' }}></span>
              ))}
            </div>
            <button onClick={() => setIsPaused(!isPaused)} aria-label="Toggle Animation" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '.08em', color: '#7c786f', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px', minWidth: '42px', textAlign: 'right' }}>
              {isPaused ? t['play'] : t['pause']}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}