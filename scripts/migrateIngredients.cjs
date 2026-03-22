const fs = require('fs');
const path = require('path');

// Read current data
const oldIngredientsPath = path.join(__dirname, '../src/data/ingredients.json');
const oldSchemaPath = path.join(__dirname, '../src/engine/ingredientSchema.js');
const coreDir = path.join(__dirname, '../src/data/ingredients/core');
const conflictsPath = path.join(__dirname, '../src/data/conflicts.js');
const indexPath = path.join(__dirname, '../src/data/ingredients/index.js');
const newSchemaPath = path.join(__dirname, '../src/data/ingredients/schema.js');

if (!fs.existsSync(coreDir)) {
    fs.mkdirSync(coreDir, { recursive: true });
}

// 1. Extract OVERLAY_MAP from ingredientSchema.js
const schemaData = fs.readFileSync(oldSchemaPath, 'utf8');
const overlayMatch = schemaData.match(/const OVERLAY_MAP = (\{[\s\S]*?\n\});\n\n\/\* ─── Category/);

let OVERLAY_MAP = {};
if (overlayMatch && overlayMatch[1]) {
    try {
        // Evaluate the object string to get the JS object
        // Use Function instead of eval for slightly better safety (though still restricted context)
        OVERLAY_MAP = new Function('return ' + overlayMatch[1])();
    } catch (e) {
        console.error("Error parsing OVERLAY_MAP", e);
    }
}

const CATEGORY_DEFAULTS = {
    Exfoliant: { irritationLevel: 3, strengthLevel: 'medium', barrierImpactScore: -1, frequencyLimit: '3x_week', timeOfDay: 'PM' },
    'Synthetic Active': { irritationLevel: 3, strengthLevel: 'high', barrierImpactScore: -1, frequencyLimit: '2x_week', timeOfDay: 'PM' },
    Antioxidant: { irritationLevel: 1, strengthLevel: 'low', barrierImpactScore: 1, frequencyLimit: 'daily', timeOfDay: 'AM' },
    Humectant: { irritationLevel: 1, strengthLevel: 'low', barrierImpactScore: 2, frequencyLimit: 'daily', timeOfDay: 'both' },
    Emollient: { irritationLevel: 1, strengthLevel: 'low', barrierImpactScore: 2, frequencyLimit: 'daily', timeOfDay: 'both' },
    Occlusive: { irritationLevel: 1, strengthLevel: 'low', barrierImpactScore: 2, frequencyLimit: 'daily', timeOfDay: 'PM' },
    Botanical: { irritationLevel: 1, strengthLevel: 'low', barrierImpactScore: 1, frequencyLimit: 'daily', timeOfDay: 'both' },
    Peptide: { irritationLevel: 1, strengthLevel: 'medium', barrierImpactScore: 2, frequencyLimit: 'daily', timeOfDay: 'both' },
};

const BASE_DEFAULTS = {
    irritationLevel: 1,
    strengthLevel: 'low',
    barrierImpactScore: 0,
    goalTags: [],
    layeringConflicts: [],
    redundancyTags: [],
    frequencyLimit: 'daily',
    timeOfDay: 'both',
    rationale: '',
};

// 2. Read ingredients.json
const rawIngredients = JSON.parse(fs.readFileSync(oldIngredientsPath, 'utf8'));

// 3. Migrate each ingredient
const validCategories = [
    'Antioxidant', 'Humectant', 'Exfoliant', 'Emollient', 'Occlusive', 'Peptide', 'Botanical', 'Synthetic Active'
];

let allIds = [];

