import { useEffect } from "react";
import { PrettyChatWindow } from "react-chat-engine-pretty";
const REACT_APP_CHAT_ENGINE_PROJECT_ID="bccb6fcd-364e-424e-934a-1c8cd591efaa";

const ChatsPage = (props) => {

  console.log(props.user.password+"rrrrrrrrrrrrrrr"); // Log user here
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId={REACT_APP_CHAT_ENGINE_PROJECT_ID}
        username={props.user.username} // adam
        secret={props.user.username} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
