import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import List from './components/List';
//import Connection from './Connection'

function App() {
  return (
    <Router>
      <Header/>
      <Route exact path='/' component={Homepage}/>
      <Route path='/list' component={List}/>
    </Router>
  );
}

export default App;
