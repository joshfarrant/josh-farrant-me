import { connect } from 'react-redux';
import Component from './component.jsx';
import { app as appActions } from '../../actions';

const { demoAction } = appActions;

const mapStateToProps = (state) => {
  const { demo } = state.app;
  return {
    demo,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleDemo: () => {
    dispatch(demoAction());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
