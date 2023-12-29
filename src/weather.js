import React, { useEffect, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaCity } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { IoRainySharp } from "react-icons/io5";
import { MdOutlineWindPower } from "react-icons/md";
import rain from "./assets/rain.jpg";
import haze from "./assets/haze.jpg";
import haze1 from "./assets/haze1.jpg";
import cloud from "./assets/cloud.jpg";
import mist from "./assets/mist.jpg";

const Weather = () => {
  const [loc, setLoc] = useState("Chennai");
  const [data, setData] = useState();

  useEffect(() => {
    let KEY = "d41c1560359f2505ec51a9b3c021bed0";
    const response = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${KEY}`
    );
    const apicall = response.then((data) => data.json());
    apicall.then((item) => {
      setData(item);
      console.log(item);
    });
  }, [loc]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.dir(e.target[0].value);
    setLoc(e.target[0].value);
  };

  return (
    <>
      <div className="myVideo">
        {data?.weather[0].main === "Rain" ? (
          <img src={rain} alt="" />
        ) : data?.weather[0].main === "Haze" ? (
          <img src={haze1} alt="" />
        ) : data?.weather[0].main === "Mist" ? (
          <img src={mist} alt="" />
        ) : data?.weather[0].main === "Clouds" ? (
          <img src={cloud} alt="" />
        ) : (
          <img src={haze} alt="" />
        )}
      </div>
      <div className="container">
        <h1>Weather Stats</h1>
        <form className="app-container" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="input"
            placeholder="Enter the city Name"
          />
          <button className="btn">
            {" "}
            <span className="icon"><FaSearchLocation /></span>{" "}
          </button>
        </form>
        <div className="box-container">
          <div className="box">
            City
            <span>
              <FaCity />
            </span>{" "}
            {data?.name} {data?.sys.country}
          </div>
          <div className="box">
            Temp
            <span>
              {data?.weather[0].main === "Rain" ? (
                <IoRainySharp />
              ) : data?.weather[0].main === "Haze" ? (
                <TiWeatherPartlySunny />
              ) : data?.weather[0].main === "Mist" ? (
                <TiWeatherCloudy />
              ) : data?.weather[0].main === "Clouds" ? (
                <TiWeatherCloudy />
              ) : (
                <TiWeatherSnow />
              )}
            </span>
            {data?.weather[0].main} {Math.round(data?.main.temp - 273.15)}{" "}
            &deg;C
          </div>
        </div>
        <div className="box-container">
          <div className="box">
            Humidity
            <span>
              <WiHumidity />
            </span>{" "}
            {data?.main.humidity} %
          </div>
          <div className="box">
            Wind Speed
            <span>
              <MdOutlineWindPower />
            </span>{" "}
            {data?.wind.speed} Km
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
