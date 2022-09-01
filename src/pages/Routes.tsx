import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import ProtectedRoute from "../hooks/ProtectedRoute";
import AuthPage from "./AuthPage";
import HashtagPage from "./HashtagPage";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import ProfilePage from "./ProfilePage";
import TermsConditions from "./TermsConditions";
import UserProfilePage from "./UserProfilePage";
import UserSettings from "./UserSettings";

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
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/termsconditions" element={<TermsConditions />} />
      <Route
        path="/usersettings"
        element={
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore/hashtags/:hashtag"
        element={
          <ProtectedRoute>
            <HashtagPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </ReactRouterRoutes>
  );
}

export default Routes;
