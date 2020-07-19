import { GraphQLSchema } from "graphql";

export default new GraphQLSchema({
  query: QueryType
});

import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
const BASE_URL = "https://www.sefaria.org/api";

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}
function fetchBooks() {
  return fetchResponseByURL("/index/titles/").then(json => json.book);
}
const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    allBooks: {
      type: new GraphQLList(BookType),
      resolve: fetchBooks
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      }
      // resolve: (root, args) => fetch
    }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Genisis",
  fields: () => ({
    book: {
      type: GraphQLString,
      resolve: book => book.book
    }
  })
});
