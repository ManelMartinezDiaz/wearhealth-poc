import React, { Component } from 'react';
import styles from './pages.css';

class UserRead extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: ['manel', 'manuel']
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.readUser();
  }


  callApi = async (a) => {
    let response;
    response = await fetch(`/api/random`);
    const body = await response.json();    if (response.status !== 200) throw Error(body.message);    return body;
};


  // Retrieves the list of items from the Express app
  readUser(){
    this.callApi()
    .then(res => {
//      let numero = res.number;
      let list  = res.list;
      this.setState({ list })
    })
    .catch(err => console.log(err));
  }

  render() {
    const { list } = this.state;

    return (
      <div className=".headerStyle">
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

export default UserRead;