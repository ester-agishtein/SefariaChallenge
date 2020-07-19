import "./App.css";
import ApiData from "./ApiData";
import mapPlaceholder from "./map.png";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      currentEra: "sinaiEra",

      sinaiEra: [],
      judgesEra: [],
      KingsAndProphetsEra: [],
      KnessetHagedolahEra: [],
      zugotEra: [],
      tannaimEra: [],
      amoraimEra: [],
      savoraimEra: [],
      geonimEra: [],
      rishonimEra: [],
      achronimEra: []
    };
  }

  render() {
    return (
      <div className="App">
        <h2 className="garamond">Explore the Timeline of Jewish History</h2>
        <img src={mapPlaceholder} />
        <ApiData />
        <div>*insert timeline here*</div>
      </div>
    );
  }
}

export default App;
