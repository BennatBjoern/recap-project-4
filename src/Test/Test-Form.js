// Form.js
// This component handles the form for adding new activities.

import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ onAddActivity }) => {
  // State to manage the input values
  const [activity, setActivity] = useState({
    name: "",
    isForGoodWeather: false,
    isForBadWeather: false,
  });

  const inputRef = useRef(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if at least one weather checkbox is selected
    if (!activity.isForGoodWeather && !activity.isForBadWeather) {
      return;
    }

    // Check if the activity name is not empty
    if (activity.name.trim() === "") {
      return;
    }

    // Create a new activity object
    const newActivity = {
      id: uuidv4(),
      name: activity.name,
      isForGoodWeather: activity.isForGoodWeather,
      isForBadWeather: activity.isForBadWeather,
    };

    // Call the parent component's function to add the new activity
    onAddActivity(newActivity);

    // Clear the input fields and focus on the name input
    setActivity({
      name: "",
      isForGoodWeather: false,
      isForBadWeather: false,
    });

    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        {/* Submit button */}
        <button
          className="submit-button"
          type="submit"
          disabled={
            !activity.name.trim() ||
            (!activity.isForGoodWeather && !activity.isForBadWeather)
          }
        >
          +
        </button>
        {/* Input for activity name */}
        <input
          placeholder="Create a new activity"
          type="text"
          value={activity.name}
          onChange={(e) => setActivity({ ...activity, name: e.target.value })}
          ref={inputRef}
        />
      </div>

      <div className="checkbox-container">
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

        {/* Checkbox for bad weather */}
        <label>
          Bad Weather:
          <input
            type="checkbox"
            checked={activity.isForBadWeather}
            onChange={(e) =>
              setActivity({ ...activity, isForBadWeather: e.target.checked })
            }
          />
        </label>
      </div>
    </form>
  );
};

export default Form;
