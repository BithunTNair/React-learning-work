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
  });
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
          <div className="w-screen h-screen flex justify-center items-center 	position: fixed top-0 left-0 z-20 bg-blue-100 opacity-100">
            <div className=" lg:h-1/2  w-1/2 bg-slate-950 ">
              <img
                src={closebtn}
                alt=""
                onClick={closeClick}
                className="bg-white sm:w-16 h-16"
              />

              <div className=" lg:w-full lg:h-full bg-slate-800 overflow-scroll">
                {filterdCountry.map((element, index) => {
                  return (
                    <img
                      key={index}
                      src={element.flag}
                      className="w-full h-full"
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountryList;
