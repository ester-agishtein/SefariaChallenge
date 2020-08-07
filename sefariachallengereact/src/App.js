import React, { Component } from "react";
import "./App.css";
import ApiData from "./ApiData";
import Maps from "./Map";
import { Slider } from "@material-ui/core";
import MockHeader from "./Header/MockHeader";
import { array } from "prop-types";
var HashMap = require("hashmap");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
      currentEra: "sinaiEra",
      sliderValue: -1313,

      sinaiEra: [],
      judgesEra: [],
      KingsAndProphetsEra: [],
      KessetHagedolahEra: [],
      TannaimEra: [],
      AmoraimEra: [],
      GeonimEra: [],
      RishonimEra: [],
      acharonimEra: []
    };
  }
  componentDidMount() {
    fetch("https://www.sefaria.org/api/index/")
      .then(response => response.json())
      .then(data => {
        let allData = Object.values(data);
        var categories = [];
        for (let item = 0; item < allData.length; item++) {
          categories.push(allData[item]["contents"]);
        }
        console.log("categories = ", categories);
        this.setState({ works: categories });
        this.setEraInfo(categories[0][0], "sinaiEra");

        // this.setEraInfo(categories[0][0], "sinaiEra");
        // this.setEraInfo(categories[0][1], "KingsAndProphetsEra");
        // this.setEraInfo(categories[0][2], "KessetHagedolahEra");
        // this.setEraInfo(categories[0][3]["contents"], "AmoraimEra");

        // //add up
        // this.setEraInfo(categories[0][4], "RishonimEra");
        // this.setEraInfo(categories[1][0], "RishonimEra");
        // //

        // //add up
        // this.setEraInfo(categories[1][2], "TannaimEra");
        // this.setEraInfo(categories[1][3], "TannaimEra");
        // this.setEraInfo(categories[1][4], "TannaimEra");
        // this.setEraInfo(categories[1][5], "TannaimEra");
        // //
        // this.setEraInfo(categories[1][6], "TannaimEra");

        // //add up
        // this.setEraInfo(categories[2][1], "AmoraimEra");
        // this.setEraInfo(categories[2][1], "AmoraimEra");
        // //

        // //add up
        // this.setEraInfo(categories[3][0], "AmoraimEra");
        // this.setEraInfo(categories[3][1], "AmoraimEra");
        // this.setEraInfo(categories[3][2], "AmoraimEra");
        // this.setEraInfo(categories[3][3], "AmoraimEra");
        //

        // all of four is achronim
      });
  }

  calculateYear(dateString) {
    let isNegative = false;
    if (dateString.includes("BC")) {
      isNegative = true;
    }

    let stripDate = date.replace("(c.", "");
    let arrDate = stripDate.split(" ");
    let year = "";
    for (let item in arrDate) {
      if (typeof item === "number") {
        year = item;
        if (isNegative == true) {
          year = year * -1;
        }
        return year;
      }
    }
  }
  async getBookData(title) {
    var url = "https://www.sefaria.org/api/index/" + title;
    const response = await fetch(url);
    const data = await response.json();
    var place = "";
    var date = "";
    if (data.hasOwnProperty("compPlaceString")) {
      place = data["compPlaceString"]["en"];
    }
    if (data.hasOwnProperty("compDateString")) {
      date = data["compDateString"]["en"];
    }

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

    let bookData = [place, date];

    return bookData;
  }

  async setEraInfo(categories, stateArray) {
    var contents = categories["contents"];
    // console.log("stateArray = ", stateArray);
    // console.log("contents = ", contents);
    let title = "";
    var bookInfoArray = [];
    for (let book in contents) {
      let map = new HashMap();
      if (contents[book].hasOwnProperty("title")) {
        title = contents[book]["title"];
      } else {
        title = contents[book]["contents"]["title"];
      }
      var bookData = await this.getBookData(title);
      map.set(title, bookData);
      bookInfoArray.push(map);
    }

    this.setState({
      [stateArray]: bookInfoArray
    });
  }

  marks = [
    {
      value: -1273,
      label: "Judges"
    },
    {
      value: -1003,
      label: "Kings & Prophets"
    },
    {
      value: -458,
      label: "Knesset Hagedolah"
    },
    {
      value: 10,
      label: "Tannaim"
    },
    {
      value: 210,
      label: "Amoraim"
    },
    {
      value: 656,
      label: "Geonim"
    },
    {
      value: 1038,
      label: "Rishonim"
    },
    {
      value: 1500,
      label: "Acharonim"
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
        <div>
          <MockHeader />
        </div>

        <h2 className="garamond">Explore the Timeline of Jewish History</h2>
        <Maps />

        <div className="margin_sides30">
          <Slider
            onChangeCommitted={this.handleValueChange}
            track={false}
            min={-1313}
            max={2020}
            marks={this.marks}
          />
        </div>

        {/* <ApiData /> */}
      </div>
    );
  }
}

export default App;
