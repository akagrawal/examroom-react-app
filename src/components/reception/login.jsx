import React from "react";
import "./reception.css";
class Login extends React.Component {
  getEmailId() {
    document.getElementById("inputEmail");
  }
  getPassword() {
    document.getElementById("inputPassword");
  }
  render(props) {
    return (
      <div className="signin-box">
        <h1 className="h3 m-3 font-weight-normal" style={{ color: "black" }}>
          Please sign in
        </h1>
        <label htmlFor="username" className="sr-only">
          UserName
        </label>
        <input
          type="text"
          id="username"
          className="form-input"
          placeholder="username"
          required=""
          autoFocus=""
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-input"
          placeholder="Password"
          required=""
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <div className="checkbox mb-1 mt-3">
          <label className="checkbox-label">
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="btn btn-outline-dark btn-lg btn-block mb-3"
          type="submit"
          style={{ width: "30%" }}
          onClick={() => this.props.onLoginClick(this.state)}
        >
          Login
        </button>
        <p id="23" className="toggle-msg">
          New to Examroom?{" "}
          <button
            id="register_button"
            className="btn"
            type="button"
            style={{ color: "orange", fontSize: "25px" }}
            onClick={() => this.props.onChildClick(false)}
          >
            Register
          </button>
        </p>
      </div>
    );
  }
}
export default Login;
