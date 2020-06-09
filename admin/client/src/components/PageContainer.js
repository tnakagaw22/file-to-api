import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";

export default function PageContainer(props) {
  return (
    <Fragment>
      {/* <Bar /> */}
      <Container maxWidth="sm">{props.children}</Container>
    </Fragment>
  );
}
