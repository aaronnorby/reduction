import React, { PropTypes, Component } from 'react';
import { bindActionCreators }          from 'redux';
import { connect }                     from 'react-redux';
import { performAsyncAction }          from '../actions/index';
import { actionOne }                   from '../actions/index';
import ExampleComponent                from '../components/ExampleComponent';

class App extends Component {

  render() {
    return (
      <div>
        <ExampleComponent 
          data={this.props.data} 
          actionOne={this.props.actions.actionOne}
          someProp={this.props.someProp}
        />
      </div>
    )   
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.string.isRequired,
  performAsyncAction: PropTypes.func.isRequired,
  someProp: PropTypes.string.isRequired
}


// connect App to redux store and export the connected version
function mapStateToProps(state) {
  return state;
}

function mapActionCreatorsToProps(dispatch) {
  return {
    actions: bindActionCreators(actionOne, dispatch)
  }
}

export default connect(mapStateToProps, {performAsyncAction})(App);
