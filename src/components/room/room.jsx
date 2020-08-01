import React from "react";
import User from "../user/user";
import MockTest from "./mock-test";
import Timer from "./timer";
import "./room.css";
class Room extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    console.log("constructor");
    let socket = this.props.location.userprops.socket;
    let username = this.props.location.userprops.username;
    let roomId = this.props.location.userprops.roomId;
    let request = this.props.location.userprops.request;
    let roomChannel = socket.channel(roomId, {
      username: username,
      request,
    });
    this.state = {
      socket: socket,
      username: username,
      roomId: roomId,
      roomChannel: roomChannel,
      usersList: [],
      testStarted: false,
      buttonText: "Start",
    };
    console.log(this.state);
  }

  componentWillUnmount() {
    console.log("component will unmount");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate", this.state);
  }
  componentDidMount() {
    let roomChannel = this.state.roomChannel;
    let username = this.state.username;
    let usersList = [];
    roomChannel
      .join()
      .receive("ok", (response) => {
        console.log(username, "ok joined", response);
        usersList = response.user_list;
        this.setState({
          usersList: usersList,
        });
        roomChannel.push("new_user", { body: username });
      })
      .receive("error", (errorMessage) => {
        console.log(
          `TODO: 
        1. some error pop up
        2. go back to lobby
        `,
          errorMessage
        );
      });
    roomChannel.on("new_user", (payload) => {
      console.log("New User", payload.username, "Joined");
      let newUser = payload.username;
      console.log(
        "add new user: ",
        newUser,
        "old user list",
        this.state.usersList
      );
      if (this.state.usersList.indexOf(newUser) === -1) {
        this.setState({ usersList: [...this.state.usersList, newUser] });
      }
    });

    roomChannel.on("start_test", (payload) => {
      console.log(payload);
    });

    roomChannel.onClose((closeMessage) =>
      console.log("closeMessage: ", closeMessage)
    );
  }

  startTest() {
    this.state.roomChannel.push("start_test", { body: this.state.roomId });
  }

  render(props) {
    console.log("render room", this.props);
    return (
      <div className="room">
        <div className="mock-test">
          <MockTest
            key={this.state.roomId}
            roomId={this.state.roomId}
          ></MockTest>
        </div>
        <div className="room-userslist">
          <div className="card">
            <div className="card-header">
              <div
                className="Title-Start"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h3>RoomId: {this.state.roomId}</h3>
                <button
                  type="button"
                  className="btn btn-outline-success w-40"
                  onClick={this.startTimer}
                >
                  {this.state.buttonText}
                </button>
              </div>
              <hr />
              <Timer></Timer>
            </div>
            <ul className="list-group list-group-flush">
              {this.state.usersList.map((username) => (
                <User key={username} username={username} />
              ))}
            </ul>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Room;
