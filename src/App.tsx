import { ReactElement, useEffect, useState, useRef } from "react";
import "./App.css";
import { ClockComponent } from "./ClockComponent";

interface deleteButtonProps {
  clocksRef: React.MutableRefObject<Array<ReactElement>>;
  id: number;
}

function App() {
  const [clocks, setClocks] = useState<Array<ReactElement>>([]);
  const clocksRef = useRef<Array<ReactElement>>(clocks);
  clocksRef.current = clocks;
  const keyCount = useRef<number>(0);

  const DeleteButton = ({ clocksRef, id }: deleteButtonProps) => {
    return (
      <button
        className="delete-button"
        onClick={() => {
          setClocks(clocksRef.current.filter((item) => item.key != id));
        }}
      >
        X
      </button>
    );
  };

  const DeleteContainer = ({ id }: { id: number }) => (
    <span>
      <DeleteButton clocksRef={clocksRef} id={id} />
      <ClockComponent />
    </span>
  );

  const addClock = () => {
    const id = keyCount.current++;
    setClocks([...clocks, <DeleteContainer key={id} id={id} />]);
  };

  useEffect(() => {
    addClock();
  }, []);

  return (
    <div className="App">
      <h1>Clean Clocks</h1>
      <p>What time is it in:</p>
      <div className="clocks-container">
        {clocks}
        <button onClick={() => addClock()} className="add-button">
          add new
        </button>
      </div>
    </div>
  );
}

export default App;
