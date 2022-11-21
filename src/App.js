import { useEffect } from "react";
import { useDefaultProvider } from "./contexts/default";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Burn from "./pages/Burn";
import Header from "./components/Header";
import setBodyColor from "./setBodyColor";

function App() {
  const { setIsMobile, darkmode, setDarkmode } = useDefaultProvider();

  darkmode
    ? setBodyColor({ color: "lightgray" })
    : setBodyColor({ color: "#252525" });

  function handleResize() {
    window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkmode(!darkmode);
    }
  }, []);

  handleResize();
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Burn />} />
      </Routes>
    </div>
  );
}

export default App;