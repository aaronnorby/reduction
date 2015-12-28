import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Root extends Component {
  render() {
    return (
        <div>
          <h1>Root</h1>
          <button><Link to="/app">App Link</Link></button>
          <button><Link to="/another">Another</Link></button>
          {this.props.children}
        </div>
    )
  }
}

Root.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
