/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { MdKeyboardBackspace } from "react-icons/md";

const IndividualCountry = ({ Countries, isDarkMode,toggle }) => {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
 

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
  }, [Countries, countryName, isDarkMode]);

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

    return borderCountry?.name?.common || borderAbbreviation;
  });

  return (
    <>
      <div
        className={`min-h-screen w-full relative top-20 ${
          isDarkMode ? "bg-gray-800" : "bg-slate-100"
        } `}
      >
        <div className={`${isDarkMode ? "bg-gray-800 " : "bg-white"} `}>
          <NavBar
            toggle={() => toggle()}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="py-4  ml-4">
          <div
            className={`border-2 py-2  w-24 shadow-lg my-4 mx-2  border-2 md:ml-8 lg:m-8 lg:w-40  lg:mt-[2rem] lg:py-4 ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-slate-100 "
            } hover:bg-slate-600`}
          >
            <Link to={"/"}>
              <MdKeyboardBackspace style={{ fontSize: "26px" }} />
              <span
                className={`absolute top-[39px] left-14 md:left-[5rem] lg:left-[5rem] lg:text-2xl md:top-[40px]  lg:top-[60px]  ${
                  isDarkMode? "text-white" : " "
                } `}
              >
                Back
              </span>
            </Link>
          </div>
        </div>
        {/* Display additional details about the selected country */}
        <div
          className={`p-10 pt-8 md:px-8  lg:grid lg:pt-0 lg:grid-cols-2
                   ${
                     isDarkMode
                       ? "bg-gray-800 text-white "
                       : "bg-slate-100"
                   } `}
        >
          <div
            className={` rounded-md  w-[100%] h-[12rem] mx-0 md:flex md:w-[40rem] md:h-[25rem] xl:w-[40rem] lg:h-[30rem] lg:ml-4 md:pl-4  
            ${isDarkMode ? "bg-gray-800" : "bg-slate-100"}`}
          >
            <img
              src={countryData.flags.svg}
              className="h-[20rem] md:w-[42rem] md:h-[25rem] img-style1 lg:w-[28rem]
             lg:h-[25rem] lg:mt-[4rem] lg:py-[4rem] lg:-ml-[1rem] xl:w-[35rem] xl:ml-[.4rem] rounded-lg  "
              alt={`Flag of ${name?.common}`}
            />
          </div>

          <div className="lg:pl-[1rem] xl:ml-8">
            <h1 className="font-bold mt-[9rem] text-3xl md:text-4xl  mb-6 md:mt-[2rem] lg:mt-[8rem] lg:-ml-[1rem] ">
              {name?.common}
            </h1>

            <div className="text-xl leading-8  md:text-2xl md:h-full  md:w-full md:flex md:flex-col md:flex-wrap lg:space-x-2 lg:text-lg xl:w-full  lg:-ml-[1rem] lg:mt-[7rem] lg:h-[12rem] lg:grid lg:grid-cols-2  2xl:grid-cols-3">
              <div className="lg:-mt-[5.5rem] lg:mr-4">
                <p className="font-bold ">
                  Native Name:
                  <span className="font-normal ml-2">{name?.common}</span>{" "}
                </p>
                <p className="font-bold  md-left-[10rem] md-top-[10rem] lg:w-[1rem] ">
                  Population:
                  <span className="font-normal ml-2 ">
                    {new Intl.NumberFormat().format(population)}
                  </span>{" "}
                </p>
                <div>
                  <p className="font-bold">
                    Region:
                    <span className="font-normal ml-2">{region}</span>{" "}
                  </p>
                  <p className="font-bold lg:w-[20rem]">
                    Sub Region:
                    <span className="font-normal ml-2">{subregion}</span>{" "}
                  </p>
                </div>

                <p className="font-bold ">
                  Capital:
                  <span className="font-normal"> {capital}</span>
                </p>
              </div>

              <div className="xl:mt-[0rem] xl:ml-8">
                <p className="font-bold mt-6  md:mt-6 lg:-mt-[6rem] lg:w-[15rem] ">
                  Top Level Domain:
                  <span className="font-normal ">{tld}</span>
                </p>

                <p className="font-bold  lg:w-[15rem] ">
                  Currencies:
                  {Object.keys(currencies).map((currencyCode) => (
                    <span className="font-normal" key={currencyCode}>
                      {" "}
                      {currencies[currencyCode].name}(
                      {currencies[currencyCode].symbol})
                      {currencyCode !==
                        Object.keys(currencies)[
                          Object.keys(currencies).length - 1
                        ] && ", "}
                    </span>
                  ))}
                </p>

                <p className="font-bold  flex ">
                  Languages:
                  <span className="font-normal ml-2   ">
                    {Object.values(languages).slice(0, 6).join(", ")}
                  </span>{" "}
                </p>
              </div>
            </div>

            <div className="py-[1.5rem] w-full text-xl md:text-2xl md:mt-4  md:pt-0  lg:flex lg:flex-row  lg:mt-0 lg:text-xl xl:-mt-[4rem] lg:grid">
              <p className="font-bold w-[180px] mb-2 md:w-[450px] lg:w-[400px]  lg:mr-4 ">
                Border Countries:
              </p>
              <div className="lg:py-2 ">
                {borderCountries?.map((border, index) => (
                  <Link to={`/country/${border}`} key={index} className="">
                    <button className="border-2 w-[150px] lg:w-[140px] mr-4  mb-2 lg:mr-2 hover:bg-slate-600 ">
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

export default IndividualCountry;
