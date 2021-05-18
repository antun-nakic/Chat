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
import { Switch, Route, Redirect } from "react-router-dom";

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
      porukePrivatne: [],
      porukeGeneral: [],
      porukePlavi: [],
      porukeCrveni: [],
      porukeZuti: [],
      porukeZeleni: [],
      sobe: ["GENERAL", "PLAVI", "CRVENI", "ZUTI", "ZELENI"], //iva
      trenutnaSoba: ["GENERAL", 0],
      logirani: [],
      login: false,
    };

    channel.bind("client-start-private-chat", (data) => {
      if (data.target === this.state.login) {
        let payload = data.initiator;
        this.dispatch({ type: `DODAVANJE_PRIVATNOG_CHATA`, payload });
      }
    });
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
      case "PROMJENA_SOBE": {
        return this.setState({
          trenutnaSoba: payload,
        });
      }
      case "DODAVANJE_PRIVATNOG_CHATA": {
        return this.setState({
          sobe: [...this.state.sobe, payload],
        });
      }
      case "DODAVANJE_PORUKE_GENERAL": {
        return this.setState({
          porukeGeneral: [...this.state.porukeGeneral, payload],
        });
      }
      case "DODAVANJE_PORUKE_PLAVI": {
        return this.setState({
          porukePlavi: [...this.state.porukePlavi, payload],
        });
      }
      case "DODAVANJE_PORUKE_CRVENI": {
        return this.setState({
          porukeCrveni: [...this.state.porukeCrveni, payload],
        });
      }
      case "DODAVANJE_PORUKE_ZUTI": {
        return this.setState({
          porukeZuti: [...this.state.porukeZuti, payload],
        });
      }
      case "DODAVANJE_PORUKE_ZELENI": {
        return this.setState({
          porukeZeleni: [...this.state.porukeZeleni, payload],
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
          <Switch>
            <Route exact path='/'>
              {this.state.login ? (
                <>
                  <Naslovna />
                  <div className='sredisnji-dio'>
                    <ListaPoruka
                      lista={[
                        this.state.porukeGeneral,
                        this.state.porukePlavi,
                        this.state.porukeCrveni,
                        this.state.porukeZuti,
                        this.state.porukeZeleni,
                        this.state.porukePrivatne,
                      ]}
                      Soba={this.state.trenutnaSoba}
                      nickname={this.state.login}
                    />
                    <div className='sidebar'>
                      <ListaSudionika
                        lista={this.state.logirani}
                        dispatch={this.dispatch}
                        nickname={this.state.login}
                        kanal={channel}
                      />
                      <ListaSoba
                        sobe={this.state.sobe}
                        dispatch={this.dispatch}
                      />
                      <Logout kanal={channel} nickname={this.state.login} />
                    </div>
                  </div>
                  <UnosNovePoruke
                    dispatch={this.dispatch}
                    nickname={this.state.login}
                    kanal={channel}
                    trenutnaSoba={this.state.trenutnaSoba}
                  />
                </>
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                  }}
                />
              )}
            </Route>
            <Route path='/login'>
              {this.state.login ? (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              ) : (
                <Login dispatch={this.dispatch} kanal={channel} />
              )}
            </Route>
          </Switch>
          {/* {this.state.login ? (
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
          )} */}
        </div>
      </div>
    );
  }
}
