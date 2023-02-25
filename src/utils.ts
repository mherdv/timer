import { SEPARATOR } from "./constants"

const setMinTwoDigits = (n: number) => {
    return (n < 10 ? '0' : '') + n;
}

export const decreaseTimerBySecond = (time: string) => {
    let [hours, minutes, seconds] = time.split(SEPARATOR);

    if ((hours !== '00' || minutes !== '00') && seconds === '00') {
        seconds = '59';
        if (hours !== '00' && minutes === "00") {
            minutes = '59';

            hours = setMinTwoDigits(parseInt(hours) - 1);
        } else if (minutes !== "00") {
            minutes = setMinTwoDigits(parseInt(minutes) - 1);
        }
    } else if (seconds !== '00') {
        seconds = setMinTwoDigits(parseInt(seconds) - 1);
    }

    return `${hours}${SEPARATOR}${minutes}${SEPARATOR}${seconds}`
}

export const getPercentPassed = (str1: string, str2: string) => {
    let parts1 = str1.split(':');
    let parts2 = str2.split(':');
    let totalSeconds1 = (+parts1[0]) * 60 * 60 + (+parts1[1]) * 60 + (+parts1[2]);
    let totalSeconds2 = (+parts2[0]) * 60 * 60 + (+parts2[1]) * 60 + (+parts2[2]);
    let diff = totalSeconds1 - totalSeconds2;
    let percent = (diff / totalSeconds1) * 100;
    return percent.toFixed(2);
}