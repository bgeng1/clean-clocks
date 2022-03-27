import { useState } from "react";
import "./App.css";
import { ClockComponent } from "./ClockComponent";

function App() {
  const [clocks, setClocks] = useState<Array<any>>([]);

  return (
    <div className="App">
      <p>What time is it in:</p>
      <div className="clocks-container">
        <ClockComponent />
        {clocks}
        <button
          onClick={() => {
            setClocks(clocks.concat(<ClockComponent />));
          }}
        >
          add new
        </button>
      </div>
    </div>
  );
}

export default App;
