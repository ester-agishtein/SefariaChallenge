import React, { Component } from "react";

var HashMap = require("hashmap");
class ApiData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],

      sinaiEra: [],
      KingsAndProphetsEra: [],
      KnessetHagedolahEra: [],
      tannaimEra: [],
      amoraimEra: [],
      geonimEra: [],
      rishonimEra: [],
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
        this.setEraInfo(categories[0][0], "sinaiEra");
        this.setEraInfo(categories[0][1], "KingsAndProphetsEra");
      });
  }
  async getBookData(title) {
    var url = "https://www.sefaria.org/api/index/" + title;
    const response = await fetch(url);
    const data = await response.json();

    let bookData = [
      data["compPlaceString"]["en"],
      data["compDateString"]["en"]
    ];
    //place, date
    return bookData;
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
