import React from "react";
import "./reception.css";
import Register from "./register";
import logo from "./logo.svg";
import Login from "./login";
import { Socket } from "phoenix";

class Reception extends React.Component {
  state = {};
  constructor() {
    super();
    let socket = this.initSocket();
    let channel = this.initChannel(socket, "reception");

    this.state = {
      login_page: true,
      socket: socket,
      channel: channel,
    };
  }
  initSocket() {
    let socket = new Socket("ws://192.168.43.240:4000/socket", {
      params: { user: "123" },
    });
    socket.connect();
    return socket;
  }
  initChannel(socket, channelName) {
    let channel = socket.channel(channelName, {});
    channel.join().receive("ok", () => {
      console.log("someone joined reception");
    });
    channel.onClose((msg) => console.log(msg));
    return channel;
  }
  setLoginPage(val) {
    this.setState({ login_page: val });
  }
  onLoginClick({ username, password }) {
    console.log("Login Clicked");
    this.state.channel
      .push("login", { username, password })
      .receive("ok", (response_map) => {
        this.onSuccessfulLogin(username);
        console.log(response_map);
      })
      .receive("error", (response) => {
        // document.getElementById("login_errormsg").style.display =
        //   "inline-block";
        // document.getElementById("login_errormsg").innerHTML = response.msg;
        console.log("reason:", response);
        // TODO arpit remove this function from here
        this.onSuccessfulLogin(username);
      });
    console.log(username, password);
  }
  onRegisterClick({ username, email, password }) {
    // console.log(username, email, password);
    this.state.channel
      .push("register", {
        username,
        email,
        password,
      })
      .receive("ok", (response) => {
        console.log(response.msg);
      })
      .receive("error", (response) => {
        // document.getElementById("reg_errormsg").style.display = "inline-block";
        // document.getElementById("reg_errormsg").innerHTML = response.msg;
        console.log(response);
      });
  }
  onSuccessfulLogin(username) {
    this.leaveReception();
    this.props.history.push({
      pathname: "/lobby",
      userprops: { username: username, socket: this.state.socket },
    });
  }
  leaveReception() {
    this.state.channel
      .leave()
      .receive("ok", (response) => {
        console.log(response);
      })
      .receive("error", (response) => {
        console.log(response);
      });
  }
  render() {
    console.log("reception rendered");
    return (
      <div className="Reception">
        <header className="Reception-header">
          <img src={logo} className="Reception-logo" alt="logo" />
        </header>
        {this.state.login_page === true && (
          <Login
            onChildClick={this.setLoginPage.bind(this)}
            onLoginClick={this.onLoginClick.bind(this)}
          />
        )}
        {this.state.login_page === false && (
          <Register
            onChildClick={this.setLoginPage.bind(this)}
            onRegisterClick={this.onRegisterClick.bind(this)}
          />
        )}
        <div className="dummy" />
      </div>
    );
  }
}
export default Reception;
