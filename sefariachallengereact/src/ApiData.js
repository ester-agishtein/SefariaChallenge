import React, { Component } from "react";

var HashMap = require("hashmap");
class ApiData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: ["Kuzari"],

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

  
  componentDidMount() {
    /*
    fetch("https://www.sefaria.org/api/index/")
      .then(response => response.json())
      .then(data => {
        let allData = Object.values(data);
        var categories = [];
        for (let item = 0; item < allData.length; item++) {
          categories.push(allData[item]["contents"]);
        }
        console.log("categories = ", categories);
        this.setEraInfo(categories[0][0], "sinaiEra");
        this.setEraInfo(categories[0][1], "KingsAndProphetsEra");
      });
      */


      //lets say we hypothetically have all the titles we want in the "books" state
      for (const title of this.state.books) {
        this.getBookData(title)
      }
  }

  getEraFromYear = (year) => {
    let era = "acharonimEra";
    if (year < -1273) {
      era = "sinaiEra";
    } else if (year < -1003) {
      era = "judgesEra";
    } else if (year < -458) {
      era = "kingsAndProphetsEra";
    } else if (year < 10) {
      era = "knessetHagedolahEra";
    } else if (year < 210) {
      era = "tannaimEra";
    } else if (year < 656) {
      era = "amoraimEra";
    } else if (year < 1038) {
      era = "geonimEra";
    } else if (year < 1500) {
      era = "rishonimEra";
    }

    return era;
  };

  async getBookData(title) {
    var url = "https://www.sefaria.org/api/v2/raw/index/" + title;
    const response = await fetch(url);
    const data = await response.json();

    let bookData = {
      [title]: [
        data["authors"],
        data["compDate"],
        data["compPlace"]
      ]
    };

    let era = this.getEraFromYear(data["compDate"])
    let currState = this.state[era]
    this.setState({[era]: currState.concat(bookData)})
  }

  async setEraInfo(categories, stateArray) {
    var contents = categories["contents"];
    var bookInfoArray = [];
    for (let book in contents) {
      let map = new HashMap();
      let title = contents[book]["title"];
      var bookData = await this.getBookData(title);
      map.set(title, bookData);
      bookInfoArray.push(map);
    }

    this.setState({ [stateArray]: bookInfoArray });
  }

  render() {
    return <div></div>;
  }
}

export default ApiData;
