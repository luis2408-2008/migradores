import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

// Initializing AOS
function AppWithAOS() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(<AppWithAOS />);
