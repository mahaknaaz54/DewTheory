/**
 * safetyFilter.js
 * Dew Theory — Hard Safety Exclusion Engine
 *
 * Automatically removes ingredients that are unsafe for a given skin profile.
 * No scoring — these are hard gates that cannot be overridden by score.
 */

/**
 * Hard safety exclusion rules.
 * Each rule: { reason, test(ingredient, skinProfile) → boolean (true = REMOVE) }
 */
export const SAFETY_RULES = [
    {
        id: 'pregnancy',
        label: 'Pregnancy / Nursing Safety',
        reason: 'Not safe for use during pregnancy or nursing.',
        icon: '🤰',
        test: (ing, profile) => profile.pregnancyStatus === true && ing.pregnancySafe === false,
    },
    {
        id: 'fungal_acne',
        label: 'Fungal Acne Trigger',
        reason: 'May trigger fungal acne (Malassezia folliculitis).',
        icon: '🍄',
        test: (ing, profile) => profile.fungalAcneRisk >= 3 && ing.fungalAcneSafe === false,
    },
    {
        id: 'barrier_irritation',
        label: 'Barrier Sensitivity Gate',
        reason: 'Too irritating for a compromised skin barrier.',
        icon: '⚠️',
        test: (ing, profile) =>
            profile.barrierStrengthScore <= 2 && ing.irritationLevel >= 4,
    },
    {
        id: 'high_sensitivity',
        label: 'High Sensitivity Gate',
        reason: 'Irritation level too high for extremely sensitive skin.',
        icon: '🌡️',
        test: (ing, profile) =>
            profile.sensitivityScore >= 4 && ing.irritationLevel >= 3,
    },
    {
        id: 'comedogenic_acne',
        label: 'Comedogenic Risk Gate',
        reason: 'Comedogenic rating too high for significant acne.',
        icon: '🔴',
        test: (ing, profile) =>
            profile.acneSeverityScore >= 3 && ing.comedogenicRating >= 4,
    },
];

/**
 * Applies all hard safety rules.
 * Returns { safe, excluded } — two arrays.
 *
 * @param {Array}  ingredients — enriched ingredients
 * @param {Object} skinProfile
 * @returns {{ safe: Array, excluded: Array<{ ingredient, rule }> }}
 */
export function applySafetyExclusions(ingredients, skinProfile) {
    const safe = [];
    const excluded = [];

    ingredients.forEach((ingredient) => {
        const triggeredRule = SAFETY_RULES.find((rule) =>
            rule.test(ingredient, skinProfile)
        );

        if (triggeredRule) {
            excluded.push({ ingredient, rule: triggeredRule });
        } else {
            safe.push(ingredient);
        }
    });

    return { safe, excluded };
}

/**
 * Generates human-readable safety notes for the excluded ingredients.
 *
 * @param {Array} excluded — from applySafetyExclusions
 * @returns {Array<{ label, reason, ingredientName, icon }>}
 */
export function buildSafetyNotes(excluded) {
    return excluded.map(({ ingredient, rule }) => ({
        ingredientName: ingredient.name,
        label: rule.label,
        reason: rule.reason,
        icon: rule.icon,
        ruleId: rule.id,
    }));
}
