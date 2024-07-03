import React from "react";
import { useState } from "react";
import TokenManager from "../apiService/TokenManager";
import { getUserById } from "../apiService/apiService";
// import SockJS from "sockjs-client";
import socksjs from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { v4 as uuidv4 } from 'uuid';
var stompClient = null;
import "../style/chatroom.css";

function ChatRoom() {
  const [userData, setUserData] = useState({
    senderName: "",
    recieverName: "",
    connected: false,
    message: "",
  });
  const [messagesSent, setMessagesSent] = useState([]);
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  // const [stompClient, setStompClient] = useState();
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");

  //   const userName = getUserById(TokenManager.getClaims()?.userId)
  //     .then((data) => {
  //       userData.senderName = data.name;
  //     })
  //     .catch((err) => {
  //     });

  function handleUsername(event) {
    const { value } = event.target;
    setUserData({ ...userData, senderName: value });
  }

  function handleMessage(event){
    const {value} = event.target;
    setUserData({...userData, "message": value});
  }


    function sendMessage() {
        if(stompClient) {
            const chatMessage={
                id: uuidv4(),
                from: userData.senderName,
                to: tab,
                text: userData.message
            };
            if(userData.recieverName !==tab){
              privateChats.get(tab).push(chatMessage);
              setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/privateMessage", {}, JSON.stringify(chatMessage));
            setUserData({...userData, message: ""});
        }
    }

  function registerUser() {
    let Sock = new socksjs("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    setRegisteredUsers([...registeredUsers, userData.senderName]);
    setUserData({ ...userData, connected: true });
    }
  

  function onConnected() {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      `/user/${userData.senderName}/private`,
      onPrivateMessageReceived);
      userJoin();
  }

  const userJoin=()=>{
    var chatMessage = {
      senderName: userData.username,
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
}

  function onError(error) {

  }

  function onPrivateMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    if (privateChats.get(message.senderName)) {
      privateChats.get(message.senderName).push(message);
      setPrivateChats(new Map(privateChats));
    } else {
      const list = [];
      list.push(message);
      privateChats.set(message.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  }

  return (
    <>
      <div className="container">
        {userData.connected ? (
          <div className="chat-box">
            <div className="member-list">
              <ul>
                <li
                  onClick={() => {
                    setTab("CHATROOM")
                  }}
                  className={`member ${tab === "CHATROOM" && "active"}`}
                >
                  Chatroom
                </li>
                {[...registeredUsers].map((name, index) => (
                  <li
                    onClick={() => {
                      setTab(name)
                    }}
                    className={`member ${tab === name && "active"}`}
                    key={index}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="member-list">
                <p>Members:</p>
                {Object.keys(privateChats).map((name, index) => (
                  <p key={index}>{name}</p>
                ))}
            </div>
            {tab === "CHATROOM" && (
              <div className="chat-content">
                <li>Press a chat</li>
              </div>
            )}
            {tab !== "CHATROOM" && (
              <div className="chat-content">
                <ul className="chat-messages">
                  {[...privateChats.set(tab)].map((chat, index) => (
                    <li className={`message ${chat.from === userData.recieverName && "self"}`} key={index}>
                      {chat.from !== userData.senderName && (
                        <div className="avatar">{chat.senderName}</div>
                      )}
                      <div className="message-data">{chat.message}</div>
                      {chat.from === userData.senderName && (
                        <div className="avatar self">{chat.senderName}</div>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="send-message">
                    <input type="text" className="input-message" 
                    placeholder={`Enter message for ${tab}`} value={userData.message} onChange={handleMessage} 
                    name="message"
                    />
                    <button type="button" className="send-button" onClick={sendMessage}>Send</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="register">
            <input
              id="user-name"
              placeholder="Enter your name"
              value={userData.senderName}
              onChange={handleUsername}
              name="senderName"
              margin="normal"
            />
            <button type="button" onClick={registerUser}>
              Connect
            </button>
          </div>
        )}
        
      </div>
    </>
  );
}


export default ChatRoom;