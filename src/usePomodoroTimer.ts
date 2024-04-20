import { useState, useEffect } from "react";

type TimerMode = "work" | "rest";
interface PomodoroTimerSettings {
  workDuration: number; // in seconds
  restDuration: number; // in seconds
  repetitions: number;
}

export const usePomodoroTimer = ({
  workDuration,
  restDuration,
  repetitions,
}: PomodoroTimerSettings) => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [secondsLeft, setSecondsLeft] = useState(workDuration);
  const [isActive, setIsActive] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); // New state to track completion

  useEffect(() => {
    setSecondsLeft(workDuration);
    setCyclesCompleted(0);
    setMode("work");
    setIsCompleted(false); // Reset completion state when settings change
  }, [workDuration, restDuration, repetitions]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && cyclesCompleted < repetitions) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => {
          if (seconds > 0) return seconds - 1;

          if (mode === "work") {
            setMode("rest");
            return restDuration;
          } else {
            if (cyclesCompleted + 1 < repetitions) {
              setMode("work");
              setCyclesCompleted((cycles) => cycles + 1);
              return workDuration;
            } else {
              // Mark as completed without resetting immediately
              setIsActive(false);
              setIsCompleted(true);
              return 0; // Stop the timer
            }
          }
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [
    isActive,
    mode,
    cyclesCompleted,
    repetitions,
    restDuration,
    workDuration,
  ]);

  const startTimer = () => {
    if (isCompleted) {
      // Reset the timer before starting again if it was completed
      resetTimer();
    }
    setIsActive(true);
  };

  const stopTimer = () => setIsActive(false);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(workDuration);
    setCyclesCompleted(0);
    setMode("work");
    setIsCompleted(false); // Also reset the completion state
  };

  return {
    startTimer,
    stopTimer,
    resetTimer,
    secondsLeft,
    mode,
    isActive,
    cyclesCompleted,
    isCompleted, // Expose the new state to indicate completion
  };
};
