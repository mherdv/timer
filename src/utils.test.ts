import { decreaseTimerBySecond, getPercentPassed } from "./utils";

describe("getPercentPassed", () => {
    test("should throw an error when the strings do not match the validationRegex", () => {
        expect(() => getPercentPassed("asdf", "asdf")).toThrowError(
            "Invalid string format"
        );
    });

    test("should return the percentage of the first time passed over the second time", () => {
        expect(getPercentPassed("00:10:30", "00:05:10")).toBe("50.79");
    });
    test("should return 0 if the first time is equal to the second time", () => {
        expect(getPercentPassed("00:10:30", "00:10:30")).toBe("0.00");
    });
    test("should return the correct percentage of the time passed equal to half", () => {
        expect(getPercentPassed("00:20:30", "00:10:15")).toBe("50.00");
    });
});

describe('decreaseTimerBySecond', () => {
    test('should throw error when invalid string format passed', () => {
        expect(() => decreaseTimerBySecond('12:30')).toThrowError('Invalid string format');
    });

    test('should decrease the seconds by 1 when seconds is not 00', () => {
        expect(decreaseTimerBySecond('00:00:59')).toEqual('00:00:58');
    });

    test('should decrease the minutes by 1 when seconds is 00 and minutes is not 00', () => {
        expect(decreaseTimerBySecond('00:01:00')).toEqual('00:00:59');
    });

    test('should decrease the hours by 1 when seconds and minutes are 00', () => {
        expect(decreaseTimerBySecond('01:00:00')).toEqual('00:59:59');
    });
    
    test('should decrease timer by 1 second when minutes are 0', () => {
        expect(decreaseTimerBySecond('00:00:01')).toBe('00:00:00');
    });

    test('should return the same if the value is 00:00:00', () => {
        expect(decreaseTimerBySecond('00:00:00')).toBe('00:00:00');
    });
});