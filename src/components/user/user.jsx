import React from "react";
import Card from "react-bootstrap/Card";
class User extends React.Component {
  render() {
    return (
      <Card
        bg={this.props.backGroundColor(this.props.username)}
        style={{ width: "100%",padding: "1px"}}
        text={
          this.props.backGroundColor(this.props.username) === "light"
            ? "dark"
            : "white"
        }
      >
        <Card.Body>
          <Card.Title>{this.props.username}</Card.Title>
          {/* <Card.Text>Desciption of user...</Card.Text> */}
        </Card.Body>
      </Card>
    );
  }
}

export default User;
