import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const SerumDripOverlay = forwardRef((props, ref) => {
    const overlayRef = useRef(null);
    const [size, setSize] = useState({ w: 1000, h: 1000 });

    useEffect(() => {
        const updateSize = () => {
            setSize({ w: window.innerWidth, h: window.innerHeight });
        };
        // Initial setup
        updateSize();

        // Listen to window resizes for the absolute pixel mask
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useImperativeHandle(ref, () => ({
        playAnimation: () => {
            if (!overlayRef.current) return;

            // Re-set initial state just in case
            gsap.set(overlayRef.current, { scaleY: 0 });

            // Modern GSAP accepts custom cubic beziers directly in the ease string
            gsap.to(overlayRef.current, {
                scaleY: 1,
                duration: 1.4,
                ease: "cubic-bezier(0.33, 1, 0.68, 1)"
            });
        },
        reset: () => {
            if (overlayRef.current) gsap.set(overlayRef.current, { scaleY: 0 });
        }
    }));

    // Generate an organic, heavily-rounded 4-drip top edge mask
    // Max depth is ~35px to stay within the 40px variation depth requested.
    const generateDripPath = (w, h) => {
        const points = [
            { x: 0, y: 0 },
            { x: w * 0.15, y: 18 },  // Drip 1
            { x: w * 0.28, y: 4 },   // Valley 1
            { x: w * 0.44, y: 35 },  // Drip 2 (deepest)
            { x: w * 0.58, y: 6 },   // Valley 2
            { x: w * 0.74, y: 26 },  // Drip 3
            { x: w * 0.88, y: 5 },   // Valley 3
            { x: w * 0.96, y: 14 },  // Drip 4
            { x: w, y: 0 }
        ];

        let d = `M ${points[0].x},${points[0].y} `;

        // Connect points with perfectly smooth horizontal-tangent cubic bezier curves
        for (let i = 1; i < points.length; i++) {
            const p0 = points[i - 1];
            const p1 = points[i];
            const dx = (p1.x - p0.x) * 0.4;
            const cx0 = p0.x + dx;
            const cx1 = p1.x - dx;

            d += `C ${cx0},${p0.y} ${cx1},${p1.y} ${p1.x},${p1.y} `;
        }

        // Draw straight lines around the bottom of the bounding box to keep the liquid full-height
        d += `L ${w},${h} L 0,${h} Z`;
        return d;
    };

    return (
        <div
            ref={overlayRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 99998,
                background: 'linear-gradient(to bottom, #F6D365 0%, #F4C430 50%, #D9A91A 100%)',
                boxShadow: 'inset 0 10px 15px -3px rgba(0, 0, 0, 0.15)',
                transform: 'scaleY(0)',
                transformOrigin: 'top center',
                willChange: 'transform',
                clipPath: 'url(#serum-drip-path)',
            }}
        >
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <clipPath id="serum-drip-path" clipPathUnits="userSpaceOnUse">
                        <path d={generateDripPath(size.w, size.h)} />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
});

SerumDripOverlay.displayName = 'SerumDripOverlay';

export default SerumDripOverlay;
