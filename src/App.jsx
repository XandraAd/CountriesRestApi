/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import SearchInput from "./components/SearchInput";
import CardDetails from './pages/CardDetails';
import IndividualCard from "./pages/IndividualCard";
import { Route, Routes, useNavigate } from "react-router-dom";

import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterRegion, setFilterRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]); // Added this line

  const navigate = useNavigate();


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filter = (searchTerm, regions) => {
    setSelectedRegion(regions);
    const searchName = searchTerm.toLowerCase();
  
    const filters = data?.filter((country) => {
      const countryNameIncludes = country.name.common.toLowerCase().includes(searchName);
      const regionMatches = regions.length === 0 || regions.includes(country.region.toLowerCase());
  
      return countryNameIncludes && regionMatches;
    });
  
    setFilteredCountries(filters);
    console.log("this is filters", filters);

      // Check if there's only one country in the filtered list
      if (filters.length === 1) {
        // Navigate to the details page of the first (and only) country in the filtered list
        navigate(`/country/${filters[0].name.common}`);
      } else {
        // If no or multiple countries match the criteria, navigate to the country list page
       // navigate('/country/${searchName}');
        navigate(`/country/${searchName}`);
      }
  };
  
    
  
  
  

  useEffect(() => {
    const countryData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setData(response.data);
        console.log("this is data", response.data);
      } catch (error) {
        setError("Data not found");
        setData([]);
      }
    };

    countryData();
  }, []);

  return (
    
      <Routes>
        <Route
          path="/"
          element={
            <div className={`app-container ${isDarkMode ? 'dark' : ''} `}>
              <NavBar toggle={toggleDarkMode} isDarkMode={isDarkMode} />
              <SearchInput error={error} toggle={toggleDarkMode} filter={filter} />
              <CardDetails Countries={filteredCountries.length > 0 ? filteredCountries: data} toggle={toggleDarkMode} />
            </div>
          }
        />
        
        <Route path="/country/:countryName" element={<IndividualCard Countries={data} isDarkMode={isDarkMode} />} />
      </Routes>
    
  );
}

export default App;



   
  
    
    
 

 

