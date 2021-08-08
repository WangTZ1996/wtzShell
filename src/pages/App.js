import React from "react";
import "./App.css";

export default class App extends React.Component {
  state = {
    command: [
      "welcome to wtzBash !",
      "...",
      "you can input cmd \n open <url> \n to test",
    ],
  };
  input(cmd) {
    if (cmd.code === "Enter") {
      let newData = this.state.command;
      newData.push(cmd.target.value);
      this.setState({ command: newData });
      this.cmdParser(cmd.target.value);
      cmd.target.value = "";
    }
  }
  cmdParser(cmd) {
    const cmdList = cmd.split(" ");
    let newData = this.state.command;
    if (cmdList[0] === "open") {
      if (!cmdList[1]) {
        newData.push(`Sorry: second parameter is missing`);
      } else {
        const url = `http://${cmdList[1]}`;
        newData.push(`ROSTER! READY TO GO...`);
        newData.push(`>>>`);
        setTimeout(() => {
          window.location.href = url;
        }, 2000);
      }
    } else if (cmdList[0] === "version") {
      newData.push(`V 1.0.0`);
    } else if (cmdList[0] === "clear") {
      this.setState({ command: ["welcome to wtzBash !", "..."] });
    } else if (cmdList[0] === "help") {
      newData.push(`version     --show shell version`);
      newData.push(`open <url>     --open any website url`);
      newData.push(`clear     --clear the screen`);
    } else {
      newData.push(`unknown command ${cmdList[0]}`);
    }
  }
  render() {
    let value;
    return (
      <div className="App" style={{ background: "#000" }}>
        {this.state.command.map((cmd) => {
          return (
            <div
              style={{ color: "#fff", padding: "0 12px", fontSize: "20px" }}
              key={cmd.toString()}
            >
              {cmd}
            </div>
          );
        })}
        <div className="commandInput">
          <input
            autoFocus
            value={value}
            onKeyPress={this.input.bind(this)}
            style={{
              border: "none",
              width: "100%",
              color: "#fff",
              background: "#000",
              padding: "0 12px",
              fontSize: "20px",
            }}
          />
        </div>
      </div>
    );
  }
}
