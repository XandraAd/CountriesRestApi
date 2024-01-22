/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { MdKeyboardBackspace } from "react-icons/md";

const IndividualCard = ({ Countries,isDarkMode,toggleDarkMode}) => {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [isDarkModeLocal, setIsDarkModeLocal] = useState(false);
 


  useEffect(() => {
    console.log("isDarkMode:", isDarkMode);
    console.log("isDarkModLocale:", isDarkModeLocal);
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
  }, [Countries, countryName,isDarkMode,isDarkModeLocal]);

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
       <div className="h-screen w-screen lg:bg-slate-50 bg-slate-150
   
   dark:bg-gray-900  relative">
      <div className={`border-2 border-yellow-100  ${isDarkModeLocal ? 'dark:border-gray-800' : 'bg-white'}`}>
        <NavBar 
        className="w-[80%] md:w-screen"
        toggleDarkMode={() => setIsDarkModeLocal((prevMode) => !prevMode)}
         isDarkMode={isDarkMode} />
      </div>
      <div className="relative">
        
      <div className={`border-2 py-2  w-20 shadow-lg my-4 mx-2 ${isDarkMode ? 'dark:border-gray-800' : ''}`}>
          <Link to={"/"}>
            <MdKeyboardBackspace
              style={{ fontSize: "24px"}}
            />
            <span className="absolute top-2 left-10">Back</span>
            </Link>
          </div>
       
        
      </div>
      {/* Display additional details about the selected country */}
      <div className={`px-10 bg-white md:px-40 lg:px-2 lg:grid lg:grid-cols-2 ${isDarkModeLocal ? 'dark:bg-gray-900' : 'bg-slate-150'} border-2`}>
          <div className={`rounded-md w-[100%] h-[11rem] mx-0 md:flex md:self-center md:h-[50%] lg:w-[90%] lg:h-[100%] lg:mt-14 lg:border-2 ${isDarkModeLocal ? 'dark:border-gray-800' : ''}`}>
            
          <img
            src={countryData.flags.svg}
            className="lg:w-[385px] lg:h-[376px] img-style1 borderR rounded-lg "
            alt={`Flag of ${name?.common}`}
          />
        </div>

        <div className="bg-inherit lg:-ml-8">
          <h1 className="font-bold mt-[4rem] text-4xl mb-6 md:mt-[2rem] ">{name?.common}
          </h1>

          <div className="md:h-[10rem] leadind-8 border-2 border-red-500 md:flex md:flex-col md:flex-wrap">
            <p className="font-bold">
              Native Name:
              <span className="font-normal ml-2">{name?.common}</span>{" "}
            </p>
            <p className="font-bold  md-left-[10rem] md-top-[10rem] ">
              Population:
              <span className="font-normal ml-2">{population}</span>{" "}
            </p>
            <div >
            <p className="font-bold">
              Region:
              <span className="font-normal ml-2">{region}</span>{" "}
            </p>
            <p className="font-bold">
            Sub Region:
            <span className="font-normal ml-2">{subregion}</span>{" "}
          </p>

          <p className="font-bold ">
            Capital:
            <span className="font-normal"> {capital}</span>
          </p>
            </div>
           


<div className=""  >
<p className="font-bold mt-6 sm:mt-0 ">
              Top Level Domain: <span className="font-normal ">{tld}</span>
            </p>

            

            <p className="font-bold  lg:w-[15rem] ">
              Currencies:
              {Object.keys(currencies).map((currencyCode) => (
                <span className="font-normal" key={currencyCode}>
                  {" "}
                  {currencies[currencyCode].name} (
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
              <span className="font-normal ml-2 grid h-12 ">
                {Object.values(languages).join(", ")}
              </span>{" "}
            </p>
</div>

            
          </div>
          
          

          <div className="py-[1.5rem] md:mt-4  md:pt-0  lg:flex ">
            <p className="font-bold w-[150px] md:w-[450px]  lg:w-[340px] border-green-200  border-2">Border Countries:</p>
            <div className="lg:flex lg:flex-row lg:flex-wrap lg:space-x-2  ">
              {borderCountries?.map((border,index) => (
                <Link
                  to={`/country/${border}`}
                 
                  key={index}
                >
                  <button className="border-2 w-[100px] lg:w-[120px] mr-2 mb-2  ">
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
