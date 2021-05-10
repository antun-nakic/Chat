import React, { Component } from "react";
import Naslovna from "./components/Naslovna.js";
import ListaPoruka from "./components/ListaPoruka.js";
import UnosNovePoruke from "./components/UnosNovePoruke.js";
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
    };
  }

  dispatch = ({ type, payload }) => {
    switch (type) {
      case "INICIJALNO_PUNJENJE": {
        return this.setState({
          poruke: [...this.state.poruke, ...initalData],
        });
      }
      case "DODAVANJE_PORUKE": {
        return this.setState({
          poruke: [...this.state.poruke, payload],
        });
      }
    }
  };

  proslijedi = (novaPoruka) => {
    let name = "Me";
    let time = new Date();
    let formatedTime =
      String(time.getHours()) + ":" + String(time.getMinutes());
    this.dispatch({
      type: "DODAVANJE_PORUKE",
      payload: { name: name, time: formatedTime, text: novaPoruka },
    });
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
        <div className='col-md-10 mx-auto'>
          <Naslovna />
          <ListaPoruka lista={this.state.poruke} />
          <UnosNovePoruke funkcija={this.proslijedi} />
        </div>
      </div>
    );
  }
}
