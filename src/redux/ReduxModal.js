import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { closeModal, registerModal, modalsSelectors } from 'r-modal/lib/redux';

export const ReduxModal = React.createClass({
  propTypes: {
    ownProps: PropTypes.object.isRequired,
    Modal: PropTypes.func,
    open: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    registerModal: PropTypes.func.isRequired
  },
  componentWillMount() {
    this.props.registerModal();
  },
  render() {
    return (
      <this.props.Modal
        {...this.props.ownProps}
        open={this.props.open}
        onRequestClose={this.props.closeModal}
      />
    );
  }
});

export default connect(
  (state, ownProps) => ({
    ownProps,
    open: modalsSelectors.isOpen(state[ownProps.key], ownProps.id)
  }),
  (dispatch, ownProps) => ({
    closeModal: () => dispatch(closeModal()),
    registerModal: () => dispatch(registerModal(ownProps.id))
  })
)(ReduxModal);
