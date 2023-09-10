import { useEffect, useRef } from 'react';

export const useOnValueChange = <T extends (arg) => void>(value: any, onValueChange?: T) => {
  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);
};

export const useOutsideClick = (callback: () => void) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnOutsideClick = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleOnOutsideClick);
    return () => {
      document.removeEventListener('click', handleOnOutsideClick);
    };
  }, [elementRef, callback]);

  return elementRef;
};
