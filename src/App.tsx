import { useTimerState } from "./contexts/TimerContext";
import classNames from "./app.module.css";
import TimeInput from "./components/TimeInput";
import { useRef } from "react";
import { DEFAULT_INPUT_VALUE } from "./constants";
import { ReactComponent as PauseIcon } from "./assets/icons/pause-button.svg";
import { ReactComponent as PlayIcon } from "./assets/icons/play-circle.svg";
import { ReactComponent as StopIcon } from "./assets/icons/stop-button.svg";
import TimeIndicator from "./components/TimeIndicator/TimeIndicator";

const App = () => {
  const { state, actions } = useTimerState();
  const inputValueRef = useRef(null);

  const isStarted = state.status === "started";
  const isPaused = state.status === "paused";
  const isFinished = state.status === "finished";
  const isIdle = state.status === "idle";

  const handlePlayPause = () => {
    if (!isStarted) {
      if (inputValueRef.current === DEFAULT_INPUT_VALUE) {
        alert("Fill the input");
        return;
      }

      actions.setTime(state.time || inputValueRef.current!);
      actions.start();
    } else {
      actions.pause();
    }
  };

  const handleStop = () => {
    actions.compleat();
  };

  return (
    <div className={classNames.App}>
      <TimeIndicator />

      <div className={classNames.timerInputContainer}>
        {!state.time ? <TimeInput valueRef={inputValueRef} /> : state.time}
      </div>
      <div className={classNames.actionBarContainer}>
        <button
          disabled={isFinished}
          className={classNames.actionButtonContainer}
          onClick={handlePlayPause}
        >
          {isStarted ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          className={classNames.actionButtonContainer}
          onClick={handleStop}
          disabled={isIdle}
        >
          <StopIcon />
        </button>
      </div>
    </div>
  );
};

export default App;
