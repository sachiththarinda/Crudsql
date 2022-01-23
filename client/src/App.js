import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/Navbar';
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import PostDetails from './components/PostDetails'

export default class App extends Component {  
  render() {
    return (
      <Router>
      <Navbar/>
      <Switch>
        <div>
        <Route path='/' exact component={Home}/>
        <Route path='/add' component={CreatePost}/>
        <Route path='/edit/:id' component={EditPost}/>
        <Route path='/post/:id' component={PostDetails}/>
      </div>
      </Switch>
      </Router>
    )
  }
}
