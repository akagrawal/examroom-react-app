import React from "react";
import "./lobby.css";
import Register from "./register";
import logo from "./logo.svg";
import Login from "./login";
class Lobby extends React.Component {
  state = {};
  constructor(props) {
    console.log("constructor");
    console.log(props);
    super(props);
    this.state = {
      login_page: true,
      a: "b",
    };
  }
  setLoginPage(val) {
    this.setState({ login_page: val });
  }
  render() {
    console.log("lobby rendered");
    return (
      <div className="Lobby">
        <header className="Lobby-header">
          <img src={logo} className="Lobby-logo" alt="logo" />
        </header>
        {this.state.login_page == true && (
          <Login onChildClick={this.setLoginPage.bind(this)} />
        )}
        {this.state.login_page == false && (
          <Register onChildClick={this.setLoginPage.bind(this)} />
        )}
      </div>
    );
  }
}
export default Lobby;
