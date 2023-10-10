// utils/mqtt.js
import { Client, Message } from 'paho-mqtt';

const client = new Client('broker.hivemq.com', 8000, '/mqtt', 'your_client_id');

client.onConnectionLost = responseObject => {
  if (responseObject.errorCode !== 0) {
    console.log('Connection lost:', responseObject.errorMessage);
  }
};

const onConnect = () => {
  console.log('Connected to MQTT Broker');
};

client.connect({ onSuccess: onConnect });

export { client, Message };  // Export both client and Message
