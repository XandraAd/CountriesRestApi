/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import SearchInput from "./components/SearchInput";
import CardDetails from "./pages/CardDetails";
import IndividualCard from "./pages/IndividualCard";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState("");
  const [regions, setRegions] = useState([]);

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      return !prevMode;
    });
  };

  const filter = (searchTerm, regions) => {
    const searchName = searchTerm.toLowerCase();

    // Search by name
    const nameFilter = data?.filter((country) =>
      country.name.common.toLowerCase().includes(searchName)
    );

    // Filter by region
    const regionFilter = data?.filter(
      (country) =>
        regions.length === 0 || regions.includes(country.region.toLowerCase())
    );

    // Use the appropriate filter based on the presence of searchTerm
    const filters = searchTerm
      ? nameFilter
      : regions.length > 0
      ? regionFilter
      : "";

    setFilteredCountries(filters);
    setSelectedRegion(regions);

    // Check if there's only one country in the filtered list
    if (filters.length === 1) {
      // Navigate to the details page of the first (and only) country in the filtered list
      navigate(`/country/${filters[0].name.common}`);
    } else {
      // If no or multiple countries match the criteria, navigate to the country list page
      navigate(`/country/${searchName}`);
    }
  };

  const handleFilterByRegion = (regions) => {
    //console.log("Filtering by Regions:", regions);

    const filters = data?.filter(
      (country) =>
        regions.length === 0 || regions.includes(country.region.toLowerCase())
    );
    //console.log("Filtered Countries:", filters);

    // Set the selectedRegion state
    setSelectedRegion(regions);

    // Update the filteredCountries state
    setFilteredCountries(filters);
    console.log("Filtered Countries:", filters);

    // If there's only one country in the filtered list, navigate to its details page
    if (filters.length === 1) {
      navigate(`/country/${filters[0].name.common}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all countries
        const countriesResponse = await axios.get(
          "https://restcountries.com/v3.1/all"
        );
        const allCountries = countriesResponse.data;

        // Extract all unique regions from the countries data
        const allRegions = Array.from(
          new Set(allCountries.map((country) => country.region.toLowerCase()))
        );

        // Set the states for countries and regions
        setData(allCountries);
        setRegions(allRegions);
      } catch (error) {
        // Handle errors
        setError("Data not found");
        setData([]);
      }
    };

    // Invoke fetchData to fetch countries and regions when the component mounts
    fetchData();
  }, [setData, setRegions, setError]);

  return (
    <Routes>
      <Route
        path="/"
        element={
       
          <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>
            <SearchInput
              
              error={error}
              toggle={toggleDarkMode}
              Regions={regions}
              filter={filter}
              selectedRegion={selectedRegion}
              handleFilterByRegion={handleFilterByRegion}
            />
            <CardDetails
              Countries={data}
              Regions={regions}
              selectedRegion={selectedRegion}
              toggle={toggleDarkMode}
            />
          </Layout>
        }
      />

      <Route
        path="/country/:countryName"
        element={
          <IndividualCard
            Countries={data}

            toggle={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        }
      />
    </Routes>
  );
}

export default App;
