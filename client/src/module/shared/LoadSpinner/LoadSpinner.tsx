import { useState, CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

interface LoadSpinnerProps {
  load_Spinner: boolean
};

function LoadSpinner(props: LoadSpinnerProps): JSX.Element {

  return (
    <div className="sweet-loading">
      <BeatLoader
        loading={props.load_Spinner}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadSpinner;