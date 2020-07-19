<<<<<<< HEAD
import React from "react";
import "./App.css";
import ApiData from "./ApiData";
function App() {
  return (
    <div className="App">
      <h1>Sefaria</h1>
      <ApiData />
    </div>
  );
=======
import React, {Component} from 'react';
import './App.css';
import mapPlaceholder from './map.png';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      works: [],
      currentEra: 'sinaiEra',

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
      achronimEra: [],
    }
  }

  render() {
    return (
      <div className="App">
        <h2 className="garamond">Explore the Timeline of Jewish History</h2>

        <img src={mapPlaceholder}/>
        <div>*insert timeline here*</div>
      </div>
    )
  }
>>>>>>> 34ee4b97fb08c71d259f48daf6e48c55e343f23d
}

export default App;
