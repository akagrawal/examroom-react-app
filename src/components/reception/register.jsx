import React from "react";
class Register extends React.Component {
  render() {
    return (
      <form className="signin-box">
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-input"
          placeholder="Username"
          required=""
          autoFocus=""
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-input"
          placeholder="Email address"
          required=""
          autoFocus=""
          onChange={(e) => this.setState({ email: e.target.value })}
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
        <button
          className="btn btn-outline-dark btn-lg btn-block"
          type="button"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            width: "30%",
          }}
          onClick={() => this.props.onRegisterClick(this.state)}
        >
          Register
        </button>
        <p id="23" className="toggle-msg">
          Already Regsitered ?
          <button
            id="login_button"
            className="btn"
            type="button"
            style={{ color: "orange", fontSize: "25px" }}
            onClick={() => this.props.onChildClick(true)}
          >
            Login
          </button>
        </p>
      </form>
    );
  }
}

export default Register;

// sfc
