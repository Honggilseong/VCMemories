import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import UserProfilePage from "./UserProfilePage";

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/:username" element={<UserProfilePage />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
