export const config = {
  theme: {
    default: "light",
  },
  nav: {
    logoText: "MyScanner",
    logoIcon: "✈️",
    links: [
      { label: "Cheap Flights", id: "flights" },
      { label: "AI Trip Planner", id: "trip-planner" },
    ],
    primaryButton: "Sign in",
  },
  hero: {
    badge: {
      text: "Trusted by Millions",
      icon: "🛡️",
    },
    titleLine1: "Find the cheapest flights",
    titleLine2: "to anywhere.",
    subtitle: "Compare prices across 100+ airlines. AI-powered recommendations to save you time and money.",
    searchPlaceholderDestinations: [
      "New York, USA", 
      "London, UK", 
      "Tokyo, Japan", 
      "Dubai, UAE", 
      "Paris, France"
    ],
    searchButtonText: "Plan my trip",
    quickChips: ["Cheap flights to Europe", "Weekend getaways", "Last minute deals", "Direct flights only"],
  },
  features: [
    { icon: "✈️", title: "Best Flight Deals", desc: "We compare thousands of airlines and travel sites to find you the absolute lowest fares." },
    { icon: "🛡️", title: "No Hidden Fees", desc: "The price you see is the price you pay. Enjoy fully transparent pricing with zero surprise charges." },
    { icon: "🤖", title: "AI Trip Planner", desc: "Need a full itinerary? Tell us your destination and let our AI build your day-by-day plan instantly." },
    { icon: "🏨", title: "Hotel Matcher", desc: "Discover the best hotels perfectly matched to your travel style and budget." },
  ]
};
