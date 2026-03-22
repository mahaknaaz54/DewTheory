/**
 * quizData.js
 * Dew Theory — Clinical Skin Profile Quiz Questions
 *
 * 10 questions that map to numeric skin profile scores via SCORE_MAP in skinProfile.js.
 * Each option includes id (must match SCORE_MAP key), label, desc, icon.
 */
export const quizQuestions = [
    {
        id: 'q1',
        title: 'What are your primary skin concerns?',
        subtitle: 'Choose all that apply (select 1 or more).',
        allowMultiple: true,
        options: [
            { id: 'concern_acne', label: 'Acne & Breakouts', desc: 'Active pimples, congested pores, blackheads', icon: '🌿' },
            { id: 'concern_aging', label: 'Fine Lines & Aging', desc: 'Visible wrinkles, loss of firmness or elasticity', icon: '✨' },
            { id: 'concern_pigmentation', label: 'Dark Spots & Pigmentation', desc: 'Hyperpigmentation, melasma, uneven tone', icon: '☀️' },
            { id: 'concern_dryness', label: 'Dryness & Dehydration', desc: 'Tightness, flakiness, rough patches', icon: '💧' },
            { id: 'concern_sensitivity', label: 'Sensitivity & Redness', desc: 'Reactive skin, stinging, chronic redness', icon: '🌸' },
            { id: 'concern_texture', label: 'Texture & Pores', desc: 'Rough bumps, enlarged pores, uneven surface', icon: '🔬' },
        ],
    },
    {
        id: 'q2',
        title: 'How does your skin behave by mid-day?',
        subtitle: 'Without touching up or applying anything additional.',
        options: [
            { id: 'type_dry', label: 'Tight & Dry', desc: 'Constant need for moisture, possible flaking', icon: '🏜️' },
            { id: 'type_oily', label: 'Shiny & Oily', desc: 'Visible oil, needs blotting or powder', icon: '💦' },
            { id: 'type_combination', label: 'Oily T-Zone, Dry Cheeks', desc: 'Classic combination skin behaviour', icon: '⚖️' },
            { id: 'type_normal', label: 'Comfortable & Balanced', desc: 'No major changes, minimal concerns', icon: '🌿' },
            { id: 'type_sensitive', label: 'Flushed or Reactive', desc: 'Redness, tingling, or tightness throughout', icon: '🌡️' },
        ],
    },
    {
        id: 'q3',
        title: 'How does your skin react to new products?',
        subtitle: 'Think about your recent product experiences.',
        options: [
            { id: 'barrier_intact', label: 'Tolerates Most Products', desc: 'Rarely reacts, adapts easily to new ingredients', icon: '💪' },
            { id: 'barrier_sometimes', label: 'Occasional Sensitivity', desc: 'Sometimes mild redness or tingling', icon: '⚠️' },
            { id: 'barrier_frequently', label: 'Frequent Reactions', desc: 'Often irritated, red, or itchy with new products', icon: '🔴' },
            { id: 'barrier_compromised', label: 'Severely Reactive', desc: 'Almost any product causes stinging or burning', icon: '🆘' },
        ],
    },
    {
        id: 'q4',
        title: 'How would you describe your acne situation?',
        subtitle: 'Be honest — this directly shapes your ingredient safety profile.',
        options: [
            { id: 'acne_none', label: 'No Acne', desc: 'Skin is clear, no breakouts', icon: '✅' },
            { id: 'acne_occasional', label: 'Occasional Blemishes', desc: '1–2 pimples per month, usually hormonal', icon: '🌱' },
            { id: 'acne_moderate', label: 'Moderate Breakouts', desc: 'Several pimples per week, some inflammation', icon: '🌿' },
            { id: 'acne_severe', label: 'Frequent Breakouts', desc: 'Persistent acne across multiple areas', icon: '🔶' },
            { id: 'acne_cystic', label: 'Cystic or Nodular', desc: 'Deep, painful, inflamed cysts under the skin', icon: '🔴' },
        ],
    },
    {
        id: 'q5',
        title: 'What is your pigmentation situation?',
        subtitle: 'Determines brightening and depigmentation ingredient priority.',
        options: [
            { id: 'pigment_none', label: 'None', desc: 'Even skin tone, no visible dark spots', icon: '✨' },
            { id: 'pigment_mild', label: 'Mild', desc: 'A few faint spots, mostly from old blemishes', icon: '🌤️' },
            { id: 'pigment_moderate', label: 'Moderate', desc: 'Noticeable dark patches in multiple areas', icon: '☁️' },
            { id: 'pigment_severe', label: 'Significant / Melasma', desc: 'Large pigmented areas, sun damage, or melasma', icon: '🌑' },
        ],
    },
    {
        id: 'q6',
        title: 'How much UV / sun exposure do you get daily?',
        subtitle: 'This affects antioxidant prioritisation and photosensitiser safety.',
        options: [
            { id: 'uv_low', label: 'Minimal', desc: 'Mostly indoors, very limited sun contact', icon: '🏠' },
            { id: 'uv_moderate', label: 'Moderate', desc: 'A few hours outside, usually protected', icon: '🌤️' },
            { id: 'uv_high', label: 'High Exposure', desc: 'Outdoors regularly, heavy UV exposure daily', icon: '☀️' },
        ],
    },
    {
        id: 'q7',
        title: 'What climate do you live in?',
        subtitle: 'Climate profoundly affects oil production, hydration, and fungal risk.',
        options: [
            { id: 'climate_humid', label: 'Humid', desc: 'Heavy moisture in the air, frequent sweating', icon: '🌊' },
            { id: 'climate_dry', label: 'Dry / Arid', desc: 'Low humidity, moisture evaporates quickly', icon: '🏜️' },
            { id: 'climate_temperate', label: 'Temperate', desc: 'Balanced humidity, moderate seasonal changes', icon: '🌿' },
            { id: 'climate_tropical', label: 'Tropical', desc: 'Hot, very humid, high fungal acne risk', icon: '🌴' },
        ],
    },
    {
        id: 'q8',
        title: 'Are you currently pregnant or nursing?',
        subtitle: 'Essential for ingredient safety screening. Completely confidential.',
        options: [
            { id: 'pregnancy_no', label: 'No', desc: 'Not pregnant or nursing', icon: '✅' },
            { id: 'pregnancy_yes', label: 'Yes — Pregnant or Nursing', desc: 'Some actives will be automatically excluded', icon: '🤰' },
        ],
    },
    {
        id: 'q9',
        title: 'Have you ever had fungal acne (Malassezia)?',
        subtitle: 'Certain oils and esters can feed fungal acne even in trace amounts.',
        options: [
            { id: 'fungal_never', label: 'Never', desc: 'No history of fungal breakouts', icon: '✅' },
            { id: 'fungal_unsure', label: 'Possibly / Unsure', desc: 'Breakouts that don\'t respond to standard acne care', icon: '🤔' },
            { id: 'fungal_yes', label: 'Yes, diagnosed', desc: 'Confirmed fungal acne or Malassezia folliculitis', icon: '🍄' },
        ],
    },
    {
        id: 'q10',
        title: 'How much time can you dedicate to your ritual daily?',
        subtitle: 'Determines routine complexity and number of layers.',
        options: [
            { id: 'time_minimal', label: 'Minimal (2–3 min)', desc: 'Quick essentials only — cleanse, treat, moisturise', icon: '⏱️' },
            { id: 'time_moderate', label: 'Moderate (5–10 min)', desc: 'Standard multi-step routine with targeted actives', icon: '⏳' },
            { id: 'time_extensive', label: 'Extensive (15+ min)', desc: 'Full layered protocol with multiple actives', icon: '🛁' },
        ],
    },
];
