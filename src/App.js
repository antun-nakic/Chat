import React, { Component } from "react";
import Naslovna from "./components/Naslovna.js";
import ListaPoruka from "./components/ListaPoruka.js";
import UnosNovePoruke from "./components/UnosNovePoruke.js";
import Login from "./components/Login.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initalData = [
  { name: "Šime", time: "22:00", text: "Dobra večer" },
  { name: "Šime", time: "22:01", text: "Kako ste?" },
  { name: "Šime", time: "22:02", text: "Nadam se da ste dobro" },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poruke: [],
      login: false,
    };
  }

  dispatch = ({ type, payload }) => {
    switch (type) {
      case "INICIJALNO_PUNJENJE": {
        return this.setState({
          poruke: [...this.state.poruke, ...initalData],
        });
      }
      case "LOGIRANJE_OSOBE": {
        return this.setState({
          login: payload,
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
    this.dispatch({ type: "INICIJALNO_PUNJENJE" });
    console.log(this.state);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className='container'>
        <div className='col-md-10 mx-auto' style={{ marginTop: "20px" }}>
          {this.state.login ? (
            <>
              <Naslovna />
              <ListaPoruka
                lista={this.state.poruke}
                nickname={this.state.login}
              />
              <UnosNovePoruke
                dispatch={this.dispatch}
                nickname={this.state.login}
              />
            </>
          ) : (
            <Login dispatch={this.dispatch} />
          )}
        </div>
      </div>
    );
  }
}
