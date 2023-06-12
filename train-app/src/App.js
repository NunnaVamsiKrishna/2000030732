import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainSchedule() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetchTrainSchedule();
  }, []);

  async function fetchTrainSchedule() {
    const apiUrl = 'http://104.211.219.98/train/trains';
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY1NTIxNzAsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiZWI0NDIwZWEtNzA5ZC00NjNkLWI2MDUtYzJhMTI5ZWI3MTczIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwMDAwMzA3MzIifQ.thY1rLNy7v_xdABmyijxKeJg64I3JVfb5OMUMiTbhMI';
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setScheduleData(response.data);
    } catch (error) {
      console.error('Error fetching train schedule:', error);
    }
  }

  return (
    <div className="container">
      <h2 className="my-4">Train Schedule</h2>
      {Array.isArray(scheduleData) && scheduleData.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-between">
          {scheduleData.map((item) => (
            <div key={item.trainNumber} className="card border-primary mb-3" style={{ maxWidth: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Train: {item.trainName}</h5>
                <p className="card-text">Departure: {item.departureTime.Hours}:{item.departureTime.Minutes}:{item.departureTime.Seconds}</p>
                <p className="card-text">Delayed By: {item.delayedBy} minutes</p>
                <p className="card-text">Price - Sleeper: {item.price.sleeper}, AC: {item.price.AC}</p>
                <p className="card-text">Seats Available - Sleeper: {item.seatsAvailable.sleeper}, AC: {item.seatsAvailable.AC}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No train schedule data available.</p>
      )}
    </div>
  );
}

export default TrainSchedule;
