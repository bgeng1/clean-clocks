import { useState, useEffect, useRef } from "react";

interface timefaceProps {
  time: { seconds: number; minutes: number; hours: number };
}

export const Timeface: React.FC<timefaceProps> = ({ time }) => {
  const { seconds, minutes, hours } = time;
  const secondsAngle = 6 * seconds;
  const minutesAngle = 6 * minutes;
  const hoursAngle = 30 * hours;

  return (
    <div className="timeface">
      <div
        className="hours"
        style={{ transform: `rotateZ(${hoursAngle}deg)` }}
      ></div>
      <div
        className="minutes"
        style={{ transform: `rotateZ(${minutesAngle}deg)` }}
      ></div>
      <div
        className="seconds"
        style={{ transform: `rotateZ(${secondsAngle}deg)` }}
      ></div>
      <div className="dot" />
    </div>
  );
};
