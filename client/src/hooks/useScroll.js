import { useEffect } from "react";

const useScroll = ({ onScroll }) => {
  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [onScroll]);
};

export default useScroll;
