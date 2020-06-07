import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import React from 'react';
import ReactDOM from 'react-dom'; 

import Pages from './pages/Index';
import './index.css';
import injectStyles from './styles';

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

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>, 
  document.getElementById('root')
);
