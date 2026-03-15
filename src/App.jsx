import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import TripPlannerPage from "./pages/TripPlannerPage";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [initialDestination, setInitialDestination] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const goToPlanner = (destination = "") => {
    setInitialDestination(destination);
    setPage("planner");
  };

  return (
    <div className="app">
      {page === "landing" ? (
        <LandingPage onStart={goToPlanner} theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <TripPlannerPage
          initialDestination={initialDestination}
          onBack={() => setPage("landing")}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </div>
  );
}
