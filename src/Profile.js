import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName:props.userName,
        };
     
      }
      handleUsernameChange(event){
        this.setState({ userName: event.target.value })
      }
handleSubmit(){
    this.setState({username:this.state.userName})
    let data= this.state.userName
    localStorage.setItem('myData',data)
}


      render() {
        return (
          <form onSubmit={() => this.handleSubmit()} className="usernameForm" >
            <div>
                <label >User Name</label><br></br>
            <input
                type="text"
                id="username"
                value={this.state.username}
                onChange={(event) => this.handleUsernameChange(event)}
              />
            </div>
            <div className="main">
              <button disabled={this.state.disableButton} type="submit" className="button">Save</button>
            </div>
          </form>
        )
      }}


      export default Profile