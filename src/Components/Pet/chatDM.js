import { useState } from "react";

import AuthPage from "../User/login";
import ChatsPage from "./chatsPage";

function ChatDM() {

  const userFromLocalStorageString = localStorage.getItem('user');
  const user= userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
 

  if (!user) {
    return <AuthPage/>;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default ChatDM;