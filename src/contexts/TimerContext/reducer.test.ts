import { EActionTypes, ITimerState } from "../../types";
import { IAction, initialState, reducer } from "./reducer";

describe('Timer Reducer', () => {
    let state: ITimerState;
    let action: IAction;

    beforeEach(() => {
        state = {
            ...initialState,
        }
        action = {
            type: EActionTypes.COMPLEAT,
        }
    });

    it('should return the initial state', () => {
        const expectedState = {
            status: 'idle',
            time: null,
            firstSetTime: null,
        };
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should start the timer and set firstSetTime to time', () => {
        action.type = EActionTypes.START;
        const newState = { ...state, time: '10:10:10', firstSetTime: null };
        const expectedState = {
            status: 'started',
            time: '10:10:10',
            firstSetTime: '10:10:10',
        };
        expect(reducer(newState, action)).toEqual(expectedState);
    });

    it('should pause the timer', () => {
        action.type = EActionTypes.PAUSE;
        const expectedState = {
            status: 'paused',
            time: null,
            firstSetTime: null,
        };
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should finish the timer', () => {
        action.type = EActionTypes.TIME_FINISHED;
        const expectedState = {
            status: 'finished',
            time: null,
            firstSetTime: null,
        };
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should complete the timer', () => {
        const expectedState = {
            status: 'idle',
            time: null,
            firstSetTime: null,
        };
        expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should set the timer', () => {
        action.type = EActionTypes.SET_TIME;
        action.payload = { time: '10:10:10' };
        const expectedState = {
            status: 'idle',
            time: '10:10:10',
            firstSetTime: null,
        };
        expect(reducer(state, action)).toEqual(expectedState);
    });
});