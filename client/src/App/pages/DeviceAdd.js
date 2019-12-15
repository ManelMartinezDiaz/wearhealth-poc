import React, { Component } from 'react';
import styles from './pages.css';

class DeviceAdd extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.deviceAdd();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/deviceAdd')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>Disoisitiu Wearable a registrar</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of wearables*/}
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
            <h2>No Wearable per registrar</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default DeviceAdd;