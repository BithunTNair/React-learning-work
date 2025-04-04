import axios from "axios";
import React, { useEffect, useState } from "react";
import closebtn from "./assets/closebtn.svg";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState([]);
  const [modal, setModal] = useState(false);
  const [iso, setIso] = useState("");
  const [filterdCountry, setFilterdCountry] = useState([]);

  const closeClick = () => {
    setModal(false);
  };

  const handleClick = (e) => {
    setModal(true);
    setIso(e.target.value);
    console.log(iso);
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://countriesnow.space/api/v0.1/countries/currency",
    })
      .then((response) => {
        setCountries(response.data.data);

        console.log(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://countriesnow.space/api/v0.1/countries/flag/images",
    })
      .then((res) => {
        setFlag(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setFilterdCountry(
      flag.filter((element) => {
        if (element.iso2 === iso) {
          return element;
        }
      })
    );
  },[filterdCountry]);
  return (
    <>
      <div className="w-screen h-screen ">
        <div className="card bg-white text-primary-content max-w-screen min-h-screen gap-4 flex flex-row flex-wrap ">
          {countries.map((element, index) => {
            return (
              <div key={index} className="card-body bg-blue-300 min-w-full ">
                <h2 className="card-title">{element.name}</h2>
                <p>Currency : {element.currency}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn"
                    onClick={handleClick}
                    value={element.iso2}
                  >
                    Click Me
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {modal && (
         <div className="fixed inset-0 z-20 flex justify-center items-center bg-blue-100 bg-opacity-80">
         <div className="w-11/12 max-w-lg lg:max-w-2xl bg-slate-950 rounded-lg shadow-lg relative p-4">
           <img
             src={closebtn}
             alt="Close"
             onClick={closeClick}
             className="w-10 h-10 absolute top-4 right-4 cursor-pointer bg-white p-1 rounded-full shadow-md"
           />
           <div className="w-full max-h-[80vh] lg:max-h-[60vh] bg-slate-800 overflow-y-auto rounded-md p-2 flex flex-col items-center">
             {filterdCountry.map((element, index) => (
               <img
                 key={index}
                 src={element.flag}
                 className="w-full h-auto max-h-60 sm:max-h-80 object-contain rounded-md"
                 alt=""
               />
             ))}
           </div>
         </div>
       </div>
       
        )}
      </div>
    </>
  );
}

export default CountryList;
