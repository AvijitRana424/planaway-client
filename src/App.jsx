import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import TripPlannerPage from "./pages/TripPlannerPage";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [initialDestination, setInitialDestination] = useState("");
  const [initialTab, setInitialTab] = useState("chat");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const goToPlanner = ({ destination = "", tab = "chat" }) => {
    setInitialDestination(destination);
    setInitialTab(tab);
    setPage("planner");
  };

  return (
    <div className="app">
      {page === "landing" ? (
        <LandingPage onStart={goToPlanner} theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <TripPlannerPage
          initialDestination={initialDestination}
          initialTab={initialTab}
          onBack={() => setPage("landing")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}
