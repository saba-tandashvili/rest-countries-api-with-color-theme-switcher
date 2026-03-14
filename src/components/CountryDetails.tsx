import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Moon from "../images/moon.png";
import Sun from "../images/sun-24.png";

import ArrowWhite from "../images/arrowLeftWhite.png";
import ArrowBlack from "../images/arrowLeftBlack.png";
import { Link } from "react-router-dom";

interface Countryies {
  name: {
    common: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
  topLevelDomain: string;
}

export default function CountryDetails() {
  const { countryName } = useParams();
  const [darkMode, setDarkMode] = useState(true);
  const [countries, setCountries] = useState<Countryies[]>([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => console.log(err));
  }, [countryName]);

  const country =
    countries.find(
      (p) => p.name.common.toLowerCase() === countryName?.toLowerCase(),
    ) || countries[0];

  if (!country) {
    return <div>Loading...</div>;
  }

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
            <h1 className="name">{country.name.common}</h1>

            <div className="specifics">
              <div className="left">
                <p>
                  Native Name:{" "}
                  <span>
                    {Object.values(country.name.nativeName ?? {})[0]?.common}
                  </span>
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
                  Capital: <span>{country.capital?.[0]}</span>
                </p>
              </div>
              <div className="right">
                <p>
                  Top Level Domain: <span>{country.topLevelDomain}</span>
                </p>
                <p>
                  Currencies:{" "}
                  <span>
                    {Object.values(country.currencies ?? {})[0]?.name}
                  </span>
                </p>
                <p>
                  Languages:{" "}
                  <span className="languages">
                    {Object.values(country.languages ?? {}).join(", ")}
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
        </div>
      </div>
    </div>
  );
}
