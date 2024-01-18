/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const CardDetails = ({ Countries }) => {
  return (
    <>
      <div
        className={`
        pt-10 
        grid 
        grid-cols-1
       px-[2rem]
        gap-12
        h-full 
        pl-[5rem]
        
        bg-slate-150
         dark:bg-gray-900 
         dark:text-white 
         shadow-xl
       
         
       
        md:w-screen  
        md:grid-cols-2 
        md:gap-12
        lg:grid-cols-3
        xl:grid-cols-4`}
      >
        {Countries?.length > 0 ? (
          // If there are filtered countries, map over them
          Countries.map((country) => (
            <div
              key={country.name.common}
              className="
              h-96
                dark:bg-gray-700 
                rounded-lg
                bg-white 
                w-[90%]
                shadow-xl
                place-item-center
                
                 
                "
            >
              <Link to={`/country/${country.name.common}`} key={country.name.common}>
                <div className="w-[100%] h-[12rem] ">
                  <img src={country.flags.png} className="img-sytle rounded-t-lg" alt={`${country.name.common} Flag`} />
                </div>

                <div className="m-[20px] ">
                  <h1 className="font-bold  text-2xl md:text-xl mb-4 sm:w-[60] ">
                    {country.name.common}
                  </h1>
                  <p className="font-bold">
                    Population:
                    <span className="font-normal dark:text-slate-50 ml-2">
                      {country.population}
                    </span>{" "}
                  </p>
                  <p className="font-bold">
                    Region:
                    <span className="font-normal md:font-normal ml-2">
                      {" "}
                      {country.region}
                    </span>{" "}
                  </p>
                  <p className="font-bold">
                    Capital:
                    <span className="font-normal ml-2">
                      {" "}
                      {country.capital}
                    </span>{" "}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          // If no filters applied, display all countries
        
        Countries?.map((country) => (
          <div
            key={country.name.common}
            className="
          h-96
            dark:bg-gray-700 
            rounded-lg
            bg-white 
            w-[90%]
            shadow-xl
            place-item-center
            
             
            "
          >
           <Link
              to={`/country/${country.name.common}`}
              key={country.name.common}
            >
              <div className="w-[100%] h-[12rem] ">
                <img src={country.flags.png} className="img-sytle rounded-t-lg" />
              </div>

              <div className="m-[20px] ">
                <h1 className="font-bold  text-2xl md:text-xl mb-4 sm:w-[60] ">
                  {country.name.common}
                </h1>
                <p className="font-bold">
                  Population:
                  <span className="font-normal dark:text-slate-50 ml-2">
                    {country.population}
                  </span>{" "}
                </p>
                <p className="font-bold">
                  Region:
                  <span className="font-normal md:font-normal ml-2">
                    {" "}
                    {country.region}
                  </span>{" "}
                </p>
                <p className="font-bold">
                  Capital:
                  <span className="font-normal ml-2">
                    {" "}
                    {country.capital}
                  </span>{" "}
                </p>
              </div>
            </Link>
          </div>
          ))
          )
        }
      </div>
    </>
    );
  };

export default CardDetails;



