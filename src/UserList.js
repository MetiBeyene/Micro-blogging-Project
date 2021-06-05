import React from "react";
import UserItem from "./UserItem.js";
import UserListContext from "./UserListContext.js";
import UserItemContext from "./UserItemContext.js";

class UsersList extends React.Component {
  value;
  constructor() {
    super()
    this.state = {
      userNote: "",
      userName: "",
    };
  }

  handleOnRemove(newUpdate) {
    this.props.removeNote(newUpdate);
  }
  render() {
    this.value = this.context

    return (
      <div className="Notes" my={200}>
        <ul className="lists">
          
          {this.value.users.map((user) => (
            <UserItemContext.Provider value={user}>
              <UserItem/>
              </UserItemContext.Provider>
          ))}
        </ul>
      </div>
    );
  }
}
UsersList.contextType = UserListContext
export default UsersList;
