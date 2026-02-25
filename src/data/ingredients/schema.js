/**
 * src/data/ingredients/schema.js
 * Master validation schema and helper functions for Dew Theory Ingredients.
 */

export const VALID_CATEGORIES = [
    'Antioxidant', 'Humectant', 'Exfoliant', 'Emollient', 
    'Occlusive', 'Peptide', 'Botanical', 'Synthetic Active'
];

export function validateIngredient(ing) {
    const errors = [];
    
    if (!ing.id || !/^ing_\d+$/.test(ing.id)) errors.push(`Invalid ID format: ${ing.id}`);
    if (!ing.name) errors.push('Missing name');
    if (!ing.inciName) errors.push('Missing INCI name');
    if (!VALID_CATEGORIES.includes(ing.category)) errors.push(`Invalid category: ${ing.category}`);
    if (ing.barrierImpactScore < -5 || ing.barrierImpactScore > 5) errors.push('barrierImpactScore out of bounds (-5 to 5)');
    // Add more validation as needed...

    return {
        isValid: errors.length === 0,
        errors
    };
}
