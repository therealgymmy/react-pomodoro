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
  const [workDuration, setWorkDuration] = useState(60);
  const [restDuration, setRestDuration] = useState(60);
  const [repetitions, setRepetitions] = useState(3);

  const {
    startTimer,
    stopTimer,
    resetTimer,
    secondsLeft,
    mode,
    isActive,
    cyclesCompleted,
  } = usePomodoroTimer({ workDuration, restDuration, repetitions });

  const progress =
    mode === "work"
      ? ((workDuration - secondsLeft) / workDuration) * 100
      : ((restDuration - secondsLeft) / restDuration) * 100;

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
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "30px",
          // width: "80%",
        }}
      >
        <Card
          variant="outlined"
          style={{
            padding: "10px",
            margin: "10px",
            marginBottom: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "30px",
            backgroundColor: "#f4e1e1",
            border: "4px solid #f9f8ee",
          }}
        >
          <Typography variant="h3">React Pomodoro</Typography>
        </Card>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={isActive ? stopTimer : startTimer}
          >
            {isActive ? "Stop" : "Start"}
          </Button>
          <Button variant="contained" color="secondary" onClick={resetTimer}>
            Reset
          </Button>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <Box
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "100px",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={progress}
              size={200}
              style={{
                color: mode === "work" ? "#1976d2" : "#4caf50",
                position: "absolute",
                zIndex: 2,
              }}
            />
            <CircularProgress
              variant="determinate"
              value={100}
              size={200}
              style={{
                color: "#ffffff",
                position: "absolute",
                zIndex: 1,
              }}
            />
            <Box
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "24px solid #f9f8ee",
                backgroundColor: "#f4e1e1",
                width: "160px",
                height: "160px",
              }}
            />
            <Box
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h5" color="textSecondary">
                {Math.floor(secondsLeft / 60)}:
                {String(secondsLeft % 60).padStart(2, "0")}
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
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <Typography variant="subtitle1" margin="10px">
              Work
            </Typography>
            <TextField
              type="number"
              value={workDuration}
              onChange={(e) => setWorkDuration(parseInt(e.target.value))}
              style={{ width: "80px" }}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <Typography variant="subtitle1" margin="10px">
              Rest
            </Typography>
            <TextField
              type="number"
              value={restDuration}
              onChange={(e) => setRestDuration(parseInt(e.target.value))}
              style={{ width: "80px" }}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <Typography variant="subtitle1" margin="10px">
              Reps
            </Typography>
            <TextField
              type="number"
              value={repetitions}
              onChange={(e) => setRepetitions(parseInt(e.target.value))}
              style={{ width: "80px" }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default App;
