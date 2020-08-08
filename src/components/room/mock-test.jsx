import React from "react";

class MockTest extends React.Component{
  state = {};
  constructor(){
    super();
    this.state = {
      // questionBank will contain {questionId: {questionString, options:[]}}
      questionBank: [],
      //responses will contain quesitonId, optionId
      responses: [],
      score: 0
    }
  }
  render(){
    return (
      <h1>Hello, {this.props.roomId}, Test will be started soon... </h1>
    )
  }
}

export default MockTest;
