import {
  Route,
  Routes as ReactRouterRoutes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "../hooks/ProtectedRoute";
import AuthPage from "./AuthPage";
import HashtagPage from "./HashtagPage";
import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import PageNotFound from "./PageNotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import ProfilePage from "./ProfilePage";
import TermsConditions from "./TermsConditions";
import UserProfilePage from "./UserProfilePage";
import UserSettings from "./UserSettings";

function Routes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <ReactRouterRoutes location={location} key={location.pathname}>
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
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </ReactRouterRoutes>
    </AnimatePresence>
  );
}

export default Routes;
