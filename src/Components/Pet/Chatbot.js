
import "./chat.css"
import "./chat.js"
import React, { useState } from "react";
import axios from 'axios';
export function botResponse(){
	console.log("ASSOUM");
}
export  function  ChatBot() {
 const[prompt,setPrompt]=useState("");
 const[response,setResponse]=useState("");
 const handleSubmit=(e)=>{

		console.log("CHOSEe")

}

    return (  
        <div>
   <div className="chatbox-wrapper">
		<div className="chatbox-toggle">
			<i className='bx bx-message-dots'></i>
		</div>
		<div className="chatbox-message-wrapper">
			<div className="chatbox-message-header">
				<div className="chatbox-message-profile">
					<img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" className="chatbox-message-image"/>
					<div>
						<h4 className="chatbox-message-name">Jonathan Doe</h4>
						<p className="chatbox-message-status">online</p>
					</div>
				</div>
				<div className="chatbox-message-dropdown">
					<i className='bx bx-dots-vertical-rounded chatbox-message-dropdown-toggle'></i>
					<ul className="chatbox-message-dropdown-menu show">
						<li>
							<a href="#">Search</a>
						</li>
						<li>
							<a href="#">Report</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="chatbox-message-content">
				<h4 className="chatbox-message-no-message">You don't have message yet!</h4>
				 <div className="chatbox-message-item sent">
					<span className="chatbox-message-item-text">
						Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Quod, fugiat?
					</span>
					<span className="chatbox-message-item-time">08:30</span>
				</div>
				<div className="chatbox-message-item received">
					<span className="chatbox-message-item-text">
						Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Quod, fugiat?
					</span>
					<span className="chatbox-message-item-time">08:30</span>
				</div> 
			</div>
			<div className="chatbox-message-bottom">
				<form action="#" className="chatbox-message-form">
					<textarea rows="1" placeholder="Type message..." className="chatbox-message-input"></textarea>
					<button type="submit" className="chatbox-message-submit"><i className='bx bx-send' ></i></button>
				</form>
			</div>
		</div>
	</div>
	
      </div>
    );
  };
   
export default ChatBot;