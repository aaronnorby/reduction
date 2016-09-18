import React, { PropTypes, Component } from 'react';
import { bindActionCreators }          from 'redux';
import { connect }                     from 'react-redux';
import * as ActionCreators                   from '../actions/index';
import ExampleComponent                from '../components/ExampleComponent';

class App extends Component {

  render() {
    return (
      <div>
        <ExampleComponent
          data={this.props.example.data}
          actionOne={this.props.actions.actionOne}
          asyncAction={this.props.actions.performAsyncAction}
          someProp={this.props.example.someProp}
        />
      </div>
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  example: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}


// connect App to redux store and export the connected version
function mapStateToProps(state) {
  const { exampleReducer } = state;
  return { example: exampleReducer };
}

function mapActionCreatorsToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch: dispatch
  }
}

export default connect(
    mapStateToProps,
    mapActionCreatorsToProps)(App);
