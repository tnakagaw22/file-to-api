import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu, Container, Button } from 'semantic-ui-react'

import DestTablePage from './dest-table/pages/DestTableListPage';
import TemplateListPage from './template/pages/TemplateListPage';
import TemplateDetailPage from './template/pages/TemplateDetailPage';


export default function App() {
  return (
    <Router>
      <div>
        <Menu fixed='top' inverted>
          <Menu.Item as={Link} to='/temp' header>
            File Import Mapping
          </Menu.Item>

          <Menu.Item as={Link} to='/'>
            Home
          </Menu.Item>

          <Menu.Item as={Link} to='/dest'>
            dest
          </Menu.Item>

          <Menu.Item as={Link} to='/temp'>
            temp
          </Menu.Item>
        </Menu>


        <Container fluid style={{ marginTop: '4em', paddingLeft: '30px', paddingRight: '30px' }}>
          <Switch>
            <Route exact path="/">
              <TemplateListPage />
            </Route>
            <Route exact path="/temp">
              <TemplateListPage />
            </Route>
            <Route exact path="/temp/:id">
              <TemplateDetailPage />
            </Route>
            <Route exact path="/dest">
              <DestTablePage />
            </Route>
          </Switch>
        </Container >
      </div>
    </Router>
  );
}
