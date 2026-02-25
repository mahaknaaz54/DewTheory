/**
 * skinProfile.js
 * Dew Theory — Clinical Skin Profile Engine
 *
 * Converts raw quiz answers into a structured numeric skinProfile object.
 * All scores are on a 0–5 scale unless otherwise noted.
 */

/** Default/empty skin profile */
export const defaultSkinProfile = {
    skinType: 'normal',           // 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive'
    sensitivityScore: 0,          // 0 = not sensitive, 5 = extremely sensitive
    barrierStrengthScore: 5,      // 0 = severely compromised, 5 = intact/healthy
    acneSeverityScore: 0,         // 0 = none, 5 = severe cystic
    pigmentationScore: 0,         // 0 = none, 5 = severe hyperpigmentation
    inflammationScore: 0,         // 0 = none, 5 = chronic inflammation
    oilProductionLevel: 2,        // 0 = very dry, 5 = very oily
    dehydrationLevel: 0,          // 0 = well hydrated, 5 = severely dehydrated
    fungalAcneRisk: 0,            // 0 = none, 3+ = risk
    pregnancyStatus: false,       // true = pregnant or nursing
    climate: 'temperate',         // 'humid' | 'dry' | 'temperate' | 'tropical'
    uvExposure: 'low',            // 'low' | 'moderate' | 'high'
    primaryConcerns: [],          // array of concern strings matching goalTags
    routineTime: 'moderate',      // 'minimal' | 'moderate' | 'extensive'
};

/**
 * Answer-to-score mappings.
 * Each quiz option id maps to a delta object applied to the skin profile.
 */
export const SCORE_MAP = {
    // Q1 – Primary concern
    'concern_acne': { acneSeverityScore: +2, inflammationScore: +1, primaryConcerns: ['acne', 'pores'] },
    'concern_aging': { pigmentationScore: +1, primaryConcerns: ['aging', 'firmness', 'wrinkles'] },
    'concern_pigmentation': { pigmentationScore: +3, primaryConcerns: ['pigmentation', 'brightening', 'dark-spots'] },
    'concern_dryness': { dehydrationLevel: +3, barrierStrengthScore: -1, primaryConcerns: ['dryness', 'hydration', 'barrier'] },
    'concern_sensitivity': { sensitivityScore: +3, inflammationScore: +2, primaryConcerns: ['sensitivity', 'calming', 'barrier'] },
    'concern_texture': { acneSeverityScore: +1, primaryConcerns: ['texture', 'exfoliation', 'pores'] },

    // Q2 – Skin type / mid-day feel
    'type_dry': { oilProductionLevel: 0, dehydrationLevel: +2, skinType: 'dry' },
    'type_oily': { oilProductionLevel: +4, acneSeverityScore: +1, skinType: 'oily' },
    'type_combination': { oilProductionLevel: +2, skinType: 'combination' },
    'type_normal': { oilProductionLevel: +2, skinType: 'normal' },
    'type_sensitive': { sensitivityScore: +2, oilProductionLevel: +1, skinType: 'sensitive' },

    // Q3 – Barrier & past reactions
    'barrier_intact': { barrierStrengthScore: +2, sensitivityScore: 0 },
    'barrier_sometimes': { barrierStrengthScore: -1, sensitivityScore: +1 },
    'barrier_frequently': { barrierStrengthScore: -2, sensitivityScore: +2, inflammationScore: +1 },
    'barrier_compromised': { barrierStrengthScore: -3, sensitivityScore: +3, inflammationScore: +2 },

    // Q4 – Acne severity
    'acne_none': { acneSeverityScore: 0 },
    'acne_occasional': { acneSeverityScore: +1 },
    'acne_moderate': { acneSeverityScore: +2, inflammationScore: +1 },
    'acne_severe': { acneSeverityScore: +4, inflammationScore: +2, fungalAcneRisk: +1 },
    'acne_cystic': { acneSeverityScore: +5, inflammationScore: +3 },

    // Q5 – Pigmentation
    'pigment_none': { pigmentationScore: 0 },
    'pigment_mild': { pigmentationScore: +1 },
    'pigment_moderate': { pigmentationScore: +3 },
    'pigment_severe': { pigmentationScore: +5 },

    // Q6 – UV / sun exposure
    'uv_low': { uvExposure: 'low' },
    'uv_moderate': { uvExposure: 'moderate', pigmentationScore: +1 },
    'uv_high': { uvExposure: 'high', pigmentationScore: +2, inflammationScore: +1 },

    // Q7 – Climate / humidity
    'climate_humid': { climate: 'humid', oilProductionLevel: +1 },
    'climate_dry': { climate: 'dry', dehydrationLevel: +2, barrierStrengthScore: -1 },
    'climate_temperate': { climate: 'temperate' },
    'climate_tropical': { climate: 'tropical', fungalAcneRisk: +1, oilProductionLevel: +1 },

    // Q8 – Pregnancy / nursing
    'pregnancy_yes': { pregnancyStatus: true },
    'pregnancy_no': { pregnancyStatus: false },

    // Q9 – Fungal acne
    'fungal_never': { fungalAcneRisk: 0 },
    'fungal_unsure': { fungalAcneRisk: +1 },
    'fungal_yes': { fungalAcneRisk: +3 },

    // Q10 – Routine time
    'time_minimal': { routineTime: 'minimal' },
    'time_moderate': { routineTime: 'moderate' },
    'time_extensive': { routineTime: 'extensive' },
};

/**
 * Clamps a value to the range [min, max].
 */
const clamp = (val, min = 0, max = 5) => {
    if (typeof val !== 'number') return val;
    return Math.max(min, Math.min(max, val));
};

/**
 * Builds a skinProfile from the quiz answers object.
 * @param {Object} answers - { questionId: optionId }
 * @returns {Object} skinProfile
 */
export function buildSkinProfile(answers) {
    // Start from default
    const profile = { ...defaultSkinProfile, primaryConcerns: [] };

    // Apply each answer's score delta
    const allSelectedOptions = Object.values(answers).flat();
    allSelectedOptions.forEach((optionId) => {
        const delta = SCORE_MAP[optionId];
        if (!delta) return;

        Object.entries(delta).forEach(([key, value]) => {
            if (key === 'primaryConcerns' && Array.isArray(value)) {
                profile.primaryConcerns = [...new Set([...profile.primaryConcerns, ...value])];
            } else if (key === 'skinType' || key === 'climate' || key === 'uvExposure' || key === 'routineTime') {
                profile[key] = value;
            } else if (key === 'pregnancyStatus') {
                profile[key] = value;
            } else {
                profile[key] = (profile[key] || 0) + value;
            }
        });
    });

    // Clamp numeric scores
    const numericKeys = [
        'sensitivityScore', 'barrierStrengthScore', 'acneSeverityScore',
        'pigmentationScore', 'inflammationScore', 'oilProductionLevel',
        'dehydrationLevel', 'fungalAcneRisk',
    ];
    numericKeys.forEach((k) => {
        profile[k] = clamp(profile[k]);
    });

    return profile;
}

/**
 * Human-readable label for each score level.
 */
export const SCORE_LABELS = {
    0: 'None',
    1: 'Minimal',
    2: 'Mild',
    3: 'Moderate',
    4: 'High',
    5: 'Severe',
};
