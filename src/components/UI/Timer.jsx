import React, { useState, useEffect } from "react";

const Timer = ({ expiryDate }) => {
  const convertTime = (timeLeft) => {
    if (timeLeft < 0) return "Expired";
    const hoursLeft = Math.floor(timeLeft / 1000 / 60 / 60);
    const minutesLeft = Math.floor(timeLeft / 1000 / 60) % 60;
    const secondsLeft = Math.floor(timeLeft / 1000) % 60;
    return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
  };
  const [time, setTime] = useState(convertTime(expiryDate - Date.now()));
  useEffect(() => {
    setInterval(() => {
      setTime(convertTime(expiryDate - Date.now()));
    }, 1000);
  }, [expiryDate]);
  return <div className="de_countdown">{time}</div>;
};

export default Timer;
