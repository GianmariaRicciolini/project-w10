import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CarouselDays from "./CarouselDays";

const CityData = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    const parts = pathname.split("/");
    const city = parts[2];

    if (city) {
      fetchData(city);
    }
  }, []);

  const fetchData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0c1397fcc1479fba154a81ca832192b0`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Container>
      {weatherData && (
        <div>
          <div className="d-flex align-items-center">
            <h1>{weatherData.city.name}</h1>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`}
              alt="Weather Icon"
            />
          </div>
          <h4 className="mb-2 text-muted">{weatherData.list[0].weather[0].description}</h4>

          <CarouselDays weatherData={weatherData} />
        </div>
      )}
    </Container>
  );
};

export default CityData;
