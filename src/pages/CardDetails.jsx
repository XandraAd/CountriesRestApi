/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const CardDetails = ({ Countries, selectedRegion,filteredCountries }) => {
  // Determine the data to display based on conditions
  const displayData =
  filteredCountries?.length > 0
    ? filteredCountries // Display filtered countries if available
    : selectedRegion?.length > 0
    ? Countries.filter((country) =>
        selectedRegion.includes(country.region.toLowerCase())
      ) // Display data based on selected region
    : Countries; // Display the whole data if no search term or region is specified
// Display the whole data if no search term or region is specified

  console.log("Selected Region in CardDetails:", selectedRegion);
  console.log("Filtered Countries in CardDetails:", displayData);

  return (
    <>
      <div
        className={`relative top-20 pt-10  px-[2rem] flex flex-wrap gap-12 min-h-screen w-screen
        pl-[2rem] bg-slate-50 dark:bg-gray-900 dark:text-white shadow-xl md:grid
        md:grid-cols-2 md:px-[3rem] md:ml-0  lg:grid-cols-3 lg:top-24
        xl:grid-cols-4 2xl:grid-cols-6 xl:last:pr-0  last:pr-4 `}
      >
        {displayData.map((country) => (
          <div
            key={country.name.common}
            className=" dark:bg-gray-700 rounded-lg bg-white w-[90%] shadow-xl 
            h-[25rem] hover:w-[95%] "
          >
            <Link
              to={`/country/${country.name.common}`}
              key={country.name.common}
            >
              <div className="w-[100%] h-[12rem] ">
                <img
                  src={country.flags.png}
                  className="img-sytle rounded-t-lg"
                  alt={`${country.name.common} Flag`}
                />
              </div>

              <div className="mx-[20px] ">
                <h1 className="font-bold h-10 text-2xl md:text-xl mb-6 ">
                 {country.name.common}
                </h1>
                <p className="font-bold">
                  Population:
                  <span className="font-normal dark:text-slate-100 ml-2">
                  {new Intl.NumberFormat().format(country.population)}
                  </span>{" "}
                </p>
                <p className="font-bold">
                  Region:
                  <span className="font-normal ml-2">
                    {" "}
                    {country.region}
                  </span>{" "}
                </p>
                <p className="font-bold mb-6">
                  Capital:
                  <span className="font-normal ml-2">
                    {" "}
                    {country.capital}
                  </span>{" "}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardDetails;
