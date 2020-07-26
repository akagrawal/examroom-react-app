import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";

class JoinRoomPopUp extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      room_id: null,
    };
  }

  render(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide={() => this.props.onHide(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Room ID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Description</h4>
          <p>Enter A Valid Room Id</p>
          <Form>
            <Form.Group>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Large text"
                onChange={(e) => {
                  console.log(e);
                  this.setState({ room_id: e.target.value });
                }}
              />
              <br />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              // onClick={
              //   () => console.log("submit clicked")
              //   // this.props.joinRoom(this.state.room_id)
              // }
            >
              Join
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default JoinRoomPopUp;
