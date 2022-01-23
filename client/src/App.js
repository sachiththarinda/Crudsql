import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'

export default class App extends Component {

  
  
  render() {
    return (
      <Router>
      
      <Switch>
        <div>
        <Route path='/' exact component={Home}/>
        
      </div>
      </Switch>
      </Router>
    )
  }
}
