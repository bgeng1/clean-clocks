import { useState, useEffect, useRef } from "react";
import { Timeface } from "./Timeface";

interface clockProps {
  timeZone: string;
}

const Clock: React.FC<clockProps> = ({ timeZone }) => {
  const [time, setTime] = useState(Date());
  let intervalId = useRef<number>();
  //do we want refs for these?
  const locales = "en-us";
  const options: Intl.DateTimeFormatOptions = {
    timeStyle: "medium",
    timeZone,
  };
  let timeData = useRef({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  //we can make this var even more type safe
  const getTimePart = (part: "second" | "minute" | "hour"): number => {
    const partOptions = {
      [part]: "numeric",
      timeZone,
    };
    return parseInt(new Date().toLocaleTimeString(locales, partOptions));
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime(new Date().toLocaleTimeString(locales, options));
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
