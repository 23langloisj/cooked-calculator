"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getScoreColor } from "@/lib/cooked-logic";
import { questions } from "@/lib/questions";

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [sliderValue, setSliderValue] = useState(66);
  const [allAnswers, setAllAnswers] = useState<{ q: string; a: string }[]>([]);

  // States from AI Response
  const [score, setScore] = useState(0);
  const [label, setLabel] = useState("Analyzing...");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isFinished || roast !== "") return;

    const getFinalVerdict = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/roast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ allAnswers }),
        });

        const data = await res.json();
        setScore(data.score || 50);
        setRoast(data.roast || "You're so cooked the AI is speechless.");
        setLabel(data.label || "Cooked Specimen");
      } catch (err) {
        setRoast("You're so cooked the server literally melted. 🍳");
        setLabel("Finished");
      } finally {
        setLoading(false);
      }
    };

    getFinalVerdict();
  }, [isFinished, allAnswers, roast]);

  const handleNext = (answerLabel: string) => {
    const newAnswers = [
      ...allAnswers,
      { q: questions[currentStep].question, a: answerLabel },
    ];
    setAllAnswers(newAnswers);
    setUserInput("");
    // Reset slider to a sensible default or the min of the next question if it's a slider
    setSliderValue(66);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const shareOnX = () => {
    const text = `I just got a ${score}/100 on the Cooked Calculator. Status: ${label.toUpperCase()}. \n\nCheck yours here:`;
    const url = window.location.origin;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-zinc-500 text-xs font-black uppercase tracking-widest">
                Step {currentStep + 1} / {questions.length}
              </span>
              <div className="h-1.5 w-24 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-orange-500"
                  animate={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-8 leading-tight tracking-tight">
              {currentQuestion.question}
            </h2>

            <div className="flex flex-col gap-3">
              {currentQuestion.type === "select" ? (
                currentQuestion.options?.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleNext(opt.label)}
                    className="w-full p-5 text-left bg-zinc-800/40 hover:bg-orange-600 border border-zinc-700 hover:border-orange-400 rounded-2xl font-bold text-zinc-200 hover:text-white transition-all duration-200"
                  >
                    {opt.label}
                  </button>
                ))
              ) : currentQuestion.type === "slider" ? (
                <div className="flex flex-col gap-6 py-4">
                  <div className="text-center">
                    <span className="text-6xl font-black text-orange-500 italic tracking-tighter">
                      {currentQuestion.id === "height"
                        ? `${Math.floor(sliderValue / 12)}'${sliderValue % 12}"`
                        : `${sliderValue}${currentQuestion.unit || ""}`}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={currentQuestion.step}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />

                  <button
                    onClick={() => {
                      const displayVal =
                        currentQuestion.id === "height"
                          ? `${Math.floor(sliderValue / 12)}'${
                              sliderValue % 12
                            }"`
                          : `${sliderValue}${currentQuestion.unit || ""}`;
                      handleNext(displayVal);
                    }}
                    className="w-full p-4 bg-orange-600 text-white font-black rounded-2xl uppercase italic tracking-widest mt-4"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <input
                    autoFocus
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && userInput && handleNext(userInput)
                    }
                    placeholder={currentQuestion.placeholder}
                    className="w-full p-5 bg-black border border-zinc-700 rounded-2xl text-white focus:border-orange-500 outline-none transition-all"
                  />
                  <button
                    disabled={!userInput}
                    onClick={() => handleNext(userInput)}
                    className="w-full p-4 bg-orange-600 disabled:opacity-50 text-white font-black rounded-2xl uppercase italic tracking-widest"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-zinc-900 rounded-[3rem] border-2 border-orange-500 shadow-[0_0_60px_rgba(255,69,0,0.15)]"
          >
            <h2 className="text-zinc-500 font-black uppercase tracking-[0.2em] text-xs">
              The Verdict
            </h2>
            <div
              className={`text-6xl font-black uppercase italic my-4 tracking-tighter ${getScoreColor(
                score
              )}`}
            >
              {label}
            </div>

            <div className="inline-block px-4 py-1 bg-zinc-800 rounded-full text-zinc-400 font-bold text-sm mb-8">
              Score: {score}/100
            </div>

            <div className="p-6 bg-black/40 rounded-3xl border border-zinc-800 text-left mb-8">
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-3">
                AI Roast Analysis
              </p>
              <div className="text-zinc-200 font-medium italic leading-relaxed text-lg">
                {loading ? (
                  <span className="animate-pulse opacity-50 text-zinc-500">
                    Judging your life choices...
                  </span>
                ) : (
                  `"${roast}"`
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={shareOnX}
                className="w-full p-4 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-colors uppercase italic tracking-tight"
              >
                Post to X
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full p-4 bg-zinc-800/50 text-zinc-500 font-bold rounded-2xl hover:text-white hover:bg-zinc-800 transition-colors"
              >
                Restart Test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
