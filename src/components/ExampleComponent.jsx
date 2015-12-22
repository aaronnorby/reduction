import React, { Component, PropTypes } from 'react';

export default class ExampleComponent extends Component {
  
  handleClick(e) {
      this.props.actionOne('new prop');
  }

  render() {
    return (
      <header onClick={this.handleClick}>
        <h1>{this.props.data}</h1>
        <h2>{this.props.someProp}</h2>
      </header>
    )
  }
}

ExampleComponent.propTypes = {
  actionOne: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
  someProp: PropTypes.string  // not required
}
