import React, { Component } from 'react';
import '../App.css';

class UserRead extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      user: []
    }
    this.readUser = this.readUser.bind(this)
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.readUser();
  }


  callApi = async (a) => {
    let response;
    response = await fetch('/api/readUser');
    const body = await response.json();    if (response.status !== 200) throw Error(body.message);    return body;
};


  // Retrieves the list of items from the Express app
  readUser(){
    this.callApi()
    .then(res => {
        let user = res;
      this.setState({user: res});
    })
    .catch(err => console.log(err));
  }

  render() {
    const { user } = this.state;

    return (
      <div className=".App-header">
        <h1>User to register</h1>
        {/* Check to see if any items are found*/}
        {user.length ? (
          <div>
            {/* Render the list of items */}
            {user.map((item) => {
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