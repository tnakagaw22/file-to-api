import React from 'react';
import ReactDOM from 'react-dom';
import DestTablePage from './dest-table/pages/DestTableListPage';
import TemplateListPage from './template/pages/TemplateListPage';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <TemplateListPage />,
  // <DestTablePage />,
  document.getElementById('root')
);
