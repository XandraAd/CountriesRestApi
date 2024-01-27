/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import IndividualCard from "../pages/IndividualCountry";

const SearchInput = ({
  Countries,
  toggle,
  isDarkMode,
  filter,
  handleFilterByRegion,
  Regions,
  handleSearch,
}) => {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleChange = (e) => {
    const searchName = e.target.value.trim().toLowerCase();
    setQuery(searchName);
    // Call the filter function with search term and selected region
    filter(searchName);
    // Call the searchCountries function to update the filtered countries based on the search term
    handleSearch(searchName);
  };

  const handleRegionSelection = (e) => {
    const region = e.target.value;
    // console.log("Selected Region:", region);
    setSelectedRegion(region);
    // Filter countries based on the selected region
    handleFilterByRegion(region);
  };

  useEffect(() => {
    if (Countries !== filteredCountries) {
      setFilteredCountries(Countries);
    }
  }, [Countries, query, filteredCountries, handleSearch]);

  return (
    <div
      className={`flex  flex-wrap
      relative 
       top-20 
       z-10 
       justify-around 
      min-w-screen
       md:grid
       md:grid-cols-2 
      md:pt-8
      md:gap-[10rem]
      lg:gap-[29rem]
      lg:top-[6rem]
      xl:gap-[48rem]
      2xl:gap-[88rem]
      bg-slate-150
      dark:bg-gray-900
      dark:text-white`}
    >
      <div className="flex justify-evenly dark:text-white dark:bg-gray-700 ">
        <label htmlFor="searchInput" className="sr-only ">
          Search for a country
        </label>
        <div className="relative py-2  md:px-10 md:ml-[6rem] lg:ml-[17rem] xl:pl-[4.5rem] dark:bg-gray-900">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for a country"
            className={`border rounded-md p-2 pl-10 w-[22rem] md:w-[19rem] lg:w-[28rem] mx-2
            
             dark:bg-gray-700  dark:text-white`}
            value={query}
            onChange={handleChange}
          />
          <span
            className={`absolute left-4   md:left-16  lg:left-18  xl:left-24 top-6 md:top-6  ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <RiSearchLine className={`dark:bg-gray-700  dark:text-white`} />
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="country-select"></label>
        <div
          className={`mt-4 mb-2 w-60 h-12 border-2 -ml-24 md:ml-4  flex text-md md:-px-6 lg:-mx-[19px] dark:bg-gray-700`}
        >
          <select
            value={selectedRegion}
            onChange={handleRegionSelection}
            name="region"
            id="country-select"
            className={`w-60 mx-2 dark:text-white dark:bg-gray-700 capitalize `}
          >
            <option value="" className="capitalize">
              Filter by Region
            </option>
            {Regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Render CountryCard component with filtered countries */}
      {filteredCountries?.length > 0 &&
        filteredCountries?.map((country) => (
          <IndividualCard
            key={country.name.common}
            country={country}
            toggle={toggle}
            isDarkMode={isDarkMode}
          />
        ))}
    </div>
  );
};

export default SearchInput;
