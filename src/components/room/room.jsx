import React from "react";
import User from "../user/user";
import "./room.css";
class Room extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    let socket = this.props.location.userprops.socket;
    let username = this.props.location.userprops.username;
    let roomId = this.props.location.userprops.roomId;
    let request = this.props.location.userprops.request;
    let channelInfo = this.createOrJoin(username, roomId, request, socket);
    this.state = {
      socket: socket,
      username: username,
      roomId: roomId,
      roomChannel: channelInfo.channel,
      usersList: channelInfo.userList,
    };
    console.log(this.state);
  }
  createOrJoin(username, roomId, request, socket) {
    if (request == "create") {
      let roomChannel = socket.channel(roomId, {
        username: username,
      });
      roomChannel.join().receive("ok", () => {
        console.log(username, "joined", roomId);
      });
      roomChannel.onClose((msg) => console.log(msg));
      return {
        channel: roomChannel,
        userList: [username],
      };
    }

    // TODO:check if already in a room
    // else if (request == "join") {
    //   let UsersList = getUsersList(roomId);
    // }
    else {
      // do nothing as of now
    }
  }
  render() {
    return (
      <div className="room-userlist">
        <div className="card">
          <div className="card-header"> RoomId: {this.state.roomId} </div>
          <ul className="list-group list-group-flush">
            {this.state.usersList.map((username) => (
              <User key={username} username={username} />
            ))}
          </ul>
        </div>
        <button type="button" className="btn btn-outline-success btn-block">
          Start
        </button>
      </div>
    );
  }
}
export default Room;
