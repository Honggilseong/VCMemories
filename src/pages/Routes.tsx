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
import MainForumPage from "./MainForumPage";
import BoardPostDetailPage from "./BoardPostDetailPage";
import CreateBoardPostPage from "./CreateBoardPostPage";
import ForumUserInfo from "./ForumUserInfo";
import BoardPostEditPage from "./BoardPostEditPage";

function Routes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <ReactRouterRoutes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/search/:username" element={<UserProfilePage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsconditions" element={<TermsConditions />} />
        <Route path="/usersettings" element={<UserSettings />} />
        <Route path="/explore/hashtags/:hashtag" element={<HashtagPage />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/forum/vrchat" element={<MainForumPage />} />
        <Route path="/forum/:id/create" element={<CreateBoardPostPage />} />
        <Route path="/forum/:id/edit" element={<BoardPostEditPage />} />
        <Route
          path="/forum/:channel/:boardpostid"
          element={<BoardPostDetailPage />}
        />
        <Route path="/forum/userinfo/:username" element={<ForumUserInfo />} />
        <Route path="*" element={<PageNotFound />} />
      </ReactRouterRoutes>
    </AnimatePresence>
  );
}

export default Routes;
