import { NavigateOptions, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export function useInternalRouter() {
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      goBack() {
        navigate(-1);
      },
      push(path: any, options?: NavigateOptions) {
        navigate(path, options);
      },
    };
  }, [navigate]);
}
