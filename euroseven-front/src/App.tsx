import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { UserHomePage } from "./pages/user/UserHomePage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { IncasariHomePage } from "./pages/incasari/IncasariHomePage";
import { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { CustomErrorPage } from "./pages/Error500";
import { InformationPage } from "./pages/InformationPage";
import CookieConsent from "react-cookie-consent";

function App() {
  const authenticated = useSelector(
    (state: RootState) => state.authentication.authenticated
  );
  const navigate = useNavigate(); // if you're using react-router

  useEffect(() => {
    if (
      !authenticated &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/test"
    ) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const removeFromLocalStorage = () => {
    localStorage.removeItem("selectedTab");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", removeFromLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", removeFromLocalStorage);
    };
  }, []);

  return (
    <div className="App">
      <div className="content">
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="myAwesomeCookieName"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          Folosim cookie-uri pentru a îmbunătăți experiența de navigare și
          pentru a analiza traficul pe site.
        </CookieConsent>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/test" element={<InformationPage />} />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute roleName="ROLE_ADMIN">
                <AdminHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/incasari/home"
            element={
              <ProtectedRoute roleName="ROLE_INCASARI">
                <IncasariHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/home"
            element={
              <ProtectedRoute roleName="ROLE_USER">
                <UserHomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/error500" element={<CustomErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
