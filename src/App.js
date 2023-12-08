// App.js
import React, { useState, useEffect } from "react";
import Form from "./Components/Form";
import List from "./Components/List";
import "./App.css";

const App = () => {
  const savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
  const [activities, setActivities] = useState(savedActivities);
  const [weather, setWeather] = useState(null);
  const isGoodWeather = true; // Simulated value, replace it with the actual weather condition check
  const isBadWeather = !isGoodWeather; // Invert the value for bad weather

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

  // Filter activities based on isGoodWeather and isBadWeather
  const goodWeatherActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  const badWeatherActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isBadWeather
  );

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
      <List
        activities={goodWeatherActivities}
        onDeleteActivity={handleDeleteActivity}
        isGoodWeather={isGoodWeather}
      />
      <List
        activities={badWeatherActivities}
        onDeleteActivity={handleDeleteActivity}
        isGoodWeather={isBadWeather}
      />
    </div>
  );
};

export default App;
