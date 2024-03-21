import { useEffect } from "react";

export default function useKeyPress(key: KeyboardEvent["key"], onKeyPressed: (e: KeyboardEvent) => {}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) onKeyPressed(e);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, onKeyPressed]);

  return {};
}
