import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";
import styles from "../Style/Timer.module.css";
import RingAudio from "../Audio/alarm.mp3";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const startTimer = () => {
    if (!isRunning && (hours > 0 || minutes > 0 || seconds > 0)) {
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;
      intervalRef.current = setInterval(() => {
        if (totalSeconds === 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIsCompleted(true);
          playAudio();
        } else {
          totalSeconds -= 1;
          setHours(Math.floor(totalSeconds / 3600));
          setMinutes(Math.floor((totalSeconds % 3600) / 60));
          setSeconds(totalSeconds % 60);
        }
      }, 1000);
      setIsRunning(true);
    }
  };

  const playAudio = () => {
    const audio = new Audio(RingAudio);
    audio.loop = true;
    audioRef.current = audio;
    audio.play();
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "hours") {
      setHours(Math.max(0, parseInt(value) || 0));
    } else if (name === "minutes") {
      setMinutes(Math.max(0, parseInt(value) || 0));
    } else if (name === "seconds") {
      setSeconds(Math.max(0, parseInt(value) || 0));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Timer</h2>
      <div className={styles.inputContainer}>
        <input
          type="number"
          name="hours"
          value={hours}
          onChange={handleChange}
          className={styles.input}
          placeholder="HH"
          min={0}
        />
        <input
          type="number"
          name="minutes"
          value={minutes}
          onChange={handleChange}
          className={styles.input}
          placeholder="MM"
          min={0}
        />
        <input
          type="number"
          name="seconds"
          value={seconds}
          onChange={handleChange}
          className={styles.input}
          placeholder="SS"
          min={0}
        />
      </div>
      <div className={styles.buttonContainer}>
        {!isRunning ? (
          <div onClick={startTimer} className={`${styles.iconButton} ${styles.startButton}`}>
            <FaPlay className={styles.icon} />
          </div>
        ) : (
          <div onClick={pauseTimer} className={`${styles.iconButton} ${styles.pauseButton}`}>
            <FaPause className={styles.icon} />
          </div>
        )}
        <div onClick={resetTimer} className={`${styles.iconButton} ${styles.resetButton}`}>
          <FaSync className={styles.icon} />
        </div>
      </div>
      {isCompleted && (
        <div className={styles.ring} onClick={() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }}>
          Timer Completed!
        </div>
      )}
      {!isCompleted && isRunning && (
        <div className={styles.doodleContainer}>
          <div className={styles.line}></div>
          <div className={styles.dot}></div>
        </div>
      )}
    </div>
  );
};

export default Timer;
