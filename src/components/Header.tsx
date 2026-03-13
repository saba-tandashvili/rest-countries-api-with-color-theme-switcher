import Moon from "../images/moon.png";
import Sun from "../images/sun-24.png"

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <div className={!darkMode ? "header " : "header dark-shade-2"}>
      <h1>Where in the world?</h1>
      <button onClick={() => setDarkMode(!darkMode)} className={!darkMode ? "" : "dark-shade-2"}>
        <img src={!darkMode ? Moon : Sun} alt="" />
        {!darkMode ? "Dark Mode": "Light Mode"}
      </button>
    </div>
  );
}