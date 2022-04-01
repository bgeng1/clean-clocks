import { useState, useEffect, useRef, useCallback } from "react";
import { Timeface } from "./Timeface";

interface clockProps {
  timeZone: string;
}

interface timeData {
  seconds: number;
  minutes: number;
  hours: number;
}

const Clock: React.FC<clockProps> = ({ timeZone }) => {
  //do we want refs for these?
  const locales = "en-us";
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "medium",
    timeZone,
  };
  const getTimeString = (): string =>
    new Date().toLocaleTimeString(locales, options);

  const getTimePart = (part: "second" | "minute" | "hour"): number => {
    const partOptions: Intl.DateTimeFormatOptions = {
      [part]: "numeric",
      timeZone,
    };
    return parseInt(new Date().toLocaleTimeString(locales, partOptions));
  };

  const [time, setTime] = useState<string>(getTimeString());
  let rafId = useRef<number>();
  let timeData = useRef<timeData>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const animate = useCallback(() => {
    timeData.current = {
      seconds: getTimePart("second"),
      minutes: getTimePart("minute"),
      hours: getTimePart("hour"),
    };
    setTime(getTimeString());
    rafId.current = requestAnimationFrame(animate);
  }, [timeZone]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => {
      rafId.current && cancelAnimationFrame(rafId.current);
    };
  }, [timeZone]);

  return (
    <div data-testid="clock">
      <p>{time}</p>
      <Timeface time={timeData.current} />
    </div>
  );
};

export default Clock;
