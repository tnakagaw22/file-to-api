import React, { Fragment } from "react";
import { Router } from "@reach/router";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import AppBarTop from "../components/AppBarTop";
import MappingDefinition from "./MappingDefinition";
import MappingDefinitions from "./MappingDefinitions";
import NotFound from "./NotFound";
import Footer from "../components/Footer";

export default function Pages() {
  return (
    <Fragment>
      <AppBarTop />
      <Container maxWidth="md">
        <Box my={4}>
          <Router primary={false} component={Fragment}>
            <MappingDefinitions path="/" />
            <MappingDefinitions path="mapping-definitions" />
            <MappingDefinition path="mapping-definition/:id" />
            <MappingDefinition path="mapping-definition/" />
            <NotFound default />
          </Router>
          <Footer />
        </Box>
      </Container>
    </Fragment>
  );
}
