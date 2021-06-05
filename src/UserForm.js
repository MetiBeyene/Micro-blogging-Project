import React from "react";
import moment from "moment";
import UserFormContext from "./UserFormContext";

class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNote: "",
      userName: localStorage.getItem("myData"),
      disableButton: false,
    };
  }
  handleUsernoteChange(event) {
    if (event.target.value.length > 140) {
      this.setState({ disableButton: true });
    } else {
      this.setState({ disableButton: false });
    }
    this.setState({ userNote: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      content: this.state.userNote,
      date: moment().format(),
      userName: this.state.userName,
    };
    this.props.onAddUser(newUser);
    this.setState({ usernote: "" });
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="textarea-container">
          <textarea
            type="text"
            name="usernote"
            className="textarea"
            id="usernote"
            value={this.state.userNote}
            onChange={(event) => this.handleUsernoteChange(event)}
          />
          <span>{this.props.message}</span>
          <div className="main">
            <button
              disabled={this.state.disableButton}
              type="submit"
              className="button"
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    );
  }
}
AddUserForm.contextType = UserFormContext

export default AddUserForm;
