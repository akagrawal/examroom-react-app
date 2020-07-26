import React from "react";
import "./lobby.css";
import JoinRoomPopUp from "../pop_up/join_room_pop_up";
class Lobby extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: this.props.location.userprops.username,
      socket: this.props.location.userprops.socket,
      popup_show: false,
    };
  }
  //TODO:check if already created a room, leave current channel
  onCreateClick() {
    console.log(this.props);
    let roomId = "room" + Math.ceil(Math.random() * 1000); //room123
    console.log("create is clicked");
    this.props.history.push({
      pathname: "/" + roomId,
      userprops: {
        username: this.state.username,
        roomId: roomId,
        request: "create",
        socket: this.state.socket,
      },
    });
  }

  //TODO:check if already created a room, leave current channel
  onJoinClick() {
    console.log("joining a room");
    this.setPopUp(true);
  }
  setPopUp(show) {
    this.setState({ popup_show: show });
  }

  joinRoom(room_id) {
    console.log("try to join", room_id);
  }

  render() {
    return (
      <div className="room">
        <div className="h-50 p-1">
          <button
            type="button"
            className="h-100 btn btn-outline-dark btn-lg btn-block"
            onClick={() => this.onCreateClick()}
          >
            Create A Room
          </button>
        </div>
        <div className="h-50 p-1">
          <button
            type="button"
            className="h-100 btn btn-outline-dark btn-lg btn-block"
            onClick={() => this.onJoinClick()}
          >
            Join A Room
          </button>
        </div>
        <div>
          {this.state.popup_show == true && (
            <JoinRoomPopUp
              key="join_room_popup"
              show={this.state.popup_show}
              onHide={this.setPopUp.bind(this)}
              joinRoom={this.joinRoom.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Lobby;
