import { useParams } from "react-router-dom";
import { useState } from "react";
import Data from "../data.json";
import Moon from "../images/moon.png";
import Sun from "../images/sun-24.png";

import ArrowWhite from "../images/arrowLeftWhite.png";
import ArrowBlack from "../images/arrowLeftBlack.png";
import { Link } from "react-router-dom";

export default function CountryDetails() {
  const { countryName } = useParams();
  const [darkMode, setDarkMode] = useState(true);

  const country =
    Data.find((p) => p.name.toLowerCase() === countryName?.toLowerCase()) ||
    Data[0];

  return (
    <div
      className={!darkMode ? "countryDetails" : "countryDetails dark-shade-1"}
    >
      <header
        className={
          !darkMode
            ? "country-details-header "
            : "country-details-header dark-shade-2"
        }
      >
        <h1>Where in the world?</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={!darkMode ? "" : "dark-shade-2"}
        >
          <img src={!darkMode ? Moon : Sun} alt="" />
          {!darkMode ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <div className="body">
        <div
          className="back-d"
          style={{ backgroundColor: darkMode ? "" : "#979797" }}
        >
          <Link className={!darkMode ? "back" : "dark-shade-2 back"} to={"/"}>
            <img src={!darkMode ? ArrowBlack : ArrowWhite} alt="" />
            Back
          </Link>
        </div>

        <div className="countrydetails">
          <img src={country.flags.svg} alt="" />
          <div className={darkMode ? "color-white details" : "details"}>
            <h1 className="name">{country.name}</h1>

            <div className="specifics">
              <div className="left">
                <p>
                  Native Name: <span>{country.nativeName}</span>
                </p>
                <p>
                  Population: <span>{country.population}</span>
                </p>
                <p>
                  Region: <span>{country.region}</span>
                </p>
                <p>
                  Sub Region: <span>{country.subregion}</span>
                </p>
                <p>
                  Capital: <span>{country.capital}</span>
                </p>
              </div>
              <div className="right">
                <p>
                  Top Level Domain: <span>{country.topLevelDomain}</span>
                </p>
                <p>
                  Currencies: <span>{country.currencies?.[0]?.name}</span>
                </p>
                <p>
                  Languages:{" "}
                  <span className="languages">
                    {country.languages?.map((lang) => lang.name).join(", ")}
                  </span>
                </p>
              </div>
            </div>

            <div className="border">
              <p>Border Countries:</p>
              {country.borders?.map((border) => (
                <div
                  key={border}
                  className={
                    !darkMode ? "border-div" : "border-div no-box dark-shade-2"
                  }
                >
                  <p>{border}</p>
                </div>
              ))}
            </div>
          </div>
          .
        </div>
      </div>
    </div>
  );
}
