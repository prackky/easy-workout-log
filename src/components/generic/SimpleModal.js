import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SimpleModal extends Component {

  static propTypes = {
    size: PropTypes.oneOf(['sm']),
    title: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    doModalActionClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.sizeClass = 'modal-' + props.size;
    // PropTypes.checkPropTypes(this.propTypes, props, ...props);
  }

  handleCloseClick = (event) => {
    event.preventDefault();
    this
      .props
      .doModalActionClose();
  }

  render() {
    return (

      <div
        className={"modal " + this.sizeClass + " " + (this.props.showModal
        ? ' active'
        : '')}>
        <div className="modal-overlay"></div>
        <div className="modal-container" role="document">
          <div className="modal-header">
            {/*<button type="button" className="btn btn-clear float-right" aria-label="Close"></button>*/}
            <div className="modal-title">{this.props.title}</div>
          </div>
          <div className="modal-body">
            <div className="content">
              {this.props.children}
            </div>
          </div>
          <div className="modal-footer">
            {this.renderButtonClose()}
          </div>
        </div>
      </div>
    );
  }

  renderButtonClose() {
    return (
      <button
        className="btn btn-primary"
        type="button"
        onClick={this.handleCloseClick}>Close</button>
    )
  }
};

export default SimpleModal;
