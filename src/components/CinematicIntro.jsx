import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import './CinematicIntro.css';

/* =============================================
   Constants
   ============================================= */
const NODE_COUNT = 12;
const SHIMMER_POOL = 60;
const GRID_COLS = 4;
const GRID_ROWS = 3;

const PHASE_DURATION = {
    atmospheric: 1200,   // 0 – 1.2s
    formation: 1600,     // 1.2 – 2.8s
    dissolve: 1200,      // 2.8 – 4.0s
    hold: 600,           // logo hold
};

const COLORS = {
    bg1: '#0F0F11',
    bg2: '#1C1C1F',
    node: 'rgba(255,255,255,0.85)',
    nodeGlow: 'rgba(255,255,255,0.25)',
    line: 'rgba(255,255,255,0.12)',
    shimmer: 'rgba(255,255,255,0.6)',
};

/* =============================================
   Utility helpers
   ============================================= */
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const rand = (min, max) => Math.random() * (max - min) + min;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/* =============================================
   Generate initial node positions
   ============================================= */
function createNodes(w, h) {
    const nodes = [];
    const cx = w / 2;
    const cy = h / 2;
    const spread = Math.min(w, h) * 0.35;

    for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * Math.PI * 2 + rand(-0.4, 0.4);
        const r = rand(spread * 0.25, spread);
        nodes.push({
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
            originX: cx + Math.cos(angle) * r,
            originY: cy + Math.sin(angle) * r,
            targetX: 0,
            targetY: 0,
            radius: rand(2, 5),
            phase: rand(0, Math.PI * 2),
            speed: rand(0.0004, 0.001),
            amplitude: rand(8, 20),
            depth: rand(0.5, 1),        // 0.5 = far, 1 = near
            opacity: 1,
            connected: false,
            dissolved: false,
            // micro particles after dissolve
            particles: [],
        });
    }
    return nodes;
}

/* =============================================
   Generate grid anchor targets
   ============================================= */
function computeGridTargets(nodes, w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const spacingX = Math.min(w, h) * 0.1;
    const spacingY = spacingX * 0.9;
    const offsetX = ((GRID_COLS - 1) * spacingX) / 2;
    const offsetY = ((GRID_ROWS - 1) * spacingY) / 2;

    const targets = [];
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            targets.push({
                x: cx - offsetX + c * spacingX,
                y: cy - offsetY + r * spacingY,
            });
        }
    }

    // Assign closest target to each node (greedy)
    const used = new Set();
    const sorted = [...nodes.map((_, i) => i)].sort((a, b) => {
        const da = dist(nodes[a], { x: w / 2, y: h / 2 });
        const db = dist(nodes[b], { x: w / 2, y: h / 2 });
        return da - db;
    });

    for (const ni of sorted) {
        let bestDist = Infinity;
        let bestIdx = 0;
        for (let ti = 0; ti < targets.length; ti++) {
            if (used.has(ti)) continue;
            const d = dist(nodes[ni], targets[ti]);
            if (d < bestDist) {
                bestDist = d;
                bestIdx = ti;
            }
        }
        used.add(bestIdx);
        nodes[ni].targetX = targets[bestIdx].x;
        nodes[ni].targetY = targets[bestIdx].y;
    }
}

/* =============================================
   Shimmer particle pool
   ============================================= */
function createShimmerPool() {
    return Array.from({ length: SHIMMER_POOL }, () => ({
        x: 0, y: 0,
        vx: 0, vy: 0,
        life: 0,
        maxLife: 0,
        radius: 0,
        active: false,
    }));
}

function spawnShimmer(pool, x, y) {
    for (const p of pool) {
        if (!p.active) {
            p.x = x;
            p.y = y;
            p.vx = rand(-0.5, 0.5);
            p.vy = rand(-0.5, 0.5);
            p.life = 0;
            p.maxLife = rand(300, 600);
            p.radius = rand(0.8, 1.8);
            p.active = true;
            return;
        }
    }
}

/* =============================================
   Component
   ============================================= */
