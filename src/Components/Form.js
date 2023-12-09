// Form.js
// This component handles the form for adding new activities.

import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ onAddActivity }) => {
  // State to manage the input values
  const [activity, setActivity] = useState({
    name: "",
    isForGoodWeather: false,
  });

  const inputRef = useRef(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the activity name is not empty
    if (activity.name.trim() === "") {
      return;
    }

    // Create a new activity object
    const newActivity = {
      id: uuidv4(),
      name: activity.name,
      isForGoodWeather: activity.isForGoodWeather,
    };

    // Call the parent component's function to add the new activity
    onAddActivity(newActivity);

    // Clear the input fields and focus on the name input
    setActivity({
      name: "",
      isForGoodWeather: false,
    });

    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Activity</h2>
      {/* Input for activity name */}
      <label>
        Activity Name:
        <input
          type="text"
          value={activity.name}
          onChange={(e) => setActivity({ ...activity, name: e.target.value })}
          ref={inputRef}
        />
      </label>
      {/* Checkbox for good weather */}
      <label>
        Good Weather:
        <input
          type="checkbox"
          checked={activity.isForGoodWeather}
          onChange={(e) =>
            setActivity({ ...activity, isForGoodWeather: e.target.checked })
          }
        />
      </label>
      {/* Submit button */}
      <button type="submit" disabled={!activity.name.trim()}>
        Add Activity
      </button>
    </form>
  );
};

export default Form;
