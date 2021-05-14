import React, { Component } from "react";
import Naslovna from "./components/Naslovna.js";
import ListaPoruka from "./components/ListaPoruka.js";
import UnosNovePoruke from "./components/UnosNovePoruke.js";
import Login from "./components/Login.js";
import ListaSudionika from "./components/ListaSudionika";
import Logout from "./components/Logout";
import ListaSoba from "./components/ListaSoba";
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
      porukeGeneral: [],
      porukePlavi: [],
      porukeCrveni: [],
      porukeZuti: [],
      porukeZeleni: [],
      sobe: ["GENERAL", "PLAVI", "CRVENI", "ZUTI", "ZELENI"],
      trenutnaSoba: "GENERAL",
      logirani: [],
      login: false,
    };

    channel.bind("client-nova-poruka", (data) => {
      let payload = { name: data.name, text: data.text, time: data.time };
      this.dispatch({ type: `DODAVANJE_PORUKE_${data.channel}`, payload });
    });
    channel.bind("client-login", (data) => {
      if (this.state.logirani.indexOf(data) === -1) {
        this.dispatch({ type: "NOVI_LOGIRANI", payload: data });
      }
    });
    channel.bind("client-logout", (data) => {
      if (this.state.logirani.indexOf(data) !== -1) {
        this.dispatch({ type: "IZBACI_LOGIRANOG", payload: data });
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
      case "IZBACI_LOGIRANOG": {
        let novoStanje = this.state.logirani.filter(
          (logiran) => logiran !== payload
        );
        return this.setState({
          logirani: novoStanje,
        });
      }
      case "DODAVANJE_PORUKE_GENERAL": {
        return this.setState({
          porukeGeneral: [...this.state.porukeGeneral, payload],
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
    }, 500000);
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
                  lista={this.state.porukeGeneral}
                  nickname={this.state.login}
                />
                <div className='sidebar'>
                  <ListaSudionika lista={this.state.logirani} />
                  <ListaSoba sobe={this.state.sobe} />
                  <Logout kanal={channel} nickname={this.state.login} />
                </div>
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
