import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import WebSocketService from "./WebSocketService";
import { v4 as uuidv4 } from "uuid";
import { getUserById } from "../apiService/apiService";
import TokenManager from "../apiService/TokenManager";
import AppHeader from "./Navbar";

export default function Chatting() {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [messageData, setMessageData] = useState({
    from: "",
    // to: "",
    message: "",
  });

  function getUserName() {
    getUserById(claims.userId)
      .then((data) => {
        setMessageData({ ...messageData, from: data.name });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    getUserName();

    client.connect({}, (frame) => {
      const subscription = client.subscribe("/all/message", (message) => {
        show(JSON.parse(message.body));
      });
      setStompClient((prevClient) => {
        if (prevClient) {
          prevClient.unsubscribe("/all/message");
        }
        return client;
      });
      return () => {
        subscription.unsubscribe();
      };
    });
  }, []);

  function sendPublicMessage() {
    stompClient.send("/app/application", {}, JSON.stringify(messageData));
    setMessageData({ ...messageData, message: "" });
  }

  function show(message) {
    debugger;
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <>
      <AppHeader />
      <div className="container">
        <h1 className="mt-4">Public Chat</h1>
        <div className="mb-3">
          <label htmlFor="from" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            id="from"
            name="from"
            className="form-control"
            placeholder="Your name"
            value={messageData.from}
            disabled
          />
        </div>
        <div className="mb-3">
          <form onSubmit={(e) =>{
            e.preventDefault();
            sendPublicMessage}}>
            <label htmlFor="text" className="form-label">
              Your Message
            </label>
            <input
              type="text"
              id="text"
              name="text"
              className="form-control"
              placeholder="Your message"
              value={messageData.message}
              onChange={(e) =>
                setMessageData({ ...messageData, message: e.target.value })
              }
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={sendPublicMessage}
            >
              Send
            </button>
          </form>
        </div>
        <div className="mt-4">
          <h2>Received Messages:</h2>
          <ul className="list-group">
            {messages.map((message, index) => (
              <li key={index} className="list-group-item">
                <strong>{message.from}:</strong> {message.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
