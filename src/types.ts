export enum EActionTypes {
    START = 'START',
    PAUSE = 'PAUSE',
    COMPLEAT = 'COMPLEAT',
    SET_TIME = 'SET_TIME',
    TIME_FINISHED = 'TIME_FINISHED'
}

export interface ITimerState {
    status: 'idle' | 'started' | 'paused' | 'finished';
    time: string | null;
    firstSetTime: string | null;
}
