import React, { useState } from 'react';
import IndianClock from '../Pages/IndianClock';
import Stopwatch from "../Pages/StopWatch";
import Timer from '../Pages/Timer';
import "../Style/Main.css";
import Footer from '../Component/Footer';

const ClockSlider = () => {
    const [selectedOption, setSelectedOption] = useState("IndianClock");

    const handleClockChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="clock-slider">
                <div className="clock-buttons">
                    <button 
                        className={`clock-button ${selectedOption === 'IndianClock' ? 'active' : ''}`} 
                        onClick={() => handleClockChange('IndianClock')}
                    >
                        Indian Clock
                    </button>
                    <button 
                        className={`clock-button ${selectedOption === 'Stopwatch' ? 'active' : ''}`} 
                        onClick={() => handleClockChange('Stopwatch')}
                    >
                        Stopwatch
                    </button>
                    <button 
                        className={`clock-button ${selectedOption === 'Timer' ? 'active' : ''}`} 
                        onClick={() => handleClockChange('Timer')}
                    >
                        Timer
                    </button>
                </div>
                <div className="clock-display">
                    {selectedOption === 'IndianClock' && <IndianClock />}
                    {selectedOption === 'Stopwatch' && <Stopwatch />}
                    {selectedOption === 'Timer' && <Timer />}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ClockSlider;
