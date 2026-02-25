/**
 * scoringEngine.js
 * Dew Theory — Weighted Ingredient Compatibility Scoring Engine
 *
 * Calculates a compatibility score for each ingredient against a skin profile.
 * All logic is pure functions — safe for use with useMemo.
 */

/**
 * Scoring weights — tune these for clinical accuracy.
 */
const WEIGHTS = {
    goalMatch: 4,         // Per matching goal tag
    skinTypeBonus: 3,     // Ingredient is listed for user's skin type
    climateBonus: 2,      // Climate-specific bonus
    sensitivityPenalty: -2,  // Per irritation point × sensitivity overlap
    barrierPenalty: -3,   // For barrier-disrupting ingredients on weak barriers
    acnePenalty: -3,      // Per comedogenic point × acne severity overlap
    dehydrationBonus: 2,  // Humectants/occlusives bonus for dehydrated skin
    pigmentBonus: 2,      // Brighteners bonus for pigmentation
    inflammationPenalty: -2, // High irritation on inflamed skin
};

/** Maps skin type strings to ingredient skinTypes that match */
const SKIN_TYPE_MAP = {
    dry: ['Dry', 'All', 'Very Dry'],
    oily: ['Oily', 'All', 'Combination'],
    combination: ['Combination', 'All', 'Oily'],
    normal: ['Normal', 'All'],
    sensitive: ['Sensitive', 'All'],
};

/** Climate bonus rules */
const CLIMATE_RULES = {
    dry: { emollientBonus: true, humectantBonus: true },
    humid: { lightweightBonus: true },
    tropical: { antifungalBonus: true, lightweightBonus: true },
    temperate: {},
};

/**
 * Calculates the compatibility score for a single enriched ingredient
 * against the user's skin profile.
 *
 * @param {Object} ingredient — enriched ingredient (with overlay fields)
 * @param {Object} skinProfile — built by buildSkinProfile()
 * @returns {number} weighted compatibility score
 */
export function scoreIngredient(ingredient, skinProfile) {
    let score = 10; // baseline

    // 1. Goal match multiplier
    const goalMatches = (ingredient.goalTags || []).filter(
        (tag) => skinProfile.primaryConcerns.includes(tag)
    ).length;
    score += goalMatches * WEIGHTS.goalMatch;

    // 2. Skin type alignment
    const matchingSkinTypes = SKIN_TYPE_MAP[skinProfile.skinType] || ['All'];
    const skinTypeMatch = (ingredient.skinTypes || []).some(
        (st) => matchingSkinTypes.includes(st)
    );
    if (skinTypeMatch) score += WEIGHTS.skinTypeBonus;

    // 3. Climate modifier
    const climateRules = CLIMATE_RULES[skinProfile.climate] || {};
    if (climateRules.humectantBonus && (ingredient.redundancyTags || []).includes('humectant')) {
        score += WEIGHTS.climateBonus;
    }
    if (climateRules.emollientBonus && (ingredient.redundancyTags || []).some(t => ['emollient', 'occlusive', 'barrier-lipid'].includes(t))) {
        score += WEIGHTS.climateBonus;
    }
    if (climateRules.lightweightBonus && ingredient.comedogenicRating <= 1) {
        score += WEIGHTS.climateBonus;
    }

    // 4. Sensitivity penalty
    // High irritation on sensitive skin is penalised proportionally
    if (skinProfile.sensitivityScore >= 2) {
        const overlapFactor = Math.min(skinProfile.sensitivityScore, 5) / 5;
        const irritationFactor = Math.max(0, ingredient.irritationLevel - 1);
        score += overlapFactor * irritationFactor * WEIGHTS.sensitivityPenalty;
    }

    // 5. Barrier penalty
    // Barrier-disrupting ingredients on weak barriers
    if (skinProfile.barrierStrengthScore <= 3 && ingredient.barrierImpactScore < 0) {
        const barrierWeakness = (3 - skinProfile.barrierStrengthScore) / 3;
        score += barrierWeakness * Math.abs(ingredient.barrierImpactScore) * WEIGHTS.barrierPenalty;
    }
    // Barrier-repairing ingredients boosted on weak barriers
    if (skinProfile.barrierStrengthScore <= 3 && ingredient.barrierImpactScore > 0) {
        score += ingredient.barrierImpactScore * 1.5;
    }

    // 6. Acne / comedogenic penalty
    if (skinProfile.acneSeverityScore >= 2 && ingredient.comedogenicRating > 0) {
        const acneFactor = skinProfile.acneSeverityScore / 5;
        score += acneFactor * ingredient.comedogenicRating * WEIGHTS.acnePenalty;
    }

    // 7. Inflammation penalty for high-irritation ingredients
    if (skinProfile.inflammationScore >= 3 && ingredient.irritationLevel >= 3) {
        score += WEIGHTS.inflammationPenalty * (ingredient.irritationLevel - 2);
    }

    // 8. Dehydration bonus for hydrating ingredients
    if (skinProfile.dehydrationLevel >= 3) {
        const hydrationTags = ['humectant', 'barrier-lipid', 'emollient', 'occlusive'];
        if ((ingredient.redundancyTags || []).some(t => hydrationTags.includes(t))) {
            score += WEIGHTS.dehydrationBonus;
        }
    }

    // 9. Pigmentation bonus
    if (skinProfile.pigmentationScore >= 2) {
        if ((ingredient.redundancyTags || []).includes('brightener')) {
            score += WEIGHTS.pigmentBonus;
        }
    }

    return Math.round(score * 10) / 10; // round to 1 decimal
}

/**
 * Ranks all enriched ingredients by compatibility with the skin profile.
 * Pure function — safe for useMemo.
 *
 * @param {Array}  ingredients — enriched ingredients
 * @param {Object} skinProfile
 * @returns {Array} ingredients sorted by score descending, with .compatibilityScore attached
 */
export function rankIngredients(ingredients, skinProfile) {
    return ingredients
        .map((ing) => ({
            ...ing,
            compatibilityScore: scoreIngredient(ing, skinProfile),
        }))
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

/**
 * Splits a ranked list into AM and PM routines.
 * Respects ingredient.timeOfDay field.
 * Limits each routine to maxPerRoutine items.
 *
 * @param {Array}  rankedIngredients
 * @param {number} maxPerRoutine — default 5
 * @returns {{ am: Array, pm: Array }}
 */
export function splitRoutine(rankedIngredients, maxPerRoutine = 5) {
    const am = rankedIngredients
        .filter((i) => i.timeOfDay === 'AM' || i.timeOfDay === 'both')
        .slice(0, maxPerRoutine);

    const pm = rankedIngredients
        .filter((i) => i.timeOfDay === 'PM' || i.timeOfDay === 'both')
        .slice(0, maxPerRoutine);

    return { am, pm };
}
