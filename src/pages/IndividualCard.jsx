/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { MdKeyboardBackspace } from "react-icons/md";

const IndividualCard = ({ Countries}) => {
  
  const { countryName } = useParams();
  console.log('Params:', useParams());

 

  console.log("Countries in IndividualCard:", Countries);
  console.log("Country Name in IndividualCard:", countryName);
  const [countryData, setCountryData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic to update your global dark mode state or save it to local storage
    // if you want to persist the user's choice across page reloads.
  };
  console.log('IndividualCard Rendered. Dark Mode:', isDarkMode);

  useEffect(() => {
    const fetchCountryData = () => {
      // Find the country object in the data array based on the countryName
      const selectedCountry = Countries?.find(
        (country) =>
          country?.name?.common.toLowerCase() === countryName.toLowerCase()
      );

      // Set the found country data in the state
      setCountryData(selectedCountry);
    };

    fetchCountryData();
  }, [Countries, countryName]);

  // Check if countryData is still loading
  if (!countryData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    population,
    region,
    capital,
    borders,
    subregion,
    tld,
    currencies,
    languages,
  } = countryData;

  // Map border abbreviations to their corresponding common names
  const borderCountries = borders?.map((borderAbbreviation) => {
    const borderCountry = Countries.find(
      (country) => country?.cca3 === borderAbbreviation
    );
    // console.log('Abbreviation:', borderAbbreviation);
    //console.log('Border Country:', borderCountry);
    return borderCountry?.name?.common || borderAbbreviation;
  });
  //console.log('Border Countries:', borderCountries);

  return (
    <>
       <div className={`h-screen ${isDarkMode ? 'dark' : ''} bg-slate-50 flex flex-col`}>
      <div className={`border-2 border-yellow-100 px-2 ${isDarkMode ? 'dark:border-gray-800' : ''}`}>
        <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
      <div className="mx-2 relative flex-grow">
        
      <div className={`border-2 py-2 my-2 w-20 shadow-lg ${isDarkMode ? 'dark:border-gray-800' : ''}`}>
          <Link to={"/"}>
            <MdKeyboardBackspace
              style={{ fontSize: "24px"}}
            />
            <span className="absolute top-2 left-10">Back</span>
            </Link>
          </div>
       
        {/* Display additional details about the selected country */}
      </div>
      <div className={`rounded-t-lg bg-white shadow-lg mx-6 flex-grow ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>

        <div className={`w-full border-2 mx-0 border-red-500 md:flex md:self-center md:h-[50%] ${isDarkMode ? 'dark:border-gray-800' : ''}`}>
          <img
            src={countryData.flags.svg}
            className="img-sytle md:img-style1    md:w-full"
            alt={`Flag of ${name?.common}`}
          />
        </div>

        <div className="mx-4 ">
          <h1 className="font-bold mt-10 text-4xl mb-6">{name?.common}</h1>

          <div className="grid lg:grid lg:grid-cols-2  leadind-8">
            <p className="font-bold">
              Native Name:
              <span className="font-normal ml-2">{name?.common}</span>{" "}
            </p>

            <p className="font-bold">
              Top Level Domain: <span className="font-normal">{tld}</span>
            </p>

            <p className="font-bold">
              Population:
              <span className="font-normal ml-2">{population}</span>{" "}
            </p>

            <p className="font-bold  lg:w-[15rem] ">
              Currencies:
              {Object.keys(currencies).map((currencyCode) => (
                <span className="font-normal" key={currencyCode}>
                  {" "}
                  {currencies[currencyCode].name} (
                  {currencies[currencyCode].symbol})
                  {/* Add a comma and space after each currency, if it's not the last one */}
                  {currencyCode !==
                    Object.keys(currencies)[
                      Object.keys(currencies).length - 1
                    ] && ", "}
                </span>
              ))}
            </p>

            <p className="font-bold">
              Region:
              <span className="font-normal ml-2">{region}</span>{" "}
            </p>
            <p className="font-bold w-[24rem]">
              Languages:
              <span className="font-normal ml-2">
                {Object.values(languages).join(", ")}
              </span>{" "}
            </p>
          </div>
          <p className="font-bold">
            Sub Region:
            <span className="font-normal ml-2">{subregion}</span>{" "}
          </p>
          <p className="font-bold">
            Capital:
            <span className="font-normal"> {capital}</span>
          </p>

          <div className="py-[1.5rem] lg:flex ">
            <p className="font-bold w-[200px] md:w-[150px]  ">Border Countries:</p>
            <div className="grid grid-cols-4  sm:flex">
              {borderCountries?.map((border) => (
                <Link
                  to={`/country/${border?.name?.common}`}
                  //to={`/country/${countryName?.name?.common}`}
                  key={border?.name?.common}
                >
                  <button className="border-2 w-[100px] ">
                    {border}
                   
                  </button>
                </Link>
              ))}
            </div>
              </div>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default IndividualCard;
