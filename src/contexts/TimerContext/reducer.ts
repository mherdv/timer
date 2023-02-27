import { EActionTypes, ITimerState } from "../../types";

export const initialState: ITimerState = {
    status: "idle",
    time: null,
    firstSetTime: null,
};

export interface IAction {
    type: EActionTypes;
    payload?: { time: ITimerState['time'] }
}


export const reducer = (state = initialState, action: IAction): ITimerState => {
    switch (action.type) {
        case EActionTypes.START:
            if (state.time === null) {
                return state;
            }

            return {
                ...state,
                status: 'started',
                firstSetTime: state.firstSetTime || state.time
            };
        case EActionTypes.PAUSE:
            return {
                ...state,
                status: 'paused'
            };
        case EActionTypes.TIME_FINISHED:
            return {
                ...state,
                status: 'finished'
            };
        case EActionTypes.COMPLEAT:
            return {
                ...initialState
            };
        case EActionTypes.SET_TIME:
            return {
                ...state,
                time: action.payload?.time || null
            };
        default:
            return state;
    }
};

export const getActions = (
    dispatch: React.Dispatch<IAction>
) => ({
    start: () => dispatch({ type: EActionTypes.START }),
    pause: () => dispatch({ type: EActionTypes.PAUSE }),
    compleat: () => dispatch({ type: EActionTypes.COMPLEAT }),
    setTime: (time: string) => dispatch({ type: EActionTypes.SET_TIME, payload: { time } }),
    timeFinished: () => dispatch({ type: EActionTypes.TIME_FINISHED })
});
