import { useState, useRef, useEffect } from "react";
import { SEPARATOR, DEFAULT_INPUT_VALUE } from "../constants";

interface ITimeInputProps {
  valueRef: React.MutableRefObject<string | null>;
}

const TimeInput: React.FC<ITimeInputProps> = ({ valueRef }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastPressedKeyRef = useRef<string | null>(null);
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) =>
    (lastPressedKeyRef.current = event.key);

  const getStartPosition = () => inputRef.current!.selectionStart!;

  const [time, setTime] = useState(DEFAULT_INPUT_VALUE);

  const getAreSelectedPositionsSame = () => {
    if (
      inputRef.current?.selectionStart !== null &&
      inputRef.current?.selectionEnd !== null
    ) {
      return (
        inputRef.current!.selectionStart === inputRef.current!.selectionEnd
      );
    }
    return false;
  };

  const moveSelectionToRight = (startPosition = getStartPosition()) => {
    inputRef.current!.selectionStart = startPosition;
    inputRef.current!.selectionEnd = startPosition + 1;
  };

  const moveSelectionToLeft = (startPosition = getStartPosition()) => {
    inputRef.current!.selectionStart = startPosition - 1;
    inputRef.current!.selectionEnd = startPosition;
  };

  const moveRightIfSeparator = (selectedPosition = getStartPosition()) => {
    const selectedItem = time.slice(selectedPosition, selectedPosition + 1);

    if (selectedItem === SEPARATOR) {
      moveSelectionToRight(selectedPosition + 1);
    }
  };

  const moveLeftIfSeparator = (selectedPosition = getStartPosition()) => {
    const selectedItem = time.slice(selectedPosition - 1, selectedPosition);

    if (selectedItem === SEPARATOR) {
      moveSelectionToLeft(selectedPosition - 1);
    }
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const selectedPosition = getStartPosition();

    if (event.key === "ArrowRight") {
      moveSelectionToRight();
      moveRightIfSeparator(selectedPosition);
    } else if (event.key === "ArrowLeft") {
      moveSelectionToLeft();
      moveLeftIfSeparator(selectedPosition);
    }
  };

  const setSelectionIfNotSelected = () => {
    const startPosition = getStartPosition();
    const positionsAreTheSame = getAreSelectedPositionsSame();

    if (positionsAreTheSame) {
      if (startPosition === time.length) {
        moveSelectionToLeft();
      } else {
        moveSelectionToRight();
        moveRightIfSeparator();
      }
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target;
    const value = target.value;
    const isRemove = lastPressedKeyRef.current === "Backspace";

    const newTime = value
      .replace(/\D/g, "")
      .padEnd(6, "0")
      .replace(/(\d{2})/, `$1${SEPARATOR}`)
      .replace(/(\d{2}):(\d{2})/, `$1${SEPARATOR}$2${SEPARATOR}`)
      .replace(/(\d{2}):(\d{2}):(\d{2})/, `$1${SEPARATOR}$2${SEPARATOR}$3`);

    const startPosition = getStartPosition();

    queueMicrotask(() => {
      if (isRemove) {
        moveSelectionToLeft(startPosition);
        moveLeftIfSeparator(startPosition);
      } else {
        moveSelectionToRight();
        moveRightIfSeparator();
      }

      setSelectionIfNotSelected();
    });

    setTime(newTime);
  };

  useEffect(() => {
    valueRef.current = time;
  }, [time]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={time}
      maxLength={8}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onClick={setSelectionIfNotSelected}
      onChange={handleChange}
    />
  );
};

export default TimeInput;
