import { useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Shield, Sun, Moon, Calendar, AlertTriangle, Info,
    ArrowRight, Brain, Droplets, Flame, Sparkles, RefreshCw,
    ChevronDown, Heart,
} from 'lucide-react';
import Container from '../components/Container';
import { allIngredients as ingredients } from '../data/ingredients';
import { SCORE_LABELS } from '../engine/skinProfile';
import { rankIngredients, splitRoutine } from '../engine/scoringEngine';
import { applySafetyExclusions, buildSafetyNotes } from '../engine/safetyFilter';
import { detectConflicts, resolveConflicts, filterRemovedIngredients, buildConflictNotes } from '../engine/conflictEngine';
import { buildWeeklySchedule, getFrequencyLabel } from '../engine/rotationEngine';
import { checkBarrierRecoveryMode, buildBarrierProtocol, BARRIER_RECOVERY_GUIDANCE } from '../engine/barrierRecovery';

/* ─── Helpers ───────────────────────────────────────────────── */

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ScoreBadge = ({ label, value, max = 5, color = 'orange' }) => {
    const pct = (Math.min(value, max) / max) * 100;
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline">
                <span className="text-xs font-semibold text-hikari-text dark:text-white">{label}</span>
                <span className="text-[10px] font-bold text-hikari-orange">{value}/{max}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-hikari-clay/40 dark:bg-white/10 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className={`h-full rounded-full ${value >= 4 ? 'bg-red-500' : value >= 3 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                />
            </div>
        </div>
    );
};

const IngredientPill = ({ ingredient }) => (
    <Link
        to={`/ingredients/${ingredient.slug || ingredient.id}`}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-hikari-clay/30 dark:border-white/10 hover:border-hikari-orange/50 transition-all duration-200 group"
    >
        <span className="w-7 h-7 rounded-full bg-hikari-orange/10 flex items-center justify-center text-xs font-bold text-hikari-orange shrink-0">
            {ingredient.name?.[0]}
        </span>
        <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-hikari-text dark:text-white group-hover:text-hikari-orange transition-colors truncate">
                {ingredient.name}
            </p>
            <p className="text-[10px] text-hikari-muted dark:text-gray-400 truncate">
                {ingredient.category} · {getFrequencyLabel(ingredient.frequencyLimit)}
            </p>
        </div>
        <ArrowRight size={12} className="text-hikari-muted dark:text-gray-500 group-hover:text-hikari-orange transition-colors shrink-0" />
    </Link>
);

const SectionHeading = ({ icon: Icon, title, subtitle }) => (
    <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon size={18} className="text-hikari-orange" />}
            <h2 className="font-playfair font-bold text-xl md:text-2xl text-hikari-text dark:text-white">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-hikari-muted dark:text-gray-400 ml-6">{subtitle}</p>}
    </div>
);

/* ─── Main Component ────────────────────────────────────────── */

const QuizResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const skinProfile = location.state?.skinProfile;

    // Redirect to quiz if no profile data
    if (!skinProfile) {
        return (
            <Container className="pt-32 pb-24 min-h-[80vh] flex flex-col items-center justify-center text-center">
                <Brain size={48} className="text-hikari-orange mb-4" />
                <h1 className="font-playfair font-bold text-3xl mb-3 text-hikari-text dark:text-white">No Skin Profile Found</h1>
                <p className="text-hikari-muted dark:text-gray-400 mb-6">Complete the skin analysis quiz first to receive your personalised ingredient intelligence report.</p>
                <button
                    onClick={() => navigate('/quiz')}
                    className="px-6 py-3 rounded-xl bg-hikari-orange text-white font-bold text-sm hover:brightness-110 transition"
                >
                    Start Clinical Analysis
                </button>
            </Container>
        );
    }

    /* ── All computation is memoised ── */
    const results = useMemo(() => {
        // 1. Ingredients are already enriched in the new schema
        const enriched = ingredients;

        // 2. Check barrier recovery mode
        const isBarrierRecovery = checkBarrierRecoveryMode(skinProfile);

        if (isBarrierRecovery) {
            const protocol = buildBarrierProtocol(enriched);
            return { isBarrierRecovery, protocol, enriched };
        }

        // 3. Apply safety exclusions
        const { safe, excluded } = applySafetyExclusions(enriched, skinProfile);
        const safetyNotes = buildSafetyNotes(excluded);

        // 4. Score and rank
        const ranked = rankIngredients(safe, skinProfile);

        // 5. Split into AM/PM
        const maxItems = skinProfile.routineTime === 'minimal' ? 3 : skinProfile.routineTime === 'extensive' ? 6 : 5;
        const { am, pm } = splitRoutine(ranked, maxItems);

        // 6. Detect conflicts among selected ingredients
        const allSelected = [...new Map([...am, ...pm].map(i => [i.id, i])).values()];
        const rawConflicts = detectConflicts(allSelected);
        const { resolvedConflicts, removedIds, scheduledPairs } = resolveConflicts(rawConflicts);
        const conflictNotes = buildConflictNotes(resolvedConflicts);

        // 7. Filter out removed ingredients
        const finalAm = filterRemovedIngredients(am, removedIds);
        const finalPm = filterRemovedIngredients(pm, removedIds);

        // 8. Build weekly schedule
        const schedule = buildWeeklySchedule(finalAm, finalPm, scheduledPairs, enriched);

        return {
            isBarrierRecovery: false,
            ranked,
            am: finalAm,
            pm: finalPm,
            schedule,
            conflictNotes,
            safetyNotes,
            excluded,
            enriched,
        };
    }, [skinProfile]);

    /* ── Barrier Recovery Mode ── */
    if (results.isBarrierRecovery) {
        const { protocol, enriched } = results;
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-hikari-cream to-white dark:from-[#1a0808] dark:via-hikari-dark dark:to-black pt-28 pb-20">
                <Container className="max-w-4xl mx-auto">
                    {/* Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 p-6 rounded-3xl bg-red-500/10 border-2 border-red-500/30 dark:bg-red-500/5"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center shrink-0">
                                <Shield size={24} className="text-red-500" />
                            </div>
                            <div>
                                <h1 className="font-playfair font-bold text-2xl md:text-3xl text-red-600 dark:text-red-400 mb-2">
                                    Barrier Recovery Mode Activated
                                </h1>
                                <p className="text-sm text-red-700/80 dark:text-red-400/70 leading-relaxed">
                                    Your skin profile indicates a significantly compromised barrier
                                    (sensitivity: {skinProfile.sensitivityScore}/5, barrier strength: {skinProfile.barrierStrengthScore}/5).
                                    All strong actives have been suspended. The following 14-day protocol will restore your skin barrier before reintroducing active ingredients.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Clinical Guidance */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {BARRIER_RECOVERY_GUIDANCE.map((g, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-hikari-clay/20 dark:border-white/10"
                            >
                                <span className="text-2xl mb-2 block">{g.icon}</span>
                                <h3 className="font-bold text-sm mb-1 text-hikari-text dark:text-white">{g.title}</h3>
                                <p className="text-xs text-hikari-muted dark:text-gray-400 leading-relaxed">{g.body}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Week 1 and Week 2 */}
                    {[protocol.week1, protocol.week2].map((week, wi) => (
                        <motion.div
                            key={wi}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + wi * 0.15 }}
                            className="mb-10"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar size={16} className="text-hikari-orange" />
                                <h2 className="font-playfair font-bold text-xl text-hikari-text dark:text-white">
                                    Week {wi + 1} — Days {wi === 0 ? '1–7' : '8–14'}
                                </h2>
                            </div>
                            <p className="text-xs text-hikari-muted dark:text-gray-400 mb-4 ml-6">{week.focus}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* AM */}
                                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-500/5 border border-amber-200/40 dark:border-amber-500/10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sun size={14} className="text-amber-500" />
                                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">AM Routine</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {week.am.map((ing) => <IngredientPill key={ing.id} ingredient={ing} />)}
                                    </div>
                                </div>
                                {/* PM */}
                                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-500/5 border border-indigo-200/40 dark:border-indigo-500/10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Moon size={14} className="text-indigo-500" />
                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">PM Routine</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {week.pm.map((ing) => <IngredientPill key={ing.id} ingredient={ing} />)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Footer nav */}
                    <div className="flex flex-wrap gap-3 justify-center mt-8">
                        <Link to="/quiz" className="px-5 py-2.5 rounded-xl border-2 border-hikari-clay dark:border-white/15 text-sm font-semibold text-hikari-text dark:text-white hover:border-hikari-orange/50 transition">
                            Retake Quiz
                        </Link>
                        <Link to="/ingredients" className="px-5 py-2.5 rounded-xl bg-hikari-orange text-white text-sm font-bold hover:brightness-110 transition">
                            Explore Ingredient Library
                        </Link>
                    </div>
                </Container>
            </div>
        );
    }

    /* ── Normal Results ── */
    const { am, pm, schedule, conflictNotes, safetyNotes, ranked } = results;

    return (
        <div className="min-h-screen bg-gradient-to-br from-hikari-cream via-white to-hikari-cream dark:from-hikari-dark dark:via-[#0a0a0a] dark:to-hikari-dark pt-28 pb-20">
            <Container className="max-w-5xl mx-auto">

                {/* ── Hero / Profile Summary ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-14"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hikari-orange/10 text-hikari-orange text-xs font-bold tracking-wider mb-5">
                        <Brain size={14} />
                        YOUR INGREDIENT INTELLIGENCE REPORT
                    </span>
                    <h1 className="font-playfair font-bold text-3xl md:text-5xl text-hikari-text dark:text-white mb-4 leading-tight">
                        Personalised Ingredient Protocol
                    </h1>
                    <p className="text-hikari-muted dark:text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
                        Based on your clinical skin analysis, we've scored {ranked.length} ingredients
                        and built an optimised routine targeting your unique concerns.
                    </p>
                </motion.div>

                {/* ── Skin Profile Scores ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-14 p-6 rounded-3xl bg-white dark:bg-white/5 border border-hikari-clay/20 dark:border-white/10 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Heart size={16} className="text-hikari-orange" />
                        <h2 className="font-playfair font-bold text-lg text-hikari-text dark:text-white">Skin Profile</h2>
                        <span className="ml-auto text-[10px] font-bold text-hikari-muted dark:text-gray-500 tracking-wider uppercase">
                            {skinProfile.skinType} · {skinProfile.climate} · UV {skinProfile.uvExposure}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <ScoreBadge label="Sensitivity" value={skinProfile.sensitivityScore} />
                        <ScoreBadge label="Barrier Strength" value={5 - skinProfile.barrierStrengthScore} />
                        <ScoreBadge label="Acne Severity" value={skinProfile.acneSeverityScore} />
                        <ScoreBadge label="Pigmentation" value={skinProfile.pigmentationScore} />
                        <ScoreBadge label="Inflammation" value={skinProfile.inflammationScore} />
                        <ScoreBadge label="Oil Production" value={skinProfile.oilProductionLevel} />
                        <ScoreBadge label="Dehydration" value={skinProfile.dehydrationLevel} />
                        <ScoreBadge label="Fungal Risk" value={skinProfile.fungalAcneRisk} />
                    </div>
                    {skinProfile.primaryConcerns.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {skinProfile.primaryConcerns.map((c) => (
                                <span key={c} className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-hikari-orange/10 text-hikari-orange">
                                    {c}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* ── Safety Exclusions ── */}
                {safetyNotes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mb-14"
                    >
                        <SectionHeading icon={Shield} title="Safety Exclusions" subtitle={`${safetyNotes.length} ingredient(s) automatically removed for your safety.`} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {safetyNotes.map((n, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-red-50/60 dark:bg-red-500/5 border border-red-200/40 dark:border-red-500/10">
                                    <span className="text-lg">{n.icon}</span>
                                    <div>
                                        <p className="text-sm font-bold text-red-700 dark:text-red-400">{n.ingredientName}</p>
                                        <p className="text-xs text-red-600/70 dark:text-red-400/60">{n.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── AM Routine ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <SectionHeading icon={Sun} title="AM Routine" subtitle="Morning protocol — antioxidants, hydration, protection." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {am.map((ing, idx) => (
                            <motion.div
                                key={ing.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 + idx * 0.05 }}
                            >
                                <Link
                                    to={`/ingredients/${ing.slug || ing.id}`}
                                    className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200/30 dark:border-amber-500/10 hover:border-hikari-orange/40 transition group"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-hikari-orange text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold text-hikari-text dark:text-white group-hover:text-hikari-orange transition-colors">
                                            {ing.name}
                                        </p>
                                        <p className="text-[10px] text-hikari-muted dark:text-gray-400 mb-1">
                                            {ing.category} · Score: {ing.compatibilityScore} · {getFrequencyLabel(ing.frequencyLimit)}
                                        </p>
                                        <p className="text-xs text-hikari-muted dark:text-gray-300 leading-relaxed">
                                            {ing.rationale || ing.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── PM Routine ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-14"
                >
                    <SectionHeading icon={Moon} title="PM Routine" subtitle="Evening protocol — repair, renewal, barrier restoration." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pm.map((ing, idx) => (
                            <motion.div
                                key={ing.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + idx * 0.05 }}
                            >
                                <Link
                                    to={`/ingredients/${ing.slug || ing.id}`}
                                    className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-200/30 dark:border-indigo-500/10 hover:border-hikari-orange/40 transition group"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold text-hikari-text dark:text-white group-hover:text-hikari-orange transition-colors">
                                            {ing.name}
                                        </p>
                                        <p className="text-[10px] text-hikari-muted dark:text-gray-400 mb-1">
                                            {ing.category} · Score: {ing.compatibilityScore} · {getFrequencyLabel(ing.frequencyLimit)}
                                        </p>
                                        <p className="text-xs text-hikari-muted dark:text-gray-300 leading-relaxed">
                                            {ing.rationale || ing.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Weekly Schedule ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-14"
                >
                    <SectionHeading icon={Calendar} title="Weekly Schedule" subtitle="Rotation-optimised plan with conflict resolution applied." />
                    <div className="overflow-x-auto -mx-4 px-4">
                        <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                            {DAYS.map((day) => (
                                <div key={day} className="rounded-2xl border border-hikari-clay/20 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden">
                                    <div className="text-center py-2 bg-hikari-orange/10 dark:bg-hikari-orange/5">
                                        <span className="text-xs font-bold text-hikari-orange tracking-wider">{day}</span>
                                    </div>
                                    <div className="p-2 space-y-2">
                                        {/* AM */}
                                        <div>
                                            <div className="flex items-center gap-1 mb-1">
                                                <Sun size={10} className="text-amber-500" />
                                                <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">AM</span>
                                            </div>
                                            {(schedule[day]?.am || []).map((ing) => (
                                                <p key={ing.id} className="text-[10px] text-hikari-text dark:text-gray-300 truncate leading-relaxed">
                                                    {ing.name}
                                                </p>
                                            ))}
                                            {(schedule[day]?.am || []).length === 0 && (
                                                <p className="text-[9px] text-hikari-muted dark:text-gray-500 italic">Rest</p>
                                            )}
                                        </div>
                                        {/* PM */}
                                        <div>
                                            <div className="flex items-center gap-1 mb-1">
                                                <Moon size={10} className="text-indigo-500" />
                                                <span className="text-[8px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">PM</span>
                                            </div>
                                            {(schedule[day]?.pm || []).map((ing) => (
                                                <p key={ing.id} className="text-[10px] text-hikari-text dark:text-gray-300 truncate leading-relaxed">
                                                    {ing.name}
                                                </p>
                                            ))}
                                            {(schedule[day]?.pm || []).length === 0 && (
                                                <p className="text-[9px] text-hikari-muted dark:text-gray-500 italic">Rest</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Conflict Notes ── */}
                {conflictNotes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-14"
                    >
                        <SectionHeading icon={AlertTriangle} title="Conflict Notes" subtitle="The following interactions were detected and automatically resolved." />
                        <div className="flex flex-col gap-3">
                            {conflictNotes.map((cn, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-2xl border flex items-start gap-3 ${cn.severity === 'remove'
                                        ? 'bg-red-50/50 border-red-200/40 dark:bg-red-500/5 dark:border-red-500/10'
                                        : cn.severity === 'schedule'
                                            ? 'bg-amber-50/50 border-amber-200/40 dark:bg-amber-500/5 dark:border-amber-500/10'
                                            : 'bg-blue-50/50 border-blue-200/40 dark:bg-blue-500/5 dark:border-blue-500/10'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cn.severity === 'remove' ? 'bg-red-500/15' : cn.severity === 'schedule' ? 'bg-amber-500/15' : 'bg-blue-500/15'
                                        }`}>
                                        {cn.severity === 'remove' ? (
                                            <AlertTriangle size={14} className="text-red-500" />
                                        ) : cn.severity === 'schedule' ? (
                                            <RefreshCw size={14} className="text-amber-600" />
                                        ) : (
                                            <Info size={14} className="text-blue-500" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-hikari-text dark:text-white">{cn.title}</p>
                                        <p className="text-xs text-hikari-muted dark:text-gray-400 leading-relaxed mt-0.5">{cn.note}</p>
                                        <p className="text-[10px] font-bold mt-1.5 tracking-wider uppercase text-hikari-orange">
                                            Resolution: {cn.resolution === 'removed' ? `${cn.removedName} removed` : cn.resolution === 'scheduled' ? 'Alternate-day scheduling applied' : 'Use with caution'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── Ingredient Rationale ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="mb-14"
                >
                    <SectionHeading icon={Sparkles} title="Ingredient Rationale" subtitle="Clinical evidence behind each ingredient in your protocol." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[...new Map([...am, ...pm].map(i => [i.id, i])).values()].map((ing, idx) => (
                            <Link
                                key={ing.id}
                                to={`/ingredients/${ing.slug || ing.id}`}
                                className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-hikari-clay/20 dark:border-white/10 hover:border-hikari-orange/40 transition group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-6 h-6 rounded-full bg-hikari-orange/10 flex items-center justify-center text-[10px] font-bold text-hikari-orange">
                                        {ing.name?.[0]}
                                    </span>
                                    <p className="text-sm font-bold text-hikari-text dark:text-white group-hover:text-hikari-orange transition-colors">{ing.name}</p>
                                    <span className="ml-auto text-[10px] text-hikari-muted dark:text-gray-500">{ing.timeOfDay}</span>
                                </div>
                                <p className="text-xs text-hikari-muted dark:text-gray-300 leading-relaxed">
                                    {ing.rationale || ing.howItWorks || ing.description}
                                </p>
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {(ing.goalTags || []).slice(0, 4).map((tag) => (
                                        <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-hikari-clay/30 dark:bg-white/10 text-hikari-muted dark:text-gray-400">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* ── Footer Actions ── */}
                <div className="flex flex-wrap gap-3 justify-center">
                    <Link
                        to="/quiz"
                        className="px-5 py-2.5 rounded-xl border-2 border-hikari-clay dark:border-white/15 text-sm font-semibold text-hikari-text dark:text-white hover:border-hikari-orange/50 transition"
                    >
                        Retake Quiz
                    </Link>
                    <Link
                        to="/ingredients"
                        className="px-5 py-2.5 rounded-xl bg-hikari-orange text-white text-sm font-bold hover:brightness-110 transition"
                    >
                        Explore Full Library
                    </Link>
                </div>

            </Container>
        </div>
    );
};

export default QuizResults;
