import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import MappingDefinition from './MappingDefinition';
import MappingDefinitions from './MappingDefinitions';
import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';
// import { Footer, PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <MappingDefinitions path="/" />
          <MappingDefinition path="mapping-definitions/:id" />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
