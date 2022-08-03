import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import ProtectedRoute from "../hooks/ProtectedRoute";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import UserProfilePage from "./UserProfilePage";

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/search/:username"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />
    </ReactRouterRoutes>
  );
}

export default Routes;
