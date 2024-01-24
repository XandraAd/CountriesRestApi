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
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const filterCountries = (searchTerm, regions) => {
    console.log("Filtering countries...", searchTerm, regions);
    const searchName = searchTerm.toLowerCase();
  
    const nameFilter = data?.filter((country) =>
      country.name.common.toLowerCase().includes(searchName)
    );
  
    const regionFilter = data?.filter(
      (country) =>
        regions?.length === 0 || regions?.includes(country.region.toLowerCase())
    );
  
    const filters = searchTerm
      ? nameFilter
      : regions?.length > 0
      ? regionFilter
      : "";
  
    setFilteredCountries(filters);
    setSelectedRegion(regions);
  
    if (filters.length === 1) {
      navigate(`/country/${filters[0].name.common}`);
    }
   
  };
  

  

  const handleSearch = (countryName) => {
    const trimmedSearch = countryName.trim().toLowerCase();
    if (trimmedSearch === "") {
      setFilteredCountries(data);
    } else {
      const filtered = data?.filter((country) =>
        country.name.common.toLowerCase().includes(trimmedSearch)
      );
      setFilteredCountries(filtered);
    }
  };

  const handleFilterByRegion = (regions) => {
    const filters = data.filter(
      (country) =>
        regions.length === 0 || regions.includes(country.region.toLowerCase())
    );

    setSelectedRegion(regions);
    setFilteredCountries(filters);

    if (filters.length === 1) {
      navigate(`/country/${filters[0].name.common}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await axios.get(
          "https://restcountries.com/v3.1/all"
        );
        const allCountries = countriesResponse.data;
        const allRegions = Array.from(
          new Set(allCountries.map((country) => country.region.toLowerCase()))
        );

        setData(allCountries);
        setRegions(allRegions);
      } catch (error) {
        setError("Data not found");
        setData([]);
      }
    };

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
              filter={filterCountries}
              selectedRegion={selectedRegion}
              handleFilterByRegion={handleFilterByRegion}
              handleSearch={handleSearch}
            />
          
            <CardDetails
              filteredCountries={filteredCountries}
              Countries={data}
              //Regions={regions}
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
