import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName:props.userName,

        };
     
      }
      handleEmailChange(event){
        this.setState({ email: event.target.value })
      }
      handlePasswordChange(event){
        this.setState({ password: event.target.value })
      }
handleSubmit(){
    this.setState({email:this.state.u})
    let data= this.state.userName
    localStorage.setItem('myData',data)
}


      render() {
        return (
          <form onSubmit={() => this.handleSubmit()} className="" >
            <div>
                <label >Login</label><br></br>
            <input
                type="email"
                id="email"
                value={this.state.value}
                onChange={(event) => this.handleEmailChange(event)}
                placeholder="Enter Email"
              />
               <label >Password</label><br></br>
               <input
                type="password"
                id="password"
                value={this.state.value}
                onChange={(event) => this.handleEmailChange(event)}
                placeholder="Password"
              />

            </div>
            
            <div className="main">
              <button  type="submit" className="button">Login</button>
            </div>
          </form>
        )
      }}


      export default Login