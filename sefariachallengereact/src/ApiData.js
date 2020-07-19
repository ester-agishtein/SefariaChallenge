import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

class ApiData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount() {
    fetch("https://www.sefaria.org/api/index/?limit=10")
      .then(response => response.json())
      .then(data => {
        let categories = Object.values(data);
        var row = [];
        for (let item = 0; item < categories.length; item++) {
          row.push(categories[item]["contents"]);
        }
        var rowItems = [];
        for (let item = 0; item < row.length; item++) {
          let books = row[item];
          for (let book in books) {
            if (books[book].hasOwnProperty("categories")) {
              if (books[book]["title"] === undefined) {
                for (let hiddenBook in books[book]["contents"]) {
                  if (
                    !rowItems.includes(
                      books[book]["contents"][hiddenBook]["title"]
                    )
                  )
                    rowItems.push(books[book]["contents"][hiddenBook]["title"]);
                }
              }
              if (!rowItems.includes(books[book]["title"]))
                rowItems.push(books[book]["title"]);
            } else {
              var rowContents = books[book]["contents"];
              for (let rowBook in rowContents) {
                for (let hiddenBook in books[book]["contents"]) {
                  if (
                    !rowItems.includes(
                      books[book]["contents"][hiddenBook]["title"]
                    )
                  )
                    rowItems.push(books[book]["contents"][hiddenBook]["title"]);
                }
                if (!rowItems.includes(rowContents[rowBook]["title"]))
                  rowItems.push(rowContents[rowBook]["title"]);
              }
            }
          }
        }
        this.setState({ books: rowItems });
      });
  }
  render() {
    return (
      <div>
        {this.state.books.map(book => {
          return <li key={uuidv4()}>{book}</li>;
        })}
      </div>
    );
  }
}

export default ApiData;
