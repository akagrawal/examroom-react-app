import React from "react";

class User extends React.Component {
  render() {
    return (
      <div className="card" style={{ width: "100%" }}>
        <li className="list-group-item">{this.props.username}</li>
      </div>
    );
  }
}

export default User;
