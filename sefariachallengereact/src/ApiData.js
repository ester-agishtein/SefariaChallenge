import React, { Component } from "react";

class ApiData extends Component {
  constructor(props) {
    super(props);
    this.state = {

      /*
      sections still to do:

      midrash
      kaballah
      philosophy
      chasidut
      musar
      */

      books: [],
      sinaiEra: [
        { "Five Books of Torah": [["God", "Moses"], "-1313", "Mount Sinai"] }
      ],
      judgesEra: [],
      kingsAndProphetsEra: [],
      knessetHagedolahEra: [],
      tannaimEra: [
        { "Mishnei":[["Yehudah HaNasi"], "210", "Talmudic Israel"] }
      ],
      amoraimEra: [
        { "Talmud Bavli":[[], "500", "Talmudic Babylon"] },
        { "Talmud Yerushalmi":[[], "400", "Talmudic Israel"] }
      ],
      geonimEra: [],
      rishonimEra: [
        { "Mishneh Torah":[["Rambam"], "1177", "Middle-Age Egypt"] },
        { "Shulchan Arukh":[["Joseph Karo"], "1565", "Venice"] }
      ],
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
        this.addBook(categories[0][1]["contents"]);  //neveim
        this.addBook(categories[0][2]["contents"]);  //ketuvim
        this.addBook(categories[4]);                 //halacha
        console.log(categories);
      })
      .then(this.populateData);
  }

  addBook(data) {
    let books = data;
    let booksArray = [];
    for (let book in books) {
      let title = books[book]["title"];
      if (title != undefined) {
        booksArray.push(title);
      }
    }
    let allBooks = this.state.books.concat(booksArray);
    this.setState({ books: allBooks });
  }

  getEraFromYear(year) {
    let era = "acharonimEra";
    if (year < -1273) {
      era = "sinaiEra";
    } else if (year < -890) {
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
    let urlTitle = title.replace(" ", "%20");
    var url = "https://www.sefaria.org/api/v2/raw/index/" + urlTitle;
    const response = await fetch(url);
    const data = await response.json();

    let bookData = {
      [title]: [data["authors"], data["compDate"], data["compPlace"]]
    };

    let era = this.getEraFromYear(data["compDate"]);
    let currState = this.state[era];
    this.setState({ [era]: currState.concat(bookData) });
  }

  populateData = () => {
    for (let book in this.state.books) {
      this.getBookData(this.state.books[book]);
    }
  };

  render() {
    return <></>;
  }
}

export default ApiData;
