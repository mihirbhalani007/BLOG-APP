import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useDisableScrollbarOnNavigation() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [location]);
}
