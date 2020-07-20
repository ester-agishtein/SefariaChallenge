import React, { Component } from "react";
import "./App.css";
import ApiData from "./ApiData";
import Maps from "./Map";
import { Slider } from '@material-ui/core';
import MockHeader from "./MockHeader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      currentEra: "sinaiEra",
      sliderValue: "",

      sinaiEra: [],
      judgesEra: [],
      KingsAndProphetsEra: [],
      KnessetHagedolahEra: [],
      tannaimEra: [],
      amoraimEra: [],
      geonimEra: [],
      rishonimEra: [],
      acharonimEra: []
    };
  }

  marks = [
    {
      value: -1273,
      label: 'Judges',
    },
    {
      value: -1003,
      label: 'Kings & Prophets',
    },
    {
      value: -458,
      label: 'Knesset Hagedolah',
    },
    {
      value: 10,
      label: 'Tannaim',
    },
    {
      value: 210,
      label: 'Amoraim',
    },
    {
      value: 656,
      label: 'Geonim',
    },
    {
      value: 1038,
      label: 'Rishonim',
    },
    {
      value: 1500,
      label: 'Acharonim',
    }
  ];

  render() {
    return (
      <div className="App">

        <MockHeader/>
          
        <h2 className="garamond">Explore the Timeline of Jewish History</h2>
        <Maps/>

        <div className="margin_sides30">
          <Slider
            //getAriaValueText={this.props.sliderValue}
            track={false}
            min={-1313}
            max={2020}
            marks={this.marks}
          />
        </div>

        <ApiData />
      </div>
    );
  }
}

export default App;
