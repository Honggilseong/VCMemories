import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import AuthPage from "./AuthPage";

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/auth" element={<AuthPage />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
