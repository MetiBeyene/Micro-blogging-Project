import React from "react";
import "./App.css";
import UserForm from "./UserForm.js";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import Profile from "./Profile.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import UserListContext from "./UserListContext";
import UsersList from "./UserList";
import UserFormContext from "./UserFormContext";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "react-firebase-auth-provider";
import {
  FirestoreProvider,
} from "@react-firebase/firestore";

class App extends React.Component {
  config = {
    apiKey: "AIzaSyBA8tzwIfcVEgtXOCb_cfGxrjaDBWh-WXE",
    authDomain: "reactproject2-a7150.firebaseapp.com",
    databaseURL: "https://reactproject2-a7150-default-rtdb.firebaseio.com",
    projectId: "reactproject2-a7150",
    storageBucket: "reactproject2-a7150.appspot.com",
    messagingSenderId: "477739592835",
    appId: "1:477739592835:web:69b53ed037376074b7ffb6",
    measurementId: "G-1LZV7V7L0T",
  };
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: "",
      loading: false,
    };
  }
  async componentDidMount() {
    var snapshot = await firebase
      .firestore()
      .collection("tweets")
      .orderBy("date", "desc")
      .limit(3)
      .get();

    var message = snapshot.docs.map((doc) => {
      const message = doc.data();
      message.id = doc.id;
      return message;
    });
    this.setState({ users: message });
  }

  async handleOnAddUser(newUser) {
    this.setState({ loading: true });
    this.setState((state) => {
      return { users: [newUser, ...state.users], loading: false };
    });
  }

  render() {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;

    return (
      <FirebaseAuthProvider firebase={firebase} {...this.config}>
        <FirestoreProvider {...this.config} firebase={firebase}>
          <header className="App-header">
            <Router>
              <Switch>
                <Route path="/login">
                  <div className="navHolder">
                    <nav className="navigation">
                      <ul>
                        <li className="navContent">
                          <Link id="homepage" to="/">
                            Home
                          </Link>
                        </li>
                        <li className="navContent">
                          <Link to="/Profile">About</Link>
                        </li>
                        <li className="navContent">
                          <Link to="/Login">Login</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <h1>Login</h1>
                  <button
                    onClick={() => {
                      firebase
                        .auth()
                        .signInAnonymously()
                        .then((res) => {
                          document.getElementById("homepage").click();
                        });
                    }}
                  >
                    Sign In Anonymously
                  </button>
                </Route>
                <Route path="/Profile">
                  <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                      if (isSignedIn) {
                        return (
                          <React.Fragment>
                            <div className="navHolder">
                              <nav className="navigation">
                                <ul>
                                  <li className="navContent">
                                    <Link to="/">Home</Link>
                                  </li>
                                  <li className="navContent">
                                    <Link to="/Profile">About</Link>
                                  </li>
                                  <li className="navContent">
                                    <Link
                                      onClick={() => {
                                        firebase.auth().signOut();
                                      }}
                                    >
                                      Logout
                                    </Link>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                            <h1>Profile</h1>

                            <Profile />
                          </React.Fragment>
                        );
                      } else {
                        return <Redirect to="/login" />;
                      }
                    }}
                  </FirebaseAuthConsumer>
                </Route>
                <Route path="/">
                  <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                      if (isSignedIn) {
                        return (
                          <React.Fragment>
                            <div className="navHolder">
                              <nav className="navigation">
                                <ul>
                                  <li className="navContent">
                                    <Link to="/">Home</Link>
                                  </li>
                                  <li className="navContent">
                                    <Link to="/Profile">About</Link>
                                  </li>
                                  <li className="navContent">
                                    <Link
                                      onClick={() => {
                                        firebase.auth().signOut();
                                      }}
                                    >
                                      Logout
                                    </Link>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                            <div className="container">
                              <div className="main">
                                <UserFormContext.Provider
                                  value={{ message: this.state.message }}
                                >
                                  <UserForm
                                    onAddUser={(newUser) =>
                                      this.handleOnAddUser(newUser)
                                    }
                                  />
                                </UserFormContext.Provider>
                              </div>
                              <div className="sweet-loading">
                                <ClipLoader
                                  css={override}
                                  size={150}
                                  color={"#123abc"}
                                  loading={this.state.loading}
                                />
                              </div>
                              <UserListContext.Provider
                                value={{ users: this.state.users }}
                              >
                                <UsersList />
                              </UserListContext.Provider>
                            </div>
                          </React.Fragment>
                        );
                      } else {
                        return <Redirect to="/login" />;
                      }
                    }}
                  </FirebaseAuthConsumer>
                </Route>
              </Switch>
            </Router>
          </header>
        </FirestoreProvider>
      </FirebaseAuthProvider>
    );
  }
}

export default App;
