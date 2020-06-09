import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MappingDefinition from './MappingDefinition';
import MappingDefinitions from './MappingDefinitions';
import Footer from '../components/Footer';
// import { Footer, PageContainer } from '../components';

export default function Pages() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <Router primary={false} component={Fragment}>
          <MappingDefinitions path="/" />
          <MappingDefinitions path="mapping-definitions" />
          <MappingDefinition path="mapping-definition/:id" />
        </Router>
        <Footer/>
      </Box>
    </Container>
  )
}
