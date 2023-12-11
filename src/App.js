// App.js
// The main component that orchestrates the Weather App.

import React, { useState, useEffect } from "react";
import Form from "./Components/Form/Form";
import List from "./Components/List/List";
import "./App.css";

const App = () => {
  // Retrieve saved activities from local storage or initialize an empty array
  const savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
  // State to manage the list of activities
  const [activities, setActivities] = useState(savedActivities);
  // State to store weather data
  const [weather, setWeather] = useState(null);
  // State to track if it's good weather or not
  const [isGoodWeather, setIsGoodWeather] = useState(true);
  // State to store temperature
  const [temperature, setTemperature] = useState(0);

  // Function to add a new activity to the list
  const handleAddActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  // Function to delete an activity from the list
  const handleDeleteActivity = (id) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  // Fetch weather data from an API and update the state
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
        setTemperature(data.temperature);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    // Initial fetch on component mount
    fetchWeather();

    // Set up interval for periodic weather updates
    const intervalId = setInterval(fetchWeather, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Save activities to local storage whenever the list changes
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Determine good and bad weather conditions based on temperature
  const goodWeather = isGoodWeather === true && temperature >= 20;
  const badWeather = !goodWeather;

  return (
    <div>
      <div className="flex-container">
        <h1>Weather App</h1>
        {/* Display weather information if available */}
        {weather && (
          <div className="weather-container">
            <span>{weather.condition}</span>
            <span> {weather.temperature}°C</span>
          </div>
        )}
      </div>

      {/* Form to add new activities */}
      <Form onAddActivity={handleAddActivity} />
      {/* Display activities based on good weather */}
      {goodWeather && (
        <List
          activities={activities}
          onDeleteActivity={handleDeleteActivity}
          isGoodWeather={goodWeather}
        />
      )}
      {/* Display activities based on bad weather */}
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
