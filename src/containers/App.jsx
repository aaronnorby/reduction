import React, { PropTypes, Component } from 'react';
import { bindActionCreators }          from 'redux';
import { connect }                     from 'react-redux';
import { pushPath } from 'redux-simple-router';
import * as ActionCreators                   from '../actions/index';
import ExampleComponent                from '../components/ExampleComponent';

class App extends Component {
  changeView() {
    this.props.pushPath('/another');
  }

  render() {
    return (
      <div>
        <button onClick={e => this.changeView(e)}>Change View</button>
        <ExampleComponent 
          data={this.props.data} 
          actionOne={this.props.actions.actionOne}
          asyncAction={this.props.actions.performAsyncAction}
          someProp={this.props.someProp}
        />
      </div>
    )   
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.string.isRequired,
  someProp: PropTypes.string.isRequired
}


// connect App to redux store and export the connected version
function mapStateToProps(state) {
  return state.main;
}

function mapActionCreatorsToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    pushPath: bindActionCreators(pushPath, dispatch)
  }
}

export default connect(
    mapStateToProps, 
    mapActionCreatorsToProps)(App);
