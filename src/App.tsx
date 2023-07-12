import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "./hooks/useAuth";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NewRequest from "./pages/NewRequest";

const App = () => {
  const { loaded, userData } = useAuth();

  const loadNonUserRoutes = useCallback(() => {
    if (!userData) {
      return (
        <>
          <Route path="/login" element={<LogIn/>} />
          <Route path="/signup" element={<SignUp/>}/>
        </>
      );
    }
  }, [userData]);

  if (loaded) {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/new-request"
            element={<NewRequest/>}
          />
          {loadNonUserRoutes()}
        </Routes>
      </Router>
    );
  }
  
  return null;
}

export default App;
