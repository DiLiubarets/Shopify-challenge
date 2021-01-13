import React, { useState } from "react";
import { connect } from "react-redux";
import "./Weather.css";

const WeatherOutput = ({ weatherData }) => {
  const {
    temp,
    temp_min,
    temp_max,
    feels_like,
    pressure,
    humidity,
  } = weatherData.main;
  let iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  const [option, setOption] = useState("fahrenheit");

  const toCelsius = (temp) => Math.round((5 / 9) * (temp - 32));
  const switchToC = () => setOption("celsius");
  const switchToF = () => setOption("fahrenheit");

  return (
    <div id="weather-data">
      <div className="row">
        <div className="col s12 col-centered">
          <table className="centered">
            <tbody>
              <tr>
                <td className="weather-td">
                  Location: 
                  <br />
                  {weatherData.name}, {weatherData.sys.country}
                </td>
                <td className="weather-td">
                  <p>
                    Temperature:
                    <br />
                    {option === "fahrenheit"
                      ? `${temp} °F`
                      : `${toCelsius(temp)} °C `}
                  </p>
                </td>
                <td className="weather-td">
                  Toggle:
                  <br />
                  <label className="toggle-weather">
                    {" "}
                    °F{" "}
                    <input
                      type="radio"
                      value="f"
                      checked={option === "fahrenheit"}
                      onChange={switchToF}
                    ></input>
                  </label>{" "}
                  <label className="toggle-weather ml10">
                    {" "}
                    °C{" "}
                    <input
                      type="radio"
                      value="c"
                      checked={option === "celsius"}
                      onChange={switchToC}
                    ></input>
                  </label>
                </td>
              </tr>
              <tr>
              <td className="weather-td">
                  Conditions: {weatherData.weather[0].main}{" "}
                  <img
                    className="weather-icon"
                    src={iconUrl}
                    alt="weather icon"
                  ></img>
                  <br />
                  Specifically: {weatherData.weather[0].description}
                </td>
                <td className="weather-td">
                  Min temperature:
                  <br />
                  {option === "fahrenheit"
                    ? `${Math.round(temp_min)} °F`
                    : `${toCelsius(temp_min)} °C `}
                </td>
                <td className="weather-td">
                  Max temperature:
                  <br />
                  {option === "fahrenheit"
                    ? `${Math.round(temp_max)} °F`
                    : `${toCelsius(temp_max)} °C `}
                </td>
              </tr>
              <tr>
              <td className="weather-td">
                  Feels like:
                  <br />
                  {option === "fahrenheit"
                    ? `${Math.round(feels_like)} °F`
                    : `${toCelsius(feels_like)} °C `}
                </td>
                <td className="weather-td">Pressure: 
                <br />
                {pressure} hpa</td>
                <td className="weather-td">Humidity: 
                <br />
                {humidity} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetching: state.fetching,
    weatherData: state.weather,
  };
};

export default connect(mapStateToProps)(WeatherOutput);
