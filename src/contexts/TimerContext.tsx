import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { DEFAULT_INPUT_VALUE } from "../constants";
import { getActions, initialState, reducer } from "../reducer";
import { ITimerState } from "../types";
import { decreaseTimerBySecond } from "../utils";

export const CounterContext = createContext<{
  state: ITimerState;
  actions: ReturnType<typeof getActions>;
}>({
  state: initialState,
  actions: {} as ReturnType<typeof getActions>,
});

interface Props {
  children: React.ReactNode;
}

export const CounterContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => {
    return getActions(dispatch);
  }, [dispatch]);

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (state.status === "started") {
      timerId = setTimeout(() => {
        if (state.time) {
          const time = decreaseTimerBySecond(state.time);
          actions.setTime(time);

          if (time === DEFAULT_INPUT_VALUE) {
            actions.timeFinished();
          }
        }
      }, 1000);
    }

    if (timerId) {
      return () => {
        clearInterval(timerId);
      };
    }
  }, [state]);

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

export const useTimerState = () => {
  return useContext(CounterContext);
};
