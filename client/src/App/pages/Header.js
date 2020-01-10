import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

class Header extends Component {
  render() {
    return (
      <header className={styles.headerStyle}>
        <h1 className={styles.titleStyle}>Policyholder Blockchain Insurance</h1>
        <Link className={styles.linkStyle} to="/">Home</Link>
      </header>

    )
  }
}

export default Header;