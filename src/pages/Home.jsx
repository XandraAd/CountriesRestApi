/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SearchInput from '../components/SearchInput'
import axios from 'axios'
import CardDetails from './CardDetails'
import IndividualCard from './IndividualCard'
import {Route,Routes,useLocation } from "react-router-dom"

const Home = ({isDarkMode}) => {
  const[data,setData]=useState([])
  const[error,setError]=useState()
  //const location = useLocation();

 
  useEffect(() => {
    const countryData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setData(response.data);
      } catch (error) {
        setError("Data not found");
        setData([]);
      }
    };

    countryData();
  }, []);
  {/*}
  })
  const CountryData = async () => {
    try {
      let getData = await axios.get("https://restcountries.com/v3.1/all");
      console.log('Data fetched successfully:', getData.data);
      setData(getData.data);
    } catch (error) {
      setError("Data not found", error);
      setData([])
    }
  };
  
   // Call the CountryData function when the component mounts
   useEffect(() => {
    CountryData();
  }, []);*/}
 
console.log('Data in Home component:', data);

  
  return (
    <>
    <div className={`bg-slate-100 ${isDarkMode ? 'bg-black':'' } dark:bg-black`}>
    <NavBar />
      <SearchInput error={error} />
      {/* Conditionally render content based on route */}
      <div>
      <Routes>
  <Route path="/" element={<CardDetails Countries={data} />} />
  <Route path="/country/:countryName" element={<IndividualCard Countries={data} />} />
</Routes>
      </div>
    
    </div>
        
   
  
    
    
    
    </>
  )
}

export default Home