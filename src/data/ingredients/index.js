/**
 * src/data/ingredients/index.js
 * Automatically imports and exports all ingredient JSONs.
 */

// Core imports
import ing_001 from './core/ing_001.json';
import ing_002 from './core/ing_002.json';
import ing_003 from './core/ing_003.json';
import ing_004 from './core/ing_004.json';
import ing_005 from './core/ing_005.json';
import ing_006 from './core/ing_006.json';
import ing_007 from './core/ing_007.json';
import ing_008 from './core/ing_008.json';
import ing_009 from './core/ing_009.json';
import ing_010 from './core/ing_010.json';
import ing_011 from './core/ing_011.json';
import ing_012 from './core/ing_012.json';
import ing_013 from './core/ing_013.json';
import ing_014 from './core/ing_014.json';
import ing_015 from './core/ing_015.json';
import ing_016 from './core/ing_016.json';
import ing_017 from './core/ing_017.json';
import ing_018 from './core/ing_018.json';
import ing_019 from './core/ing_019.json';
import ing_020 from './core/ing_020.json';
import ing_021 from './core/ing_021.json';
import ing_022 from './core/ing_022.json';
import ing_023 from './core/ing_023.json';
import ing_024 from './core/ing_024.json';
import ing_025 from './core/ing_025.json';
import ing_026 from './core/ing_026.json';
import ing_027 from './core/ing_027.json';
import ing_028 from './core/ing_028.json';
import ing_029 from './core/ing_029.json';
import ing_030 from './core/ing_030.json';

// The master list of all ingredients
export const allIngredients = [
    ing_001,
    ing_002,
    ing_003,
    ing_004,
    ing_005,
    ing_006,
    ing_007,
    ing_008,
    ing_009,
    ing_010,
    ing_011,
    ing_012,
    ing_013,
    ing_014,
    ing_015,
    ing_016,
    ing_017,
    ing_018,
    ing_019,
    ing_020,
    ing_021,
    ing_022,
    ing_023,
    ing_024,
    ing_025,
    ing_026,
    ing_027,
    ing_028,
    ing_029,
    ing_030
];

// Helper map for O(1) lookups
export const ingredientMap = allIngredients.reduce((map, ing) => {
    map[ing.id] = ing;
    return map;
}, {});
