import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Layout from '../layout/layout.js';
import PageCurrency from '../../pages/pageCurrency'
import './App.css';

function App() {   
  return (
      <Layout>
          <Router>
              <div className="App">

                  <Container className="App-header" fluid>
                      <h1>Currency details</h1>
                  </Container>

                  <div>
                      <Switch>
                          <Route exact path="/" component={PageCurrency}></Route>
                      </Switch>
                  </div>

                  <Container className="App-footer" fluid>
                  </Container>
              </div>
          </Router>
      </Layout>
  );
}

export default App;
