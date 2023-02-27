import { useTimerState } from "../../contexts/TimerContext/TimerContext";
import { getPercentPassed } from "../../utils";
import classNames from "./timeIndicator.module.css";

const TimeIndicator = () => {
  const { state } = useTimerState();
  const percentPassed =
    state.firstSetTime &&
    state.time &&
    getPercentPassed(state.firstSetTime, state.time);

  return (
    <div className={classNames.wrapper}>
      <div
        className={classNames.indicator}
        style={{
          top: (percentPassed || 0) + "%",
        }}
      ></div>
    </div>
  );
};

export default TimeIndicator;
