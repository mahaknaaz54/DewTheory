/**
 * conflictEngine.js
 * Dew Theory — Ingredient Conflict Detection & Resolution Engine
 *
 * Detects conflicts between ingredients in a routine and resolves them
 * by scheduling on alternate days or removing the lower-scoring ingredient.
 */

/**
 * Conflict severity levels and their resolution strategy.
 *
 * 'warn'     — ingredients can coexist but should be used carefully
 * 'schedule' — auto-schedule on alternate days
 * 'remove'   — remove the lower-scoring ingredient entirely
 */
export const CONFLICT_SEVERITY = {
    warn: 'warn',
    schedule: 'schedule',
    remove: 'remove',
};

/**
 * Known conflict pairs.
 * Bidirectional — only need to define once.
 * { a, b, severity, note }
 */
export const CONFLICT_MATRIX = [
    {
        a: 'Vitamin C',
        b: 'Niacinamide',
        severity: 'warn',
        note: 'Direct mixing of L-Ascorbic Acid with Niacinamide may form Nicotinic Acid, causing transient flushing in very high concentrations. Modern stabilized Vitamin C derivatives coexist well. Use sequentially or at separate times.',
    },
    {
        a: 'Retinol',
        b: 'Glycolic Acid',
        severity: 'schedule',
        note: 'Both accelerate cell turnover and increase photosensitivity. Combined use significantly raises irritation risk. Alternate: Retinol Mon/Wed/Fri, Glycolic Acid Tue/Thu.',
    },
    {
        a: 'Retinol',
        b: 'Lactic Acid',
        severity: 'schedule',
        note: 'AHAs lower skin pH, potentially denaturing retinol and amplifying irritation. Use on alternate evenings.',
    },
    {
        a: 'Retinol',
        b: 'Salicylic Acid',
        severity: 'schedule',
        note: 'Stacking retinoids with BHAs creates excessive desquamation and barrier disruption. Alternate nights recommended.',
    },
    {
        a: 'Retinol',
        b: 'Vitamin C',
        severity: 'schedule',
        note: 'Vitamin C is unstable at the alkaline pH required for retinol activity. Use Vitamin C in AM, Retinol in PM.',
    },
    {
        a: 'Retinol',
        b: 'Benzoyl Peroxide',
        severity: 'remove',
        note: 'Benzoyl Peroxide oxidizes Retinol on contact, rendering it inactive. Cannot be used in the same routine.',
    },
    {
        a: 'Glycolic Acid',
        b: 'Salicylic Acid',
        severity: 'schedule',
        note: 'Combining AHA + BHA creates over-exfoliation. Use on alternate evenings to maximise benefits without barrier damage.',
    },
    {
        a: 'Glycolic Acid',
        b: 'Vitamin C',
        severity: 'schedule',
        note: 'Both are low-pH actives. Layering them elevates irritation and instability risk. Use on alternate mornings.',
    },
    {
        a: 'Glycolic Acid',
        b: 'Bakuchiol',
        severity: 'warn',
        note: 'Glycolic Acid may potentiate mild irritation when combined with Bakuchiol. Monitor skin response — patch test recommended.',
    },
    {
        a: 'Lactic Acid',
        b: 'Vitamin C',
        severity: 'schedule',
        note: 'Acidic environment conflict. Neither works optimally when layered against the other. Schedule on alternate use days.',
    },
    {
        a: 'Vitamin C',
        b: 'Benzoyl Peroxide',
        severity: 'remove',
        note: 'Benzoyl Peroxide oxidizes ascorbic acid, destroying its antioxidant efficacy. Incompatible pairing.',
    },
    {
        a: 'Peptides',
        b: 'Glycolic Acid',
        severity: 'schedule',
        note: 'AHAs hydrolyze peptide bonds, breaking down signal peptide structures before they can penetrate. Do not layer in same session.',
    },
    {
        a: 'Peptides',
        b: 'Lactic Acid',
        severity: 'schedule',
        note: 'Similar to Glycolic Acid — lactic acid degrades peptide chains. Use on alternate evenings.',
    },
    {
        a: 'Azelaic Acid',
        b: 'Glycolic Acid',
        severity: 'warn',
        note: 'Both exfoliate and can cause cumulative irritation in sensitive skin. If using both, space application by several hours.',
    },
];

