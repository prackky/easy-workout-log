import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {

  static propTypes = {
    size: PropTypes.oneOf(['sm']),
    content: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    doModalActionCancel: PropTypes.func.isRequired,
    modalActionExecute: PropTypes.string,
    doModalActionExecute: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.sizeClass = 'modal-' + props.size;
    // PropTypes.checkPropTypes(this.propTypes, props, ...props);
  }

  handleCancelClick = (event) => {
    event.preventDefault();
    this
      .props
      .doModalActionCancel();
  }

  handleOkClick = (event) => {
    event.preventDefault();
    this
      .props
      .doModalActionExecute();
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
              {this
                .props
                .content
                .map((para, index) => {
                  // TODO: Consider a better index here (para length?)
                  return (
                    <div className={index === 0 ? '' : 'margin-top-2rem'} key={index}>
                      {para}
                    </div>
                  );
                })
}
            </div>
          </div>
          <div className="modal-footer">
            {this.renderButtonClose()}
            {this.renderButtonExecute()}
          </div>
        </div>
      </div>
    );
  }

  renderButtonClose() {
    if (this.props.doModalActionExecute) {
      return (
        <button className="btn btn-link" type="button" onClick={this.handleCancelClick}>Cancel</button>
      )
    }

    return (
      <button
        className="btn btn-primary"
        type="button"
        onClick={this.handleCancelClick}>Close</button>
    )
  }

  renderButtonExecute() {
    if (this.props.doModalActionExecute) {
      return (
        <button className="btn btn-primary" type="button" onClick={this.handleOkClick}>{this.props.modalActionExecute}</button>
      )
    }

    return null;
  }
};

export default Modal;
