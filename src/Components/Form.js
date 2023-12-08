// Form.js
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ onAddActivity }) => {
  const [activity, setActivity] = useState({
    name: "",
    isForGoodWeather: false,
  });

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activity.name.trim() === "") {
      return;
    }

    const newActivity = {
      id: uuidv4(),
      name: activity.name,
      isForGoodWeather: activity.isForGoodWeather,
    };

    onAddActivity(newActivity);

    setActivity({
      name: "",
      isForGoodWeather: false,
    });

    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Activity</h2>
      <label>
        Activity Name:
        <input
          type="text"
          value={activity.name}
          onChange={(e) => setActivity({ ...activity, name: e.target.value })}
          ref={inputRef}
        />
      </label>
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
      <button type="submit" disabled={!activity.name.trim()}>
        Add Activity
      </button>
    </form>
  );
};

export default Form;
