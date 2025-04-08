import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ activity_type: '', duration: '' });

  useEffect(() => {
    fetch('https://crispy-cod-q74j56vgrrpgh967g-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleAddActivity = () => {
    fetch('https://crispy-cod-q74j56vgrrpgh967g-8000.app.github.dev/api/activities/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    })
      .then(response => response.json())
      .then(() => {
        // Re-fetch the updated list of activities
        fetch('https://crispy-cod-q74j56vgrrpgh967g-8000.app.github.dev/api/activities/')
          .then(response => response.json())
          .then(data => setActivities(data))
          .catch(error => console.error('Error fetching activities:', error));
        setNewActivity({ activity_type: '', duration: '' });
      })
      .catch(error => console.error('Error adding activity:', error));
  };

  return (
    <div>
      <h1 className="display-4">Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Activity Type</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity._id}>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h2>Add New Activity</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddActivity(); }}>
          <div className="mb-3">
            <label htmlFor="activityType" className="form-label">Activity Type</label>
            <input
              type="text"
              className="form-control"
              id="activityType"
              value={newActivity.activity_type}
              onChange={(e) => setNewActivity({ ...newActivity, activity_type: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              value={newActivity.duration}
              onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Activity</button>
        </form>
      </div>
    </div>
  );
}

export default Activities;