rawIngredients.forEach((ing) => {
    const overlay = OVERLAY_MAP[ing.id] || {};
    const categoryDefaults = CATEGORY_DEFAULTS[ing.category] || {};

    // Derived goal tags
    const derivedGoalTags = (ing.concerns || []).map(c => c.toLowerCase().replace(/\s+/g, '-'));

    // Check if category is valid, if not, try to map it or default to Botanical
    let cat = ing.category;
    if (!validCategories.includes(cat)) {
        console.warn(`Invalid category '${cat}' for ${ing.id}. Defaulting to Botanical.`);
        cat = 'Botanical';
    }

    const newSchema = {
        id: ing.id,
        name: ing.name,
        inciName: ing.inciName,
        category: cat,
        origin: ing.origin || 'Synthetic',
        countryOfOrigin: ing.countryOfOrigin || null,
        description: ing.description || "",
        benefits: ing.benefits || [],
        skinTypes: ing.skinTypes || [],
        concerns: ing.concerns || [],
        image: ing.image || "",

        // Clinical Overlay Fields for Scoring Engine
        irritationLevel: overlay.irritationLevel ?? categoryDefaults.irritationLevel ?? BASE_DEFAULTS.irritationLevel,
        comedogenicRating: ing.comedogenicRating ?? 0,
        fungalAcneSafe: ing.fungalAcneSafe ?? true,
        pregnancySafe: ing.safeForPregnancy ?? true,
        strengthLevel: overlay.strengthLevel ?? categoryDefaults.strengthLevel ?? BASE_DEFAULTS.strengthLevel,
        barrierImpactScore: overlay.barrierImpactScore ?? categoryDefaults.barrierImpactScore ?? BASE_DEFAULTS.barrierImpactScore,
        pH_range: overlay.pH_range || "N/A",
        photosensitivityRisk: overlay.photosensitivityRisk || false,

        // Logic Engine Rules
        goalTags: Array.from(new Set([...(overlay.goalTags || []), ...derivedGoalTags])),
        layeringConflicts: overlay.layeringConflicts || BASE_DEFAULTS.layeringConflicts,
        redundancyTags: overlay.redundancyTags || BASE_DEFAULTS.redundancyTags,
        frequencyLimit: overlay.frequencyLimit ?? categoryDefaults.frequencyLimit ?? BASE_DEFAULTS.frequencyLimit,
        timeOfDay: overlay.timeOfDay ?? categoryDefaults.timeOfDay ?? BASE_DEFAULTS.timeOfDay,
        climateSuitability: overlay.climateSuitability || ["dry", "temperate", "humid", "tropical"],

        // Clinical Information
        scientificSummary: overlay.rationale || ing.howItWorks || "",
        mechanismOfAction: ing.howItWorks || "",
        evidenceLevel: overlay.evidenceLevel || "strong",

        // SEO Metadata
        seo: {
            title: `${ing.name} - Clinical Profile & Compatibility | Dew Theory`,
            description: `Discover the scientific benefits, compatibility, and clinical profile of ${ing.name} in skincare.`
        }
    };

    allIds.push(ing.id);

    // Save to core directory
    fs.writeFileSync(
        path.join(coreDir, `${ing.id}.json`),
        JSON.stringify(newSchema, null, 2),
        'utf8'
    );
});

console.log(`Migrated ${rawIngredients.length} ingredients to ${coreDir}`);

// 4. Create the schema.js file validator
const schemaJsContent = `
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
    
    if (!ing.id || !/^ing_\\d+$/.test(ing.id)) errors.push(\`Invalid ID format: \${ing.id}\`);
    if (!ing.name) errors.push('Missing name');
    if (!ing.inciName) errors.push('Missing INCI name');
    if (!VALID_CATEGORIES.includes(ing.category)) errors.push(\`Invalid category: \${ing.category}\`);
    if (ing.barrierImpactScore < -5 || ing.barrierImpactScore > 5) errors.push('barrierImpactScore out of bounds (-5 to 5)');
    // Add more validation as needed...

    return {
        isValid: errors.length === 0,
        errors
    };
}
`;

fs.writeFileSync(newSchemaPath, schemaJsContent.trim() + '\n', 'utf8');

// 5. Create index.js bundler
const indexJsContent = `
/**
 * src/data/ingredients/index.js
 * Automatically imports and exports all ingredient JSONs.
 */

// Core imports
${allIds.map(id => `import ${id} from './core/${id}.json';`).join('\n')}

// The master list of all ingredients
export const allIngredients = [
    ${allIds.join(',\n    ')}
];

// Helper map for O(1) lookups
export const ingredientMap = allIngredients.reduce((map, ing) => {
    map[ing.id] = ing;
    return map;
}, {});
`;

fs.writeFileSync(indexPath, indexJsContent.trim() + '\n', 'utf8');

console.log('Migration complete. Created core json files, schema.js, and index.js');