export default function CinematicIntro({ onComplete }) {
    const canvasRef = useRef(null);
    const stateRef = useRef({
        nodes: [],
        shimmers: createShimmerPool(),
        phase: 'atmospheric',  // atmospheric | formation | dissolve | done
        phaseStart: 0,
        startTime: 0,
        blurAmount: 3,
        pulseOpacity: 0,
        pulseScale: 0,
        burstOpacity: 0,
        lineOpacity: 0,
        gridLineTargets: [],
    });
    const rafRef = useRef(null);
    const [brandVisible, setBrandVisible] = useState(false);
    const [overlayOpacity, setOverlayOpacity] = useState(1);
    const [finished, setFinished] = useState(false);

    const logoCtrl = useAnimationControls();
    const taglineCtrl = useAnimationControls();
    const overlayCtrl = useAnimationControls();
    const pulseCtrl = useAnimationControls();
    const burstCtrl = useAnimationControls();

    /* ----- Reduced motion check ----- */
    const prefersReducedMotion = useRef(
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    /* ----- Canvas setup ----- */
    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        return { ctx, w, h };
    }, []);

    /* ----- Draw background gradient ----- */
    const drawBg = useCallback((ctx, w, h) => {
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, COLORS.bg1);
        grad.addColorStop(1, COLORS.bg2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }, []);

    /* ----- Draw a single node ----- */
    const drawNode = useCallback((ctx, node) => {
        if (node.opacity <= 0) return;

        // Glow
        const glowR = node.radius * 3 * node.depth;
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        glow.addColorStop(0, `rgba(255,255,255,${0.18 * node.opacity * node.depth})`);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255,255,255,${0.85 * node.opacity * node.depth})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * node.depth, 0, Math.PI * 2);
        ctx.fill();
    }, []);

    /* ----- Draw connections ----- */
    const drawLines = useCallback((ctx, nodes, lineOpacity) => {
        if (lineOpacity <= 0) return;
        const maxDist = 160;
        ctx.strokeStyle = `rgba(255,255,255,${0.08 * lineOpacity})`;
        ctx.lineWidth = 0.6;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const d = dist(nodes[i], nodes[j]);
                if (d < maxDist) {
                    const alpha = (1 - d / maxDist) * lineOpacity * 0.15;
                    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }, []);

    /* ----- Draw grid lines (formation phase) ----- */
    const drawGridLines = useCallback((ctx, nodes, opacity) => {
        if (opacity <= 0) return;
        const maxDist = 120;
        ctx.lineWidth = 0.7;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const d = dist(nodes[i], nodes[j]);
                if (d < maxDist) {
                    ctx.strokeStyle = `rgba(255,255,255,${0.18 * opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }, []);

    /* ----- Draw shimmering particles ----- */
    const drawShimmers = useCallback((ctx, pool, dt) => {
        for (const p of pool) {
            if (!p.active) continue;
            p.life += dt;
            if (p.life >= p.maxLife) {
                p.active = false;
                continue;
            }
            p.x += p.vx;
            p.y += p.vy;
            const t = p.life / p.maxLife;
            const alpha = t < 0.3 ? t / 0.3 : 1 - (t - 0.3) / 0.7;
            ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }, []);

    /* ----- Draw dissolve micro-particles ----- */
    const drawDissolveParticles = useCallback((ctx, nodes) => {
        for (const node of nodes) {
            if (!node.dissolved) continue;
            for (const p of node.particles) {
                if (p.opacity <= 0) continue;
                ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }, []);

    /* ----- Main animation loop ----- */
    const animate = useCallback((setup) => {
        const { ctx, w, h } = setup;
        const state = stateRef.current;
        let lastTime = performance.now();
        state.startTime = lastTime;
        state.phaseStart = lastTime;

        const loop = (now) => {
            const dt = now - lastTime;
            lastTime = now;
            const elapsed = now - state.startTime;

            ctx.clearRect(0, 0, w, h);
            drawBg(ctx, w, h);

            const { nodes, shimmers } = state;

            /* ---- Phase transitions ---- */
            if (state.phase === 'atmospheric' && elapsed >= PHASE_DURATION.atmospheric) {
                state.phase = 'formation';
                state.phaseStart = now;
                computeGridTargets(nodes, w, h);
                // trigger pulse
                pulseCtrl.start({
                    width: ['0px', '30vmax'],
                    height: ['0px', '30vmax'],
                    opacity: [0, 0.08, 0],
                    transition: { duration: 1.2, ease: 'easeOut' },
                });
            }

            if (state.phase === 'formation' && elapsed >= PHASE_DURATION.atmospheric + PHASE_DURATION.formation) {
                state.phase = 'dissolve';
                state.phaseStart = now;

                // Dissolve: create micro-particles for each node
                const cx = w / 2;
                const cy = h / 2;
                for (const node of nodes) {
                    node.dissolved = true;
                    const count = Math.floor(rand(3, 6));
                    for (let k = 0; k < count; k++) {
                        const angle = rand(0, Math.PI * 2);
                        const speed = rand(0.3, 1.2);
                        // direction: towards center
                        const toCenter = Math.atan2(cy - node.y, cx - node.x);
                        node.particles.push({
                            x: node.x,
                            y: node.y,
                            vx: Math.cos(toCenter + rand(-0.5, 0.5)) * speed,
                            vy: Math.sin(toCenter + rand(-0.5, 0.5)) * speed,
                            radius: rand(0.5, 1.5),
                            opacity: 0.8,
                            decay: rand(0.001, 0.003),
                        });
                    }
                }

                // Trigger burst + brand
                burstCtrl.start({
                    opacity: [0, 0.12, 0],
                    transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
                });

                // Show brand text after a slight delay
                setTimeout(() => setBrandVisible(true), 400);
            }

            if (state.phase === 'dissolve') {
                const pElapsed = now - state.phaseStart;

                // Fade lines first (0–400ms of dissolve)
                state.lineOpacity = Math.max(0, 1 - pElapsed / 400);

                // Fade node opacity (200–800ms of dissolve)
                if (pElapsed > 200) {
                    const fadeT = Math.min(1, (pElapsed - 200) / 600);
                    for (const node of nodes) {
                        node.opacity = 1 - easeOutQuart(fadeT);
                    }
                }

                // Animate dissolve particles
                for (const node of nodes) {
                    for (const p of node.particles) {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.opacity -= p.decay * dt;
                        if (p.opacity < 0) p.opacity = 0;
                    }
                }

                // End dissolve phase
                if (pElapsed >= PHASE_DURATION.dissolve) {
                    state.phase = 'done';
                }
            }

            /* ---- ATMOSPHERIC PHASE: floating motion ---- */
            if (state.phase === 'atmospheric') {
                const focusT = Math.min(1, elapsed / 600);
                state.blurAmount = lerp(3, 0, easeOutQuart(focusT));

                // Organic floating with proximity lines
                for (const node of nodes) {
                    const t = now * node.speed;
                    node.x = node.originX + Math.sin(t + node.phase) * node.amplitude;
                    node.y = node.originY + Math.cos(t * 0.7 + node.phase) * node.amplitude * 0.6;
                }

                // Draw proximity lines
                drawLines(ctx, nodes, 1);

                // Draw nodes
                for (const node of nodes) {
                    drawNode(ctx, node);
                }
            }

            /* ---- FORMATION PHASE: converge to grid ---- */
            if (state.phase === 'formation') {
                const pElapsed = now - state.phaseStart;
                const t = Math.min(1, pElapsed / PHASE_DURATION.formation);
                const easedT = easeInOutCubic(t);

                for (const node of nodes) {
                    // Still float subtly during formation but reduce amplitude
                    const floatAmp = node.amplitude * (1 - easedT) * 0.5;
                    const ft = now * node.speed;
                    const floatX = Math.sin(ft + node.phase) * floatAmp;
                    const floatY = Math.cos(ft * 0.7 + node.phase) * floatAmp * 0.6;

                    node.x = lerp(node.originX + floatX, node.targetX, easedT);
                    node.y = lerp(node.originY + floatY, node.targetY, easedT);

                    // Depth converges to 1
                    node.depth = lerp(node.depth, 1, easedT * 0.8);

                    // Spawn shimmer when close to target
                    if (easedT > 0.7 && !node.connected) {
                        const d = dist(node, { x: node.targetX, y: node.targetY });
                        if (d < 5) {
                            node.connected = true;
                            spawnShimmer(shimmers, node.x, node.y);
                            spawnShimmer(shimmers, node.x, node.y);
                            spawnShimmer(shimmers, node.x, node.y);
                        }
                    }
                }

                // Grid lines grow in opacity
                state.lineOpacity = easeOutQuart(Math.min(1, t * 1.5));
                drawGridLines(ctx, nodes, state.lineOpacity);

                for (const node of nodes) {
                    drawNode(ctx, node);
                }

                drawShimmers(ctx, shimmers, dt);
            }

            /* ---- DISSOLVE PHASE: break apart ---- */
            if (state.phase === 'dissolve') {
                // Draw remaining grid lines
                drawGridLines(ctx, nodes, state.lineOpacity);

                // Draw fading nodes
                for (const node of nodes) {
                    drawNode(ctx, node);
                }

                // Draw dissolve particles
                drawDissolveParticles(ctx, nodes);
            }

            /* ---- Apply canvas blur (focus pull) ---- */
            if (canvasRef.current && state.blurAmount > 0.1) {
                canvasRef.current.style.filter = `blur(${state.blurAmount}px)`;
            } else if (canvasRef.current) {
                canvasRef.current.style.filter = 'none';
            }

            if (state.phase !== 'done') {
                rafRef.current = requestAnimationFrame(loop);
            }
        };

        rafRef.current = requestAnimationFrame(loop);
    }, [drawBg, drawNode, drawLines, drawGridLines, drawShimmers, drawDissolveParticles, pulseCtrl, burstCtrl]);

    /* ----- Brand reveal sequence ----- */
    useEffect(() => {
        if (!brandVisible) return;

        const sequence = async () => {
            // Logo: blur → sharp, opacity, translateY
            await logoCtrl.start({
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            });

            // Tagline slightly delayed
            await taglineCtrl.start({
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
            });

            // Hold
            await new Promise((resolve) => setTimeout(resolve, PHASE_DURATION.hold));

            // Crossfade out entire overlay
            await overlayCtrl.start({
                opacity: 0,
                transition: { duration: 0.5, ease: 'easeInOut' },
            });

            setFinished(true);
            onComplete?.();
        };

        sequence();
    }, [brandVisible, logoCtrl, taglineCtrl, overlayCtrl, onComplete]);

    /* ----- Init ----- */
    useEffect(() => {
        // Reduced motion → instant reveal
        if (prefersReducedMotion.current) {
            setBrandVisible(true);
            return undefined;
        }

        const setup = setupCanvas();
        if (!setup) return undefined;

        const { w, h } = setup;
        stateRef.current.nodes = createNodes(w, h);

        animate(setup);

        const handleResize = () => {
            const s = setupCanvas();
            if (s) {
                computeGridTargets(stateRef.current.nodes, s.w, s.h);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [setupCanvas, animate]);

    if (finished) return null;

    return (
        <motion.div
            className="cinematic-intro"
            animate={overlayCtrl}
            initial={{ opacity: 1 }}
        >
            {/* Canvas for particle rendering */}
            <canvas ref={canvasRef} className="cinematic-intro__canvas" />

            {/* Film grain */}
            <div className="cinematic-intro__grain" />

            {/* Center pulse (Scene 2) */}
            <motion.div
                className="cinematic-intro__pulse"
                animate={pulseCtrl}
                initial={{ width: 0, height: 0, opacity: 0 }}
            />

            {/* Soft light burst (Scene 3) */}
            <motion.div
                className="cinematic-intro__burst"
                animate={burstCtrl}
                initial={{ opacity: 0 }}
            />

            {/* Brand mark */}
            <div className="cinematic-intro__brand">
                <div className="cinematic-intro__brand-glow" />

                <motion.h1
                    className="cinematic-intro__logo"
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={logoCtrl}
                >
                    Dew Theory
                </motion.h1>

                <motion.p
                    className="cinematic-intro__tagline"
                    initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                    animate={taglineCtrl}
                >
                    Ingredient Intelligence
                </motion.p>
            </div>
        </motion.div>
    );
}
