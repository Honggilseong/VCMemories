import { useEffect } from "react";
import { useState } from "react";
import { RefObject } from "react";
export const useIsTruncated = (element: RefObject<HTMLParagraphElement>) => {
  const determineIsTruncated = () => {
    if (!element.current) return false;
    return element.current.scrollHeight > element.current.clientHeight;
  };
  const [isTruncated, setIsTruncated] = useState(determineIsTruncated());
  useEffect(() => {
    const resizeListener = () => setIsTruncated(determineIsTruncated());
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [element]);
  return isTruncated;
};
