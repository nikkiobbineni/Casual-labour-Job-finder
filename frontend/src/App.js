import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostedJobs from "./pages/PostedJobs";
import Profile from "./pages/Profile";
import RecentResponses from "./pages/RecentResponses";
import JobResponses from "./pages/JobResponses";
import NewJobpage1 from "./pages/NewJobpage1";
import NewJobpage2 from "./pages/NewJobpage2";
import JobDetails from "./pages/JobDetails";
import AllResponses from "./pages/AllResponses";
import AllJobs from "./pages/AllJobs";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/register":
        title = "";
        metaDescription = "";
        break;
      case "/posted-jobs":
        title = "";
        metaDescription = "";
        break;
      case "/profile":
        title = "";
        metaDescription = "";
        break;
      case "/recent-responses":
        title = "";
        metaDescription = "";
        break;
      case "/job-responses":
        title = "";
        metaDescription = "";
        break;
      case "/new-jobpage1":
        title = "";
        metaDescription = "";
        break;
      case "/new-jobpage2":
        title = "";
        metaDescription = "";
        break;
      case "/job-details":
        title = "";
        metaDescription = "";
        break;
      case "/all-responses":
        title = "";
        metaDescription = "";
        break;
      case "/all-jobs":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posted-jobs" element={<PostedJobs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recent-responses" element={<RecentResponses />} />
      <Route path="/job-responses/:jobID" element={<JobResponses />} />
      <Route path="/new-jobpage1" element={<NewJobpage1 />} />
      <Route path="/new-jobpage2/:jobId" element={<NewJobpage2 />} />
      <Route path="/job-details/:jobID" element={<JobDetails />} />
      <Route path="/all-responses" element={<AllResponses />} />
      <Route path="/all-jobs" element={<AllJobs />} />
    </Routes>
  );
}
export default App;
