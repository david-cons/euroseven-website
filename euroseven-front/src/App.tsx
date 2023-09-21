import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { UserHomePage } from "./pages/user/UserHomePage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { IncasariHomePage } from "./pages/incasari/IncasariHomePage";
import { useEffect } from "react";

function App() {
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<UserHomePage />} />
            <Route path="/admin/home" element={<AdminHomePage />} />
            <Route path="/incasari/home" element={<IncasariHomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
