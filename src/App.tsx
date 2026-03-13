import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content darkMode={darkMode} />
    </div>
  );
}
