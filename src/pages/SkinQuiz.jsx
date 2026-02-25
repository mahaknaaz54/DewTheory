import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { quizQuestions } from '../data/quizData';
import { allIngredients as ingredients } from '../data/ingredients';
import { buildSkinProfile } from '../engine/skinProfile';

const TOTAL = quizQuestions.length;

const SkinQuiz = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const currentQuestion = quizQuestions[currentStep];
    const progressPercent = (currentStep / TOTAL) * 100;
    const selectedAnswers = answers[currentQuestion.id];
    const isAnswered = !!selectedAnswers && (!Array.isArray(selectedAnswers) || selectedAnswers.length > 0);

    const handleSelect = useCallback((optionId) => {
        setAnswers((prev) => {
            const currentAnswers = prev[currentQuestion.id];

            if (currentQuestion.allowMultiple) {
                const arr = Array.isArray(currentAnswers) ? currentAnswers : (currentAnswers ? [currentAnswers] : []);
                if (arr.includes(optionId)) {
                    const newArr = arr.filter(id => id !== optionId);
                    return { ...prev, [currentQuestion.id]: newArr.length > 0 ? newArr : undefined };
                } else {
                    return { ...prev, [currentQuestion.id]: [...arr, optionId] };
                }
            } else {
                return { ...prev, [currentQuestion.id]: optionId };
            }
        });
    }, [currentQuestion.id, currentQuestion.allowMultiple]);

    const handleNext = useCallback(() => {
        if (currentStep < TOTAL - 1) {
            setCurrentStep((s) => s + 1);
        } else {
            // Build profile and navigate to results
            const profile = buildSkinProfile(answers);
            navigate('/quiz/results', { state: { skinProfile: profile } });
        }
    }, [currentStep, answers, navigate]);

    const handleBack = useCallback(() => {
        if (currentStep > 0) setCurrentStep((s) => s - 1);
    }, [currentStep]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-hikari-cream via-white to-hikari-cream dark:from-hikari-dark dark:via-[#0a0a0a] dark:to-hikari-dark pt-28 pb-16">

            {/* Header */}
            <div className="w-full max-w-2xl px-6 mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-hikari-orange/15 flex items-center justify-center">
                        <Brain size={16} className="text-hikari-orange" />
                    </span>
                    <span className="text-hikari-orange font-bold text-xs tracking-widest uppercase">
                        Clinical Skin Analysis — Step {currentStep + 1} of {TOTAL}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="relative h-1.5 w-full bg-hikari-clay/50 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-hikari-orange to-amber-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                </div>

                {/* Step dots */}
                <div className="flex gap-1.5 mt-3 justify-center">
                    {quizQuestions.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${i < currentStep
                                ? 'w-4 bg-hikari-orange'
                                : i === currentStep
                                    ? 'w-6 bg-hikari-orange'
                                    : 'w-2 bg-hikari-clay dark:bg-white/20'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Question area */}
            <div className="w-full max-w-2xl px-6 flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 32, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -32, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {/* Question text */}
                        <div className="mb-8 text-center">
                            <h2 className="font-playfair font-bold text-2xl md:text-3xl text-hikari-text dark:text-white mb-2 leading-snug">
                                {currentQuestion.title}
                            </h2>
                            {currentQuestion.subtitle && (
                                <p className="text-sm text-hikari-muted dark:text-gray-400">
                                    {currentQuestion.subtitle}
                                </p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="flex flex-col gap-3 mb-10">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = Array.isArray(selectedAnswers)
                                    ? selectedAnswers.includes(option.id)
                                    : selectedAnswers === option.id;
                                return (
                                    <motion.button
                                        key={option.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05, duration: 0.25 }}
                                        onClick={() => handleSelect(option.id)}
                                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 group
                      ${isSelected
                                                ? 'border-hikari-orange bg-hikari-orange/5 shadow-md dark:shadow-hikari-orange/10'
                                                : 'border-transparent bg-white dark:bg-white/5 shadow-sm hover:shadow-md dark:shadow-none hover:border-hikari-clay dark:hover:border-white/20'
                                            }`}
                                    >
                                        {/* Icon bubble */}
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-colors duration-300 ${isSelected
                                            ? 'bg-hikari-orange/15'
                                            : 'bg-hikari-clay/60 dark:bg-white/10'
                                            }`}>
                                            {option.icon}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-semibold text-sm transition-colors duration-200 ${isSelected ? 'text-hikari-orange' : 'text-hikari-text dark:text-white'
                                                }`}>
                                                {option.label}
                                            </p>
                                            <p className="text-xs text-hikari-muted dark:text-gray-400 mt-0.5 leading-relaxed">
                                                {option.desc}
                                            </p>
                                        </div>

                                        {/* Select indicator */}
                                        <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${currentQuestion.allowMultiple ? 'rounded-md' : 'rounded-full'
                                            } ${isSelected ? 'border-hikari-orange bg-hikari-orange/10' : 'border-gray-300 dark:border-gray-600'
                                            }`}>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className={`bg-hikari-orange ${currentQuestion.allowMultiple ? 'w-3 h-3 rounded-[3px]' : 'w-2.5 h-2.5 rounded-full'}`}
                                                />
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-hikari-clay dark:border-white/15 text-hikari-text dark:text-white text-sm font-semibold transition-all duration-200 disabled:opacity-30 hover:border-hikari-orange/50"
                            >
                                <ArrowLeft size={16} />
                                Back
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!isAnswered}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
                  ${isAnswered
                                        ? 'bg-hikari-orange text-white shadow-md hover:brightness-110 active:scale-[0.98]'
                                        : 'bg-hikari-clay dark:bg-white/10 text-hikari-muted dark:text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {currentStep === TOTAL - 1 ? (
                                    <>
                                        <Brain size={16} />
                                        Analyse My Skin
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Reassurance line */}
                        <p className="text-center text-xs text-hikari-muted dark:text-gray-500 mt-6">
                            All data stays in your browser — nothing is stored or transmitted.
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SkinQuiz;
