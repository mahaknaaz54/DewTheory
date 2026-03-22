/**
 * barrierRecovery.js
 * Dew Theory — Barrier Recovery Override Mode
 *
 * Triggered when sensitivityScore >= 4 OR barrierStrengthScore <= 2.
 * Generates a 14-day barrier repair protocol. All actives suppressed.
 */

/** Ingredients permitted during barrier recovery (by name) */
const BARRIER_SAFE_NAMES = [
    'Ceramides',
    'Panthenol',
    'Centella Asiatica',
    'Hyaluronic Acid',
    'Squalane',
    'Beta-Glucan',
    'Glycerin',
    'Snail Mucin',
];

/**
 * Determines if barrier recovery mode should be activated.
 *
 * @param {Object} skinProfile
 * @returns {boolean}
 */
export function checkBarrierRecoveryMode(skinProfile) {
    return (
        skinProfile.sensitivityScore >= 4 ||
        skinProfile.barrierStrengthScore <= 2
    );
}

/**
 * Filters an ingredient list to only barrier-safe ingredients.
 *
 * @param {Array} enrichedIngredients
 * @returns {Array}
 */
export function getBarrierSafeIngredients(enrichedIngredients) {
    return enrichedIngredients.filter((i) =>
        BARRIER_SAFE_NAMES.includes(i.name)
    );
}

/**
 * Builds the 14-day barrier repair protocol.
 *
 * Structure:
 * - Week 1 (Days 1–7): Foundational barrier — ceramides, glycerin, hyaluronic acid, panthenol
 * - Week 2 (Days 8–14): Reinforcement — add squalane, centella asiatica, beta-glucan
 *
 * @param {Array} enrichedIngredients — full enriched library
 * @returns {{ week1: { am, pm, focus }, week2: { am, pm, focus }, protocol: Array<DayProtocol> }}
 */
export function buildBarrierProtocol(enrichedIngredients) {
    const safeIngredients = getBarrierSafeIngredients(enrichedIngredients);

    const byName = (name) => safeIngredients.find((i) => i.name === name);

    const ceramides = byName('Ceramides');
    const hyaluronic = byName('Hyaluronic Acid');
    const glycerin = byName('Glycerin');
    const panthenol = byName('Panthenol');
    const squalane = byName('Squalane');
    const centella = byName('Centella Asiatica');
    const betaGlucan = byName('Beta-Glucan');
    const snailMucin = byName('Snail Mucin');

    const week1AM = [hyaluronic, glycerin, ceramides, panthenol].filter(Boolean);
    const week1PM = [ceramides, panthenol, glycerin, squalane].filter(Boolean);

    const week2AM = [hyaluronic, betaGlucan, centella, ceramides].filter(Boolean);
    const week2PM = [ceramides, squalane, panthenol, centella, snailMucin].filter(Boolean);

    const WEEK1_FOCUS = 'Restore core barrier lipids and establish water retention';
    const WEEK2_FOCUS = 'Reinforce barrier integrity and calm residual inflammation';

    // Generate day-by-day protocol
    const protocol = [];
    for (let d = 1; d <= 14; d++) {
        const isWeek2 = d > 7;
        protocol.push({
            day: d,
            label: `Day ${d}`,
            week: isWeek2 ? 2 : 1,
            focus: isWeek2 ? WEEK2_FOCUS : WEEK1_FOCUS,
            am: isWeek2 ? week2AM : week1AM,
            pm: isWeek2 ? week2PM : week1PM,
        });
    }

    return {
        week1: { am: week1AM, pm: week1PM, focus: WEEK1_FOCUS },
        week2: { am: week2AM, pm: week2PM, focus: WEEK2_FOCUS },
        protocol,
    };
}

/** Clinical guidance shown in barrier recovery mode */
export const BARRIER_RECOVERY_GUIDANCE = [
    {
        icon: '🚫',
        title: 'Pause All Actives',
        body: 'Retinoids, AHAs, BHAs, and strong Vitamin C are suspended for the full 14-day protocol to allow epithelial recovery.',
    },
    {
        icon: '💧',
        title: 'Layer Humectants First',
        body: 'Apply humectant serums (Hyaluronic Acid, Glycerin) to damp skin, then seal with ceramide-rich moisturiser.',
    },
    {
        icon: '🌡️',
        title: 'Minimise Environmental Triggers',
        body: 'Avoid hot water, harsh cleansers, fragrances, and over-cleansing. Lukewarm water and a gentle non-foaming cleanser only.',
    },
    {
        icon: '☀️',
        title: 'SPF Every Morning',
        body: 'Mineral SPF 30+ is essential even during recovery. UV exposure delays barrier restoration.',
    },
    {
        icon: '📅',
        title: 'Reassess at Day 14',
        body: 'Once the barrier feels resilient (no tightness, redness, or reactivity), cautiously reintroduce one low-irritation active at a time.',
    },
];
