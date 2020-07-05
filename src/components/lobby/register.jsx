import React from "react";
class Register extends React.Component {
  render() {
    return (
      <form className="Form-SignIn">
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
        <label for="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Username"
          required=""
          autofocus=""
        />
        <label for="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
        />
        <label for="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required=""
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="button"
          onClick={() => this.props.onChildClick(false)}
        >
          Register
        </button>
        <p id="23" className="toggle-msg">
          Already Regsitered ?
          <button
            id="login_button"
            className="btn"
            type="button"
            // id="goto_register1"
            onClick={() => this.props.onChildClick(true)}
          >
            Login
          </button>
        </p>
        <p className="mt-5 mb-3 text-muted">© 2017-2020</p>
      </form>
    );
  }
}

export default Register;

// sfc
