import React, { Component } from 'react';
import styles from './pages.css';

class UserAdd extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.addUser();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/addUser')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>User to register</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map((item) => {
              return(
                <div>
                  {item}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No User to register</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default UserAdd;