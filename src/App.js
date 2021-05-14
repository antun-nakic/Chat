import React, { Component } from "react";
import Naslovna from "./components/Naslovna.js";
import ListaPoruka from "./components/ListaPoruka.js";
import UnosNovePoruke from "./components/UnosNovePoruke.js";
import Login from "./components/Login.js";
import ListaSudionika from "./components/ListaSudionika";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pusher from "pusher-js";

Pusher.logToConsole = true;

var pusher = new Pusher("42ad0b9050bf33f88f75", {
  appId: "1201564",
  key: "42ad0b9050bf33f88f75",
  secret: "d9df89a4bccb6b5880ef",
  cluster: "eu",
  useTLS: true,
});

var channel = pusher.subscribe("private-general-chat");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poruke: [],
      logirani: [],
      login: false,
    };

    channel.bind("client-nova-poruka", (data) => {
      this.dispatch({ type: "DODAVANJE_PORUKE", payload: data });
    });
    channel.bind("client-login", (data) => {
      if (this.state.logirani.indexOf(data) === -1) {
        this.dispatch({ type: "NOVI_LOGIRANI", payload: data });
      }
    });
  }

  dispatch = ({ type, payload }) => {
    switch (type) {
      case "LOGIRANJE_OSOBE": {
        return this.setState({
          login: payload,
        });
      }
      case "NOVI_LOGIRANI": {
        return this.setState({
          logirani: [...this.state.logirani, payload],
        });
      }
      case "DODAVANJE_PORUKE": {
        return this.setState({
          poruke: [...this.state.poruke, payload],
        });
      }
    }
  };

  componentDidMount() {
    console.log(this.state);
  }

  componentDidUpdate() {
    setTimeout(() => {
      channel.trigger("client-login", this.state.login);
    }, 10000);
  }

  render() {
    return (
      <div className='container'>
        <div className='col-md-10 mx-auto' style={{ marginTop: "20px" }}>
          {this.state.login ? (
            <>
              <Naslovna />
              <div className='sredisnji-dio'>
                <ListaPoruka
                  lista={this.state.poruke}
                  nickname={this.state.login}
                />
                <ListaSudionika lista={this.state.logirani} />
              </div>
              <UnosNovePoruke
                dispatch={this.dispatch}
                nickname={this.state.login}
                kanal={channel}
              />
            </>
          ) : (
            <Login dispatch={this.dispatch} kanal={channel} />
          )}
        </div>
      </div>
    );
  }
}
