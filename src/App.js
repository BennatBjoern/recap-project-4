// App.js
import React, { useState, useEffect } from "react";
import Form from "./Components/Form";
import List from "./Components/List";
import "./App.css";

const App = () => {
  const savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
  const [activities, setActivities] = useState(savedActivities);
  const [weather, setWeather] = useState(null);
  const [isGoodWeather, setIsGoodWeather] = useState(true);
  const [temperature, setTemperatur] = useState(0);

  const handleAddActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const handleDeleteActivity = (id) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://example-apis.vercel.app/api/weather/europe"
        );
        const data = await response.json();
        setWeather(data);
        // Set the weather condition based on the fetched data
        setIsGoodWeather(data.isGoodWeather);
        setTemperatur(data.temperature);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();

    const intervalId = setInterval(fetchWeather, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const goodWeather = isGoodWeather === true && temperature >= 20;
  const badWeather = !goodWeather;

  return (
    <div>
      <h1>Weather App</h1>
      {weather && (
        <div className="weather-container">
          <span>{weather.condition}</span>
          <span> {weather.temperature}°C</span>
        </div>
      )}
      <Form onAddActivity={handleAddActivity} />
      {goodWeather && (
        <List
          activities={activities}
          onDeleteActivity={handleDeleteActivity}
          isGoodWeather={goodWeather}
        />
      )}
      {badWeather && (
        <List
          activities={activities}
          onDeleteActivity={handleDeleteActivity}
          isGoodWeather={false}
        />
      )}
    </div>
  );
};

export default App;
