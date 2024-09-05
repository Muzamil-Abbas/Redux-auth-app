import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signout"
            element={
              <ProtectedRoute>
                <SignOut />
              </ProtectedRoute>
            }
          />
          {/* Fallback route for 404 - Not Found */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
