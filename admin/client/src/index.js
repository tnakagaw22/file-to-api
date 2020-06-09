import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import React from 'react';
import ReactDOM from 'react-dom'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Pages from './pages/Index';
import theme from './theme';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    // headers: {
    //   authorization: localStorage.getItem('token'),
    // }, 
});

const client = new ApolloClient({
  cache,
  link,
  // typeDefs,
  // resolvers
});

ReactDOM.render(
  <ThemeProvider theme={theme}> <ApolloProvider client={client}>
    <CssBaseline />
    <Pages />
  </ApolloProvider>
  </ThemeProvider>, 
  document.getElementById('root')
);
