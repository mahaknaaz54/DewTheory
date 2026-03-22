import React from 'react';
import serumImg from '../assets/bottles/serum.png';
import jarImg from '../assets/bottles/jar.png';
import tubeImg from '../assets/bottles/tube.png';

// Map ingredient categories to bottle types
const getBottleImage = (category) => {
    const cat = (category || '').toLowerCase();
    if (['exfoliant', 'synthetic active', 'antioxidant'].includes(cat)) return serumImg;
    if (['emollient', 'occlusive'].includes(cat)) return jarImg;
    // Humectant, Peptide, Botanical, and everything else → tube
    return tubeImg;
};

// Each bottle type has different label positioning
const getLabelPosition = (category) => {
    const cat = (category || '').toLowerCase();
    if (['exfoliant', 'synthetic active', 'antioxidant'].includes(cat)) {
        // Amber serum bottle — label sits on the white label area (lower body)
        return { top: '55%', left: '50%', maxWidth: '42%' };
    }
    if (['emollient', 'occlusive'].includes(cat)) {
        // Cream jar — label on the front face
        return { top: '48%', left: '50%', maxWidth: '55%' };
    }
    // Tube — label in upper-center area of the tube body
    return { top: '42%', left: '50%', maxWidth: '44%' };
};

const IngredientMockup = ({ ingredient, className = "" }) => {
    const bottleImage = getBottleImage(ingredient.category);
    const labelPos = getLabelPosition(ingredient.category);

    return (
        <div className={`relative w-full h-full ${className} group overflow-hidden`}
            style={{ backgroundColor: '#F0E6D6' }}>

            {/* Product Photo */}
            <img
                src={bottleImage}
                alt={ingredient.name}
                className="w-full h-full object-contain transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                style={{ padding: '8%' }}
            />

            {/* Printed-on Label — uses multiply blend mode to look like it's on the bottle */}
            <div
                className="absolute flex flex-col items-center justify-center text-center pointer-events-none"
                style={{
                    top: labelPos.top,
                    left: labelPos.left,
                    transform: 'translate(-50%, -50%)',
                    maxWidth: labelPos.maxWidth,
                    width: '100%',
                    mixBlendMode: 'multiply',
                }}
            >
                {/* Brand Name */}
                <p className="font-playfair font-bold text-[7px] md:text-[9px] lg:text-[11px] tracking-[0.25em] uppercase mb-1"
                    style={{ color: '#3d3028' }}>
                    Dew Theory
                </p>

                {/* Divider line */}
                <div className="w-6 md:w-8 h-[0.5px] mb-1.5 md:mb-2" style={{ backgroundColor: '#8a7e72' }}></div>

                {/* Ingredient Name */}
                <h4 className="font-playfair font-bold text-[10px] md:text-sm lg:text-lg leading-tight px-1"
                    style={{ color: '#2d2420' }}>
                    {ingredient.name}
                </h4>

                {/* Category */}
                <p className="font-mono text-[5px] md:text-[6px] lg:text-[8px] tracking-[0.2em] uppercase mt-1 md:mt-1.5"
                    style={{ color: '#8a7e72' }}>
                    {ingredient.category}
                </p>
            </div>

            {/* Subtle vignette for premium feel */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 60px rgba(0,0,0,0.04)',
                }}>
            </div>
        </div>
    );
};

export default IngredientMockup;
