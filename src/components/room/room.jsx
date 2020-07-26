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
    this.state = {
      socket: socket,
      username: username,
      roomId: roomId,
      roomChannel: undefined,
      usersList: [],
    };
    this.createOrJoin(request);
    console.log(this.state);
  }
  createOrJoin(request) {
      let socket = this.state.socket
      let username = this.state.username
      let roomId = this.state.roomId
      let usersList = []

      let roomChannel = socket.channel(roomId, {
        username: username,
        request,
      });

      roomChannel.join()
      .receive("ok", (response) => {
        console.log(username, "ok joined", response)
        usersList = response.user_list
        this.setState({
          roomChannel: roomChannel,
          usersList: usersList,
        });
      })
      .receive("error", (errorMessage) => {
        console.log(`to do: 
        1. some error pop up
        2. go back to lobby
        `,errorMessage)
      })
      roomChannel.onClose((closeMessage) => console.log("closeMessage: ",closeMessage));
      // return {
      //   channel: roomChannel,
      //   usersList
      // };


    // if (request === "create") {
    //   let roomChannel = socket.channel(roomId, {
    //     username: username,
    //     request,
    //   });
    //   roomChannel.join().receive("ok", (msg) => {
    //     console.log(username, "joined", roomId, "msg:", msg);
    //   });
    //   roomChannel.onClose((msg) => console.log(msg));
    //   return {
    //     channel: roomChannel,
    //     usersList: [username],
    //   };
    // }

    // // TODO:check if already in a room
    // // else if (request == "join") {
    // //   let UsersList = getUsersList(roomId);
    // // }
    // else {
    //   // get userslist from backend
    //   // show user list
    //   // show self

    // }
  }
  render() {
    return (
      <div className="room-userslist">
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
