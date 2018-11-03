import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions';
import { pure, compose } from 'recompose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  componentWillMount() {
    console.log('HELLO');
  }
  render() {
    const { actions, error } = this.props;
    console.log(this.props.children);

    const childrenWithStoreProp = React.Children.map(
      this.props.children,
      (child) => React.cloneElement(child, { ...this.props })
    );
    return (
      <MuiThemeProvider>
      <div>
          {childrenWithStoreProp}
      </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  form: ImmutablePropTypes.map,
  routing: ImmutablePropTypes.map,
  error: ImmutablePropTypes.map,
  actions: PropTypes.object,
  appName: PropTypes.string,
  children: PropTypes.node,
};

//  Redux Connection
function mapStateToProps(state) {
  return {
    appName: 'NumberPyramidGenerator',
    routing: state.get('routing'),
    error: state.get('error'),
    form: state.get('form'),
    numberPyramid: state.get('numberPyramid'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure,
)(App);
