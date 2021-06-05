import React from "react";
import axios from "axios";
import UserItemContext from "./UserItemContext";

class UserItem extends React.Component {
   value
  constructor() {
    super()
    this.state = {
      userNote: '',
      userName: '',
      dateCreated:'',
    };
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.txtareaChangedHandler = this.txtareaChangedHandler.bind(this);
  }
  data = localStorage.getItem("myData") || [];
  inputChangedHandler = (event) => {
    const updatedKeyword = event.target.value;
    this.setState({ username: updatedKeyword });
  };
  txtareaChangedHandler = (event) => {
    const updatedKeyword = event.target.value;
    this.setState({ usernote: updatedKeyword });
  };
  render() {
    let data = this.data;
    this.value = this.context;
    return (
      <li className="noteLists" id="List">
        <div className="date">
          <span>{this.value.userName}</span>
          <span>{this.value.date}</span>
        </div>
        <div>
          <span className="userNote">{this.value.content}</span>
        </div>
      </li>
    );
  }
}

UserItem.contextType = UserItemContext;
export default UserItem;
