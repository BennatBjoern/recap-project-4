// List.js
// This component displays a list of activities based on the weather condition.

const List = ({ activities, onDeleteActivity, isGoodWeather }) => {
  // Filter activities based on the specified weather condition
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  return (
    <div>
      {/* Display header based on the weather condition */}
      <h2>
        {isGoodWeather ? "Good Weather Activities" : "Bad Weather Activities"}
      </h2>
      <ul className="list-container">
        {/* Map through filtered activities and display them */}
        {filteredActivities.map((activity) => (
          <li className="list-item" key={activity.id}>
            {activity.name}
            <button
              className="list-button"
              onClick={() => onDeleteActivity(activity.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
