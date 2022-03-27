import { useState } from "react";
import Clock from "./Clock";
import { zoneCodes } from "../timeZoneCodes";

export const ClockComponent = () => {
  const [zone, setZone] = useState<string>("UTC");

  const options = zoneCodes
    .sort(function (a, b) {
      var textA = a.city.toUpperCase();
      var textB = b.city.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    })
    .map((c) => {
      return (
        <option key={c.city} value={c.timeZone}>
          {c.city}
        </option>
      );
    });

  return (
    <div className="clock-component">
      <select
        onChange={(e) => {
          setZone(e.target.value);
          console.log(zone);
        }}
      >
        {options}
      </select>
      <Clock timeZone={zone} />
      <br />
    </div>
  );
};