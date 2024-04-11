import { useState, useEffect } from "react";

type TimerMode = "work" | "rest";

interface PomodoroTimerSettings {
  workDuration: number; // in minutes
  restDuration: number; // in minutes
  repetitions: number;
}

export const usePomodoroTimer = ({
  workDuration,
  restDuration,
  repetitions,
}: PomodoroTimerSettings) => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [secondsLeft, setSecondsLeft] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    setSecondsLeft(workDuration * 60);
    setCyclesCompleted(0);
    setMode("work");
  }, [workDuration, restDuration, repetitions]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && cyclesCompleted < repetitions) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => {
          if (seconds > 0) return seconds - 1;

          if (mode === "work") {
            setMode("rest");
            return restDuration * 60;
          } else {
            setMode("work");
            setCyclesCompleted((cycles) => cycles + 1);
            return workDuration * 60;
          }
        });
      }, 1000);
    } else if (
      !isActive &&
      secondsLeft !== 0 &&
      cyclesCompleted < repetitions
    ) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [
    isActive,
    mode,
    cyclesCompleted,
    secondsLeft,
    repetitions,
    restDuration,
    workDuration,
  ]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(workDuration * 60);
    setCyclesCompleted(0);
    setMode("work");
  };

  return {
    startTimer,
    stopTimer,
    resetTimer, // Expose the resetTimer function
    secondsLeft,
    mode,
    isActive,
    cyclesCompleted,
  };
};
