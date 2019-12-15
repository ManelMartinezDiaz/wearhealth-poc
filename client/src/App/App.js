import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import UserAdd from './pages/UserAdd';
import DeviceAdd from './pages/DeviceAdd';
import DataAdd from './pages/DataAdd';
import UserRead from './pages/UserRead';
import DataRead from './pages/DataRead';


class App extends Component {

  state = {
    name: "joe",
    assets: [],
    user: {}
  }


  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/UserAdd' component={UserAdd}/>
          <Route path='/DeviceAdd' component={DeviceAdd}/>
          <Route path='/DataAdd' component={DataAdd}/>
          <Route path='/UserRead' component={UserRead}/>
          <Route path='/DataRead' component={DataRead}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;