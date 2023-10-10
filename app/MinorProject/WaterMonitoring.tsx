"use client";
import React, { useState, useEffect } from "react";
import { client, Message } from "../../utils/mqtt"; // Import client and Message from utils/mqtt.js

const WaterMonitoringModal = () => {
  const [level, setLevel] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  useEffect(() => {
    client.subscribe("maninder/project/lvl");
    client.subscribe("maninder/project/min");
    client.subscribe("maninder/project/max");

    client.onMessageArrived = (message) => {
      const topic = message.destinationName;
      const value = parseInt(message.payloadString, 10);
      switch (topic) {
        case "maninder/project/lvl":
          setLevel(value);
          break;
        case "maninder/project/min":
          setMin(value);
          break;
        case "maninder/project/max":
          setMax(value);
          break;
        default:
          break;
      }
    };

    return () => {
      client.unsubscribe("maninder/project/lvl");
      client.unsubscribe("maninder/project/min");
      client.unsubscribe("maninder/project/max"); // Added this line to unsubscribe from the max topic
    };
  }, []);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setMin(value);

    const message = new Message(value.toString());
    message.destinationName = "maninder/project/min";
    client.send(message); // Updated this line to use the correct send method
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setMax(value);

    const message = new Message(value.toString());
    message.destinationName = "maninder/project/max";
    client.send(message); // Updated this line to use the correct send method
  };

  return (
    <div className="p-4">
      <div className="progress progress-info">
        <div className="progress-bar" style={{ width: `${level}%` }}>
          {level}
        </div>
      </div>
      <div className="flex mt-4">
        <input
          type="range"
          min="0"
          max="100"
          value={min}
          onChange={handleMinChange}
          className="slider slider-primary"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={max}
          onChange={handleMaxChange}
          className="slider slider-secondary ml-4"
        />
      </div>
    </div>
  );
};

export default WaterMonitoringModal;
