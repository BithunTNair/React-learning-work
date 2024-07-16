import axios from 'axios';
import React, { useEffect, useState } from 'react'
import closebtn from './assets/closebtn.svg'

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState([])
  const [modal, setModal] = useState(true)
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://countriesnow.space/api/v0.1/countries/currency',

    }).then((response) => {
      // console.log(response.data);
      setCountries(response.data.data)

      console.log(countries);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://countriesnow.space/api/v0.1/countries/flag/images'
    }).then((res) => {
      setFlag(res.data.data)
      console.log(res.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  return (
    <>
      <div className='w-screen h-screen '>
        <div className="card bg-white text-primary-content max-w-screen min-h-screen gap-4 flex flex-row flex-wrap ">
          {countries.map((element, index) => {
            return <div key={index} className="card-body bg-yellow-400 min-w-full ">
              <h2 className="card-title">{element.name}</h2>
              <p>Currency : {element.currency}</p>
              <div className="card-actions justify-end">
                <button className="btn">Click Me</button>
              </div>
            </div>
          })}
        </div>
        {modal && <div className='w-screen h-screen flex justify-center items-center 	position: fixed top-0 left-0 z-20 bg-slate-700 opacity-70'>
          <div className='h-3/4 w-1/2 bg-slate-950 overflow-hidden'>
            <img src={closebtn} alt="" width={'60px'} height={'60px'} />
            {flag.map((flag)=>{
              return <img src={flag.flag} width={'150px'} height={'150px'}  alt="" />
            })}
          </div>
        </div>}
      </div>
    </>


  )
}

export default CountryList