/**
 * Normalizes ingredient names for matching (lowercase, trimmed).
 */
const normalize = (name) => name?.toLowerCase().trim() ?? '';

/**
 * Detects conflicts between ingredients selected for a routine.
 *
 * @param {Array}  selectedIngredients — enriched ingredients with compatibilityScore
 * @returns {Array<ConflictResult>}
 *
 * ConflictResult: {
 *   ingredientA, ingredientB,
 *   severity, note,
 *   resolution: null | 'scheduled' | 'removed',
 *   removedIngredient: null | ingredient
 * }
 */
export function detectConflicts(selectedIngredients) {
    const conflicts = [];
    const nameMap = {};
    selectedIngredients.forEach((i) => { nameMap[normalize(i.name)] = i; });

    CONFLICT_MATRIX.forEach(({ a, b, severity, note }) => {
        const ingA = nameMap[normalize(a)];
        const ingB = nameMap[normalize(b)];

        const nameA = normalize(a);
        const nameB = normalize(b);

        // Also check layeringConflicts on each ingredient
        const hasConflict = (ingA && ingB) ||
            selectedIngredients.some((ing) =>
                (ing.layeringConflicts || []).some((c) => normalize(c) === nameB) &&
                nameMap[nameA]
            ) ||
            selectedIngredients.some((ing) =>
                (ing.layeringConflicts || []).some((c) => normalize(c) === nameA) &&
                nameMap[nameB]
            );

        if (!ingA || !ingB) return;

        conflicts.push({
            ingredientA: ingA,
            ingredientB: ingB,
            severity,
            note,
            resolution: null,
            removedIngredient: null,
        });
    });

    return conflicts;
}

/**
 * Resolves conflicts:
 * - 'remove': drops the lower-scoring ingredient
 * - 'schedule': marks for alternate-day scheduling
 * - 'warn': keeps both, just flags
 *
 * @param {Array} conflicts — from detectConflicts
 * @returns {{ resolvedConflicts, removedIds: Set, scheduledPairs: Array }}
 */
export function resolveConflicts(conflicts) {
    const removedIds = new Set();
    const scheduledPairs = []; // [{ a, b }]

    const resolvedConflicts = conflicts.map((conflict) => {
        const { ingredientA, ingredientB, severity } = conflict;

        if (severity === CONFLICT_SEVERITY.remove) {
            // Remove lower-scoring ingredient
            const scoreA = ingredientA.compatibilityScore ?? 0;
            const scoreB = ingredientB.compatibilityScore ?? 0;
            const loser = scoreA < scoreB ? ingredientA : ingredientB;
            removedIds.add(loser.id);
            return { ...conflict, resolution: 'removed', removedIngredient: loser };
        }

        if (severity === CONFLICT_SEVERITY.schedule) {
            scheduledPairs.push({ a: ingredientA, b: ingredientB });
            return { ...conflict, resolution: 'scheduled' };
        }

        // warn — keep both
        return { ...conflict, resolution: 'warn' };
    });

    return { resolvedConflicts, removedIds, scheduledPairs };
}

/**
 * Filters a list of ingredients, removing any with IDs in the removedIds set.
 *
 * @param {Array}  ingredients
 * @param {Set}    removedIds
 * @returns {Array}
 */
export function filterRemovedIngredients(ingredients, removedIds) {
    return ingredients.filter((i) => !removedIds.has(i.id));
}

/**
 * Builds human-readable conflict notes for the UI.
 *
 * @param {Array} resolvedConflicts
 * @returns {Array<{ title, note, severity, resolution, removedName }>}
 */
export function buildConflictNotes(resolvedConflicts) {
    return resolvedConflicts.map((c) => ({
        title: `${c.ingredientA.name} + ${c.ingredientB.name}`,
        note: c.note,
        severity: c.severity,
        resolution: c.resolution,
        removedName: c.removedIngredient?.name ?? null,
    }));
}
