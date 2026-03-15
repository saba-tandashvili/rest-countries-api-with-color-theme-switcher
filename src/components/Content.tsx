import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../images/search.png";
import DownArrow from "../images/down-arrow.png";
import SearchWhite from "../images/search-13-24.png";
import DownArrowWhite from "../images/arrow-204-24.png";
// import Data from "../data.json";

interface ContentProps {
  darkMode: boolean;
}

interface Countryies {
  name: {
    common: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  region: string;
  capital?: string[];
}

export default function Content({ darkMode }: ContentProps) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [regionList, setRegionList] = useState(false);
  const [countries, setCountries] = useState<Countryies[]>([]);

    useEffect(() => {
      fetch(`https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region`)
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
        })
        .catch((err) => console.log(err));
    });
  

  const filteredData = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (region === "" || country.region.toLowerCase() === region.toLowerCase()),
  ).slice(0, 8)

  return (
    <div className={darkMode ? "content dark-shade-1" : "content"}>
      <div className="top">
        <div className={`input ${!darkMode ? "" : "no-box"}`}>
          <img src={!darkMode ? Search : SearchWhite} alt="" />
          <input
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`inputz ${!darkMode ? "" : "dark-shade-2"}`}
          />
        </div>

        <div
          className={`region-list ${!darkMode ? "" : "dark-shade-2 no-box"}`}
        >
          <button
            onClick={() => setRegionList(!regionList)}
            className={!darkMode ? "" : "color-white"}
          >
            {region || "Filter by Region"}
          </button>
          <img src={!darkMode ? DownArrow : DownArrowWhite} alt="" />
          <div
            className={`regions ${!darkMode ? "" : "dark-shade-2 no-box"}`}
            style={{ display: regionList ? "" : "none" }}
          >
            <p
              onClick={() => {
                setRegion("Africa");
                setRegionList(false);
              }}
            >
              Africa
            </p>
            <p
              onClick={() => {
                setRegion("Americas");
                setRegionList(false);
              }}
            >
              Americas
            </p>
            <p
              onClick={() => {
                setRegion("Asia");
                setRegionList(false);
              }}
            >
              Asia
            </p>
            <p
              onClick={() => {
                setRegion("Europe");
                setRegionList(false);
              }}
            >
              Europe
            </p>
            <p
              onClick={() => {
                setRegion("Oceania");
                setRegionList(false);
              }}
            >
              Oceania
            </p>
          </div>
        </div>
      </div>

      <div className="countries">
        {filteredData.map((country) => (
          <Link
            key={country.name.common}
            className={`country ${!darkMode ? "" : "dark-shade-2 no-box"}`}
            to={`/${country.name.common}`}
          >
            <img src={country.flags.png} alt={country.name.common} />
            <div className="info">
              <h1 className="name">{country.name.common}</h1>
              <div className="details">
                <p className="population">
                  Population: <span>{country.population}</span>
                </p>
                <p className="region">
                  Region: <span>{country.region}</span>
                </p>
                <p className="capital">
                  Capital: <span>{country.capital}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
