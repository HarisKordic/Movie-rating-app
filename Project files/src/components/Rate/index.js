import React, { useState } from "react";
import { Input } from "./Rate.styles";

const Rate = ({ callback }) => {
  const [value, setValue] = useState(5); //Start with rating 5;(lowest);

  return (
    <div>
      <Input>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <p>
          <button id="rateBtn" onClick={() => callback(value)}>
            Rate
          </button>
          {/*Has to be an inline func so it doesn't execute it mediately */}
        </p>
      </Input>
    </div>
  );
};

export default Rate;
