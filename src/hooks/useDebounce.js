import { useEffect, useRef } from "react";

const useDebounce = (value, callback, delay = 1000) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      callback(value);
    }, delay);
    return () => {
      clearTimeout(ref.current);
    };
  }, [value, ref, callback, delay]);
};

export default useDebounce;
