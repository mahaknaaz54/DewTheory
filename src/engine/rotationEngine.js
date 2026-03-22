/**
 * rotationEngine.js
 * Dew Theory — Routine Rotation Scheduling Engine
 *
 * Builds a 7-day AM/PM schedule that:
 * - Limits high-strength actives to 2–3x per week
 * - Schedules conflicting ingredient pairs on alternate days
 * - Fills non-active days with barrier repair ingredients
 */

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Barrier repair filler ingredients (by name) used on rest days */
const BARRIER_FILLER_NAMES = [
    'Ceramides',
    'Panthenol',
    'Centella Asiatica',
    'Hyaluronic Acid',
    'Squalane',
    'Beta-Glucan',
    'Glycerin',
];

/**
 * Returns barrier-safe filler ingredients from the enriched library.
 */
function getBarrierFillers(allIngredients) {
    return allIngredients.filter((i) =>
        BARRIER_FILLER_NAMES.includes(i.name)
    );
}

/**
 * For a pair of conflicting ingredients scheduled on alternate days,
 * returns which days each gets.
 * A → Mon/Wed/Fri, B → Tue/Thu/Sat
 */
function alternatingDays(pairIndex = 0) {
    const setA = ['Mon', 'Wed', 'Fri'];
    const setB = ['Tue', 'Thu', 'Sat'];
    return { setA, setB };
}

/**
 * Builds a 7-day AM/PM schedule.
 *
 * @param {Array}  amRoutine          — safe, conflict-resolved AM ingredients
 * @param {Array}  pmRoutine          — safe, conflict-resolved PM ingredients
 * @param {Array}  scheduledPairs     — [{ a, b }] pairs that must alternate
 * @param {Array}  allIngredients     — full enriched library (for barrier fillers)
 * @returns {Object} schedule — { Mon: { am: [], pm: [] }, Tue: ..., ... }
 */
export function buildWeeklySchedule(amRoutine, pmRoutine, scheduledPairs, allIngredients) {
    // Build base schedule — start with full routines every day
    const schedule = {};
    DAYS.forEach((day) => {
        schedule[day] = {
            am: [...amRoutine],
            pm: [...pmRoutine],
        };
    });

    const fillers = getBarrierFillers(allIngredients);

    // Apply high-strength limits (max 3 days/week → Mon/Wed/Fri for PM actives)
    const highStrengthPM = pmRoutine.filter((i) => i.strengthLevel === 'high');
    const activeFreqDays = ['Mon', 'Wed', 'Fri'];
    const restDays = ['Tue', 'Thu', 'Sat', 'Sun'];

    if (highStrengthPM.length > 0) {
        highStrengthPM.forEach((active) => {
            // Remove from rest days PM
            restDays.forEach((day) => {
                schedule[day].pm = schedule[day].pm.filter((i) => i.id !== active.id);
                // Add barrier filler if not already present
                fillers.forEach((filler) => {
                    if (!schedule[day].pm.find((i) => i.id === filler.id)) {
                        schedule[day].pm.push(filler);
                    }
                });
            });
        });
    }

    // Apply conflict pair alternation
    scheduledPairs.forEach(({ a, b }, idx) => {
        const { setA, setB } = alternatingDays(idx);

        // Remove B from setA days, remove A from setB days (in both AM and PM)
        setA.forEach((day) => {
            schedule[day].am = schedule[day].am.filter((i) => i.id !== b.id);
            schedule[day].pm = schedule[day].pm.filter((i) => i.id !== b.id);
        });
        setB.forEach((day) => {
            schedule[day].am = schedule[day].am.filter((i) => i.id !== a.id);
            schedule[day].pm = schedule[day].pm.filter((i) => i.id !== a.id);
        });
    });

    // Cap each slot to max 5 ingredients
    DAYS.forEach((day) => {
        schedule[day].am = deduplicateById(schedule[day].am).slice(0, 5);
        schedule[day].pm = deduplicateById(schedule[day].pm).slice(0, 5);
    });

    return schedule;
}

/** Deduplicates an ingredient array by id */
function deduplicateById(arr) {
    const seen = new Set();
    return arr.filter((i) => {
        if (seen.has(i.id)) return false;
        seen.add(i.id);
        return true;
    });
}

/**
 * Gets a human-readable frequency label for an ingredient.
 */
export function getFrequencyLabel(frequencyLimit) {
    const labels = {
        daily: 'Daily',
        '3x_week': '3× per week',
        '2x_week': '2× per week',
        '1x_week': 'Once per week',
    };
    return labels[frequencyLimit] || 'Daily';
}
