import React from "react";
import User from "../user/user";
import MockTest from "./mock-test";
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
      readies: [],
      testStarted: false,
      buttonText: "Ready",
      remainingTime: 0,
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
    let readies = [];
    roomChannel
      .join()
      .receive("ok", (response) => {
        console.log(username, "ok joined", response);
        usersList = response.user_list;
        readies = response.readies;
        this.setState({
          usersList: usersList,
          readies: readies,
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

    roomChannel.on("ready_ack", (payload) => {
      let readyUser = payload.user_name;
      if (this.state.readies.indexOf(readyUser) == -1) {
        this.setState({ readies: [...this.state.readies, readyUser] });
      }
      console.log("ready_ack...", payload);
      console.log("state...", this.state);
      // this.setState({testStarted:true, remainingTime:payload.remaining_time, buttonText})
    });
    roomChannel.on("start_test", (payload) => {
      console.log("start_test...", payload);
      this.setState({
        testStarted: true,
        remainingTime: payload.remaining_time,
      });
    });
    roomChannel.on("update_timer", (payload) => {
      console.log("update_time...", payload);
      this.setState({
        remainingTime: payload.remaining_time,
      });
    });
    roomChannel.on("end_test", (payload) => {
      console.log("end_test", payload);
      this.setState({
        testStarted: false,
        remainingTime: payload.remaining_time,
      });
    });

    roomChannel.onClose((closeMessage) =>
      console.log("closeMessage: ", closeMessage)
    );
  }
  // client API
  handleTestButtonClick() {
    if (this.state.testStarted == true) {
      // leave/stop the room, send to lobby
    } else {
      this.state.roomChannel.push("ready", {
        roomId: this.state.roomId,
        username: this.state.username,
      });
    }
  }

  Timer() {
    if (this.state.testStarted == false) {
      return <div></div>;
    } else {
      let remaining_time = this.state.remainingTime;
      let remaining_hour = Math.floor(remaining_time / 3600);

      let remaining_min = Math.floor(remaining_time / 60) - remaining_hour * 60;
      let remaining_sec =
        remaining_time - remaining_hour * 3600 - remaining_min * 60;
      if (remaining_hour <= 9) {
        remaining_hour = "0" + remaining_hour;
      }
      if (remaining_min <= 9) {
        remaining_min = "0" + remaining_min;
      }
      if (remaining_sec <= 9) {
        remaining_sec = "0" + remaining_sec;
      }
      let time = remaining_hour + ":" + remaining_min + ":" + remaining_sec;
      return <div className="timer">
        <hr style = {{marginBottom: "0px"}}/>
        {time}
        </div>;
    }
  }
  getUserBackGroundColor(username) {
    if (this.state.readies.indexOf(username) == -1) {
      return "light";
    } else {
      return "success";
    }
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
            <div className="card-header pl-1 pr-1 pb-0">
              <div
                className="Title-Start pl-1 pr-1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <h3>{this.state.roomId}</h3>
                <button
                  type="button"
                  className="btn btn-outline-success w-40 mb-2"
                  onClick={() => this.handleTestButtonClick()}
                >
                  {this.state.buttonText}
                </button>
              </div>
              {this.Timer()}
            </div>
            <ul className="list-group list-group-flush">
              {this.state.usersList.map((username) => (
                <div className = "p-1">
                <User
                  key={username}
                  username={username}
                  backGroundColor={this.getUserBackGroundColor.bind(this)}
                /></div>
              ))}
            </ul>
            {/* <div className="card-footer"></div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Room;
