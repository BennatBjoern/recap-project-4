// List.js
const List = ({ activities, onDeleteActivity, isGoodWeather }) => {
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  return (
    <div>
      <h2>
        {isGoodWeather ? "Good Weather Activities" : "Bad Weather Activities"}
      </h2>
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            <button onClick={() => onDeleteActivity(activity.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
