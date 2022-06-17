import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
