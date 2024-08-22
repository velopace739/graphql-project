import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

// components
import BookList from "./componenets/BookList";
import AddBook from "./componenets/AddBook";

// apollo client setup
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_BASE_URL}/graphql`,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Velopace's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
