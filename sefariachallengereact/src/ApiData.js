import React, { Component } from "react";

var HashMap = require("hashmap");
class ApiData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: ["kuzari"],
      sinaiEra: [
        { "Five Books of Moses": [["God", "Moses"], "-1313", "Mount Sinai"] }
      ],
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
    fetch("https://www.sefaria.org/api/index/")
      .then(response => response.json())
      .then(data => {
        let allData = Object.values(data);
        var categories = [];
        for (let item = 0; item < allData.length; item++) {
          categories.push(allData[item]["contents"]);
        }
        this.addBook(categories[0][1]);
      });

    //lets say we hypothetically have all the titles we want in the "books" state
  }
  addBook(data) {
    console.log("this.state.books b4: ", this.state.books);
    let books = data["contents"];
    let booksArray = [];
    console.log("books = ", books);
    for (let book in books) {
      let title = books[book]["title"];
      booksArray.push(title);
    }
    // let allBooks = Object.assign(this.state.books, booksArray);
    let allBooks = this.state.books.concat(booksArray);
    this.setState({ books: allBooks });
    this.populateData();
  }
  getEraFromYear = year => {
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
    console.log("title = ", title);
    title.replace(" ", "%20");
    var url = "https://www.sefaria.org/api/v2/raw/index/" + title;
    const response = await fetch(url);
    const data = await response.json();
    let authors = data["authors"];
    let date = data["compDate"];
    let place = data["compPlace"];
    console.log("info = ", authors, date, place);
    let bookData = {
      [title]: [authors, date, place]
    };

    let era = this.getEraFromYear(data["compDate"]);
    let currState = this.state[era];
    this.setState({ [era]: currState.concat(bookData) });
  }
  populateData = () => {
    // this.getBookData(this.state.books[0]);
    // this.getBookData(this.state.books[1]);
    // this.getBookData(this.state.books[2]);
    for (let book in this.state.books.length) {
      console.log(book);
      this.getBookData(this.state.books[book]);
    }
  };

  render() {
    return <></>;
  }
}

export default ApiData;
