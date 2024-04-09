import React, { useState } from "react";
import {
  Typography,
  Button,
  CircularProgress,
  Box,
  TextField,
  Card,
} from "@mui/material";
import { usePomodoroTimer } from "./usePomodoroTimer";

const App: React.FC = () => {
  const [workDuration, setWorkDuration] = useState(15);
  const [restDuration, setRestDuration] = useState(5);
  const [repetitions, setRepetitions] = useState(3);

  const {
    startTimer,
    stopTimer,
    secondsLeft,
    mode,
    isActive,
    cyclesCompleted,
  } = usePomodoroTimer({ workDuration, restDuration, repetitions });

  const progress =
    mode === "work"
      ? ((workDuration * 60 - secondsLeft) / (workDuration * 60)) * 100
      : ((restDuration * 60 - secondsLeft) / (restDuration * 60)) * 100;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f8ee",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card
        variant="outlined"
        style={{
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "30px",
        }}
      >
        <Typography variant="h2" gutterBottom>
          React Pomodoro
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={isActive ? stopTimer : startTimer}
        >
          {isActive ? "Stop" : "Start"}
        </Button>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={200}
            style={{
              color: mode === "work" ? "#1976d2" : "#4caf50",
            }}
          />
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Box
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="h5" color="textSecondary">
                {Math.floor(secondsLeft / 60)}:
                {String(secondsLeft % 60).padStart(2, "0")}
              </Typography>
            </Box>
            <Box
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="subtitle1" color="textSecondary">
                Mode: {mode.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          Cycles Completed: {cyclesCompleted} / {repetitions}
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Work Duration (minutes):</Typography>
          <TextField
            type="number"
            value={workDuration}
            onChange={(e) => setWorkDuration(parseInt(e.target.value))}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Rest Duration (minutes):</Typography>
          <TextField
            type="number"
            value={restDuration}
            onChange={(e) => setRestDuration(parseInt(e.target.value))}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Repetitions:</Typography>
          <TextField
            type="number"
            value={repetitions}
            onChange={(e) => setRepetitions(parseInt(e.target.value))}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default App;
