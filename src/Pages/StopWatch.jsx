import React, { useState, useRef, useEffect } from "react";
import "../Style/StopWatch.css";
import Crunches from "../Img/Crunches.gif";
import Plank from "../Img/plank-up-down.gif";
import Cycle from "../Img/cycle.gif";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showGymOptions, setShowGymOptions] = useState(false);
  const [workoutType, setWorkoutType] = useState("");
  const [weight, setWeight] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const intervalRef = useRef(null);

  const calculateCaloriesBurned = (time) => {
    let calories = 0;
    const timeInMinutes = time / 60000;
    const userWeight = parseFloat(weight);

    if (workoutType === "plank") {
      if (userWeight >= 50 && userWeight <= 60) {
        calories = 2 * timeInMinutes;
      } else if (userWeight > 60 && userWeight <= 75) {
        calories = (3 + Math.random()) * timeInMinutes;
      } else if (userWeight > 75) {
        calories = (4 + Math.random()) * timeInMinutes;
      }
    } else if (workoutType === "cycling") {
      const averageCaloriesPerHour = 716;
      const caloriesPerMinute = averageCaloriesPerHour / 60;
      calories = caloriesPerMinute * timeInMinutes;
    } else if (workoutType === "crunches") {
      const caloriesPerMinute = 5;
      calories = caloriesPerMinute * timeInMinutes;
    }

    setCaloriesBurned(calories.toFixed(2));
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const newElapsedTime = currentTime - startTime;
        setElapsedTime(newElapsedTime);
        calculateCaloriesBurned(newElapsedTime);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isRunning, elapsedTime]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setShowGymOptions(true);
    setWorkoutType("");
    setWeight("");
    setCaloriesBurned(0);
  };

  const handleWorkoutTypeChange = (e) => {
    setWorkoutType(e.target.value);
    setWeight("");
    setIsRunning(false);
    setElapsedTime(0);
    setCaloriesBurned(0);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    calculateCaloriesBurned(elapsedTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h2 className="stopwatch-heading">Fitness Stopwatch</h2>
      <div className="stopwatch-time-wrapper">
        <p className="stopwatch-time">{formatTime(elapsedTime)}</p>
      </div>
      <div className="stopwatch-buttons">
        {isRunning ? (
          <button className="stopwatch-button stop" onClick={stopStopwatch}>
            Stop
          </button>
        ) : (
          <button className="stopwatch-button start" onClick={startStopwatch}>
            Start
          </button>
        )}
        <button className="stopwatch-button reset" onClick={resetStopwatch}>
          Reset
        </button>
      </div>

      <div className="gym-section">
        <h3 className="gym-section-title" onClick={() => setShowGymOptions(!showGymOptions)}>
          Select Workout
        </h3>

        {showGymOptions && (
          <div className="gym-options">
            <label htmlFor="workoutType" className="gym-label">
              Workout Type:
            </label>
            <select
              id="workoutType"
              value={workoutType}
              onChange={handleWorkoutTypeChange}
              className="workout-select"
            >
              <option value="">-- Choose Workout --</option>
              <option value="plank">Plank</option>
              <option value="cycling">Cycling</option>
              <option value="crunches">Crunches</option>
            </select>

            {workoutType && (
              <>
                <input
                  type="number"
                  placeholder="Enter weight (kg)"
                  value={weight}
                  onChange={handleWeightChange}
                  className="form-control weight-input"
                  min={0}
                />

                <p className="calories-info">
                  Calories burned: {caloriesBurned} kcal
                </p>

                <img
                  src={workoutType === "plank" ? Plank : workoutType === "cycling" ? Cycle : Crunches}
                  alt={`${workoutType} workout`}
                  className="workout-gif"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
