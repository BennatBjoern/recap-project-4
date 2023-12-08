// List.js
const List = ({ activities, onDeleteActivity, isGoodWeather }) => {
  return (
    <div>
      <h2>
        {isGoodWeather ? "Good Weather Activities" : "Bad Weather Activities"}
      </h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            {/* ({activity.isForGoodWeather ? "Good Weather" : "Bad Weather"}) */}
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
