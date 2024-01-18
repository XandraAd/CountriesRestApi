/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import IndividualCard from "../pages/IndividualCard";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ Countries, isDarkMode ,filter,filterRegion}) => {
  const [query, setQuery] = useState("");
  
  console.log('Props:', {filter, filterRegion });
  const [filteredCountries, setFilteredCountries] = useState("");
  const [selectedRegion,setSelectedRegion]= useState([])
  //const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const searchName = e.target.value.toLowerCase();
      setQuery(searchName);

      // Call the filter function with search term and selected region
      filter(searchName, selectedRegion);
     
    }
  
  };


  const handleRegionSelection = (e) => {
    const region = e.target.value;
   setSelectedRegion(region);
  
    // Filter countries based on the selected region
    filterRegion(region);
  };
  
  
  

  

  return (
    <div className={`flex  flex-wrap justify-between -gap-8 w-screen 
    md:grid
   md:grid-cols-2 
   md:gap-[10rem]
   lg:gap-[29rem]
   xl:gap-[55rem]
  bg-slate-150
   
dark:bg-gray-900
      `}>
      <div className="flex justify-between dark:text-white dark:bg-gray-700 h-[4rem] ">
        <label htmlFor="searchInput" className="sr-only  ">
          Search for a country
        </label>
        <div className="relative py-2 sm:py-4 sm:px-2 sm:px-6  md:px-10 dark:bg-gray-900">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for a country"
            className={`border rounded-md p-2 pl-10 w-[22rem] md:w-[19rem] lg:w-[28rem] mx-2 ${isDarkMode ? 'text-white' : 'text-black'} dark:bg-gray-700 `}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />

          <span className={`absolute left-4 sm:left-12  md:left-14 top-6 sm:top-8  ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <RiSearchLine  className={`${isDarkMode ? 'text-white' : 'text-black'}`}/>
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="country-select"></label>
        <div className={`mt-4 w-60 h-11 border-2  border-inherit ml-2 sm:px-0  flex place-items-center text-md justify-center  mx-2 md:-px-6 lg:-mx-[19px] ${isDarkMode ? 'text-white' : 'text-black'} dark:bg-gray-800`}>
          <select value={selectedRegion} onChange={handleRegionSelection} name="country" id="country-select" className= {`w-60  mx-2 ${isDarkMode ? 'text-white' : 'text-black'} dark:bg-gray-700`}  >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      {/* Render CountryCard component with filtered countries */}
      {filteredCountries?.length > 0 &&
        filteredCountries?.map((country) => (
          <IndividualCard key={country.name.common} country={country} />
        ))}
    </div>
  );
};

export default SearchInput;
