import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import moment from "moment";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      poper: false,
    };
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  }

  check = () => {
    let time = moment().format("Do MMMM h:mm a");
    if (this.state.name === "") {
      this.setState({
        poper: true,
      });
    } else {
      this.props.history.push(`/MCQPage/${this.state.name}/${time}`)
    }
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <div className="logoDiv">
          <h1 className="logo">Trivia App</h1>
        </div>
        <div className="inputNamediv">
          <h3 style={{ fontSize: "30px", color: "#262626" }}>What is your name ?</h3>
          <input className="inputName" style={{ marginTop: "60px" }} type="text" placeholder="Name" value={name} onChange={this.handleChange} />
          <Button variant="contained" size="small" onClick={() => this.check()}>
            Let's Play
          </Button>
          {
            this.state.poper && <p style={{ marginTop: "40px", color: "#ff3b3b" }}>Please enter your name</p>
          }
        </div>
      </div>
    );
  }
}

export default App;