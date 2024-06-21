import React from 'react';
import {ApolloProvider , ApolloClient , InMemoryCache} from "@apollo/client";
import Home from './pages/home/Home';
import 'rsuite/styles/index.less';
import "../src/assets/css/style.css";
import "../src/assets/css/responsive.css"

const client = new ApolloClient({
  uri:"http://localhost:5000/graphql",
  cache:new InMemoryCache()

})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home/>
      
    </ApolloProvider>
  );
}

export default App;
