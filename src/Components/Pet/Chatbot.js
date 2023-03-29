
import "./chat.css"
import "./chat.js"
import React, { useState } from "react";
import axios from 'axios';
function ChatBot() {
 const[prompt,setPrompt]=useState("");
 const[response,setResponse]=useState("");
 const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://127.0.0.1:3000/chat",{prompt})
    .then((res)=>{
        setResponse(res.data);
    }).catch((err)=>{
        console.log(err);
    });
}

    return (  
        <div>
    <div className="floating-chat">
     <img src="/assets/images/logo-011.png"></img>
    <div className="chat">
        <div className="header">
            <span className="title">
                what's on your mind?
            </span>
            <button>
                <i className="fa fa-times" aria-hidden="true"></i>
            </button>
                         
        </div>
        <ul className="messages">
            <li className="other">asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas</li>
            <li className="other">Are we dogs??? 🐶</li>
            <li className="self">no... we're human</li>
            <li className="other">are you sure???</li>
            <li className="self">yes.... -___-</li>
            <li className="other">if we're not dogs.... we might be monkeys 🐵</li>
            <li className="self">i hate you</li>
            <li className="other">don't be so negative! here's a banana 🍌</li>
            <li className="self">......... -___-</li>
        </ul>
        <div className="footer">
            <div className="text-box" contentEditable="true" disabled="true"></div>
            <button id="sendMessage">send</button>
        </div>
    </div>
</div>
      </div>
    );
  };
   
export default ChatBot;