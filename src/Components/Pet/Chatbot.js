import "./chat.css";

import React, { useState } from "react";
import axios from "axios";

export function ChatBot() {
	const [prompt, setPrompt] = useState("");
	const [response, setResponse] = useState("");
	const [reponse, setReponse] = useState("");
	const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
	function addZero(num) {
		return num < 10 ? '0'+num : num
	}
  function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
  }
	const handleSubmit = (e) => {
	  e.preventDefault();

	  axios
		.post("http://127.0.0.1:3000/chat", { prompt })
		.then((res) => {
		  setResponse(res.data);
		  console.log(res.data);


		  const today = new Date()
		  let message = `
			  <div class="chatbox-message-item received">
				  <span class="chatbox-message-item-text">
					  ${res.data}
				  </span>
				  <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
			  </div>
		  `
		  chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
		  scrollBottom();

		})
		.catch((err) => {
		  console.log(err);
		});
	};
  return (
    <div>
		
      <div className="chatbox-wrapper">
        <div className="chatbox-toggle">
          <i className="bx bx-bot"></i>
        </div>
        <div className="chatbox-message-wrapper">
          <div className="chatbox-message-header">
            <div className="chatbox-message-profile">
              <img
                src="/assets/images/robot-dog.png"
                alt=""
                className="chatbox-message-image"
              />
              <div>
                <h4 className="chatbox-message-name">PetBot</h4>
                <p className="chatbox-message-status">online</p>
              </div>
            </div>
            <div className="chatbox-message-dropdown">
              
            </div>
          </div>
          <div className="chatbox-message-content">
            <h4 className="chatbox-message-no-message">
              How can I help you ?
            </h4>
            
          </div>
          <div className="chatbox-message-bottom">
            
			<form action="#" className="chatbox-message-form" onSubmit={handleSubmit}>
              <textarea
			  id="prompt"
                rows="1"
                placeholder="Type message..."
                className="chatbox-message-input"
				onChange={(event) => {
					setPrompt(event.target.value);
				}}
              ></textarea>
              <button type="submit" className="chatbox-message-submit">
                <i className="bx bx-send"></i>
              </button>
            </form>
			

            {/* <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <button type="submit">Send</button>
            </form> */}
          </div>
        </div>
      </div>
	
    </div>
  );
}

export default ChatBot;
