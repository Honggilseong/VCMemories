import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
