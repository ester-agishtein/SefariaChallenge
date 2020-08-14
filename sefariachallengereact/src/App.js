import React, { Component } from "react";
import "./App.css";
import Maps from "./Map";
import { Slider } from "@material-ui/core";
import MockHeader from "./Header/MockHeader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEra: "sinaiEra",
      sliderValue: -1313,

      /*
      
      sections we should discuss what to do with:
      midrash
        -> because like, do we do them all seporately? do we do all the "midrash rabbah" seporately?
      chasidut
        -> just early works? or is that segregation and not nice?

      the ones I decided not to add, but we alway can:
      Tanaitic
      Responsa
      Apocrypha
      Modern Works
      Other (but tbh some of this stuff looks kind of intresting)

      */

      books: [],
      sinaiEra: [
        { "Five Books of Torah": [["God", "Moses"], "-1313", "Mount Sinai"] }
      ],
      judgesEra: [],
      kingsAndProphetsEra: [],
      knessetHagedolahEra: [],
      tannaimEra: [{ Mishnei: [["Yehudah HaNasi"], "210", "Talmudic Israel"] }],
      amoraimEra: [
        { "Talmud Bavli": [[], "500", "Talmudic Babylon"] },
        { "Talmud Yerushalmi": [[], "400", "Talmudic Israel"] }
      ],
      geonimEra: [],
      rishonimEra: [
        { "Mishneh Torah": [["Rambam"], "1177", "Middle-Age Egypt"] },
        { "Shulchan Arukh": [["Joseph Karo"], "1565", "Venice"] }
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
        this.addBook(categories[0][1]["contents"]); //neveim
        this.addBook(categories[0][2]["contents"]); //ketuvim
        this.addBook(categories[4]); //halacha
        this.addBook(categories[5]); //kabbalah
        this.addBook(categories[7]); //philosophy
        this.addBook(categories[10]); //musar
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
  }

  async getBookData(title) {
    let urlTitle = title.replace(" ", "%20");
    var url = "https://www.sefaria.org/api/v2/raw/index/" + urlTitle;
    const response = await fetch(url);
    const data = await response.json();

    let bookData = {
      [title]: [data["authors"], data["compDate"], data["compPlace"]]
    };

    if (
      data["compPlace"] != undefined &&
      data["compPlace"] != "" &&
      data["compDate"] != undefined &&
      data["compDate"] != ""
    ) {
      let era = this.getEraFromYear(data["compDate"]);
      let currState = this.state[era];
      this.setState({ [era]: currState.concat(bookData) });
    }
  }

  populateData = () => {
    for (let book in this.state.books) {
      this.getBookData(this.state.books[book]);
    }
  };

  marks = [
    { value: -1273, label: "Judges" },
    { value: -1003, label: "Kings & Prophets" },
    { value: -458, label: "Knesset Hagedolah" },
    { value: 10, label: "Tannaim" },
    { value: 210, label: "Amoraim" },
    { value: 656, label: "Geonim" },
    { value: 1038, label: "Rishonim" },
    { value: 1500, label: "Acharonim" }
  ];

  handleSliderChange = (event, sliderValue) => {
    let era = this.getEraFromYear(sliderValue);

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
        <Maps books={this.state[this.state.currentEra]} />

        <div className="margin_sides30">
          <Slider
            onChangeCommitted={this.handleSliderChange}
            track={false}
            min={-1313}
            max={2020}
            marks={this.marks}
          />
        </div>
      </div>
    );
  }
}

export default App;
