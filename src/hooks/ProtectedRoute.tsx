import { useEffect } from "react";
import { useInternalRouter } from "../pages/routing";

function ProtectedRoute({ children }: any) {
  const authUser = localStorage.getItem("profile") ?? "";
  const { push } = useInternalRouter();

  useEffect(() => {
    if (!authUser) {
      push("/auth");
    }
  }, []);
  return children;
}

export default ProtectedRoute;
