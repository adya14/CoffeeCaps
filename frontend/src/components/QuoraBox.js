import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import "./css/QuoraBox.css";

function QuoraBox() {
  const user = useSelector(selectUser);
  return (
    <div className="quoraBox">
      <div className="quoraBox__info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <img src="https://www.icegif.com/wp-content/uploads/coffee-icegif-4.gif" style={{ width: '200px', height: '150px' }} />
</div>

      <div className="quoraBox__quora">
        <h5>You can post you thoughts from the button above ⬆️</h5>
      </div>
    </div>
  );
}

export default QuoraBox;