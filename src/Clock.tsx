import { useState, useEffect, useRef } from "react";
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

  const [time, setTime] = useState<string>(getTimeString());
  let intervalId = useRef<number>();
  let timeData = useRef<timeData>({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const getTimePart = (part: "second" | "minute" | "hour"): number => {
    const partOptions: Intl.DateTimeFormatOptions = {
      [part]: "numeric",
      timeZone,
    };
    return parseInt(new Date().toLocaleTimeString(locales, partOptions));
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime(getTimeString());
      timeData.current = {
        seconds: getTimePart("second"),
        minutes: getTimePart("minute"),
        hours: getTimePart("hour"),
      };
    }, 1000);

    return () => {
      console.log("clearing interval");

      clearInterval(intervalId.current);
    };
  }, [timeZone]);

  return (
    <>
      <p>{time}</p>
      <Timeface time={timeData.current} />
    </>
  );
};

export default Clock;
