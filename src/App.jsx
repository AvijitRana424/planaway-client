import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import TripPlannerPage from "./pages/TripPlannerPage";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [initialDestination, setInitialDestination] = useState("");

  const goToPlanner = (destination = "") => {
    setInitialDestination(destination);
    setPage("planner");
  };

  return (
    <div className="app">
      {page === "landing" ? (
        <LandingPage onStart={goToPlanner} />
      ) : (
        <TripPlannerPage
          initialDestination={initialDestination}
          onBack={() => setPage("landing")}
        />
      )}
    </div>
  );
}
