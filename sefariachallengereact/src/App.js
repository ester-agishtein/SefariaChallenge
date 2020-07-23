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
      sliderValue: -1313,

      sinaiEra: [],
      judgesEra: [],
      kingsAndProphetsEra: [],
      kessetHagedolahEra: [],
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

  handleValueChange = (event, sliderValue) => {
    let era = "acharonimEra";
    if (sliderValue < -1273) {
      era = "sinaiEra";
    } else if (sliderValue < -1003) {
      era = "judgesEra";
    } else if (sliderValue < -458) {
      era = "kingsAndProphetsEra";
    } else if (sliderValue < 10) {
      era = "knessetHagedolahEra";
    } else if (sliderValue < 210) {
      era = "tannaimEra";
    } else if (sliderValue < 656) {
      era = "amoraimEra";
    } else if (sliderValue < 1038) {
      era = "geonimEra";
    } else if (sliderValue < 1500) {
      era = "rishonimEra";
    }

    this.setState({ sliderValue });
    this.setState({ currentEra: era });
  };

  render() {
    return (
      <div className="App">

        <MockHeader/>
          
        <h2 className="garamond">Explore the Timeline of Jewish History</h2>
        <Maps/>

        <div className="margin_sides30">
          <Slider
            onChangeCommitted={this.handleValueChange}
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
