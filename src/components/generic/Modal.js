import React from 'react';

const Modal = (props) => {

  const handleCloseClick = (event) => {
    event.preventDefault();
    props.doSetShowModal(false);
  };

  const sizeClass = 'modal-' + props.size;

  return (

    <div
      className={"modal " + sizeClass + " " + (props.showModal
      ? ' active'
      : '')}>
      <div className="modal-overlay"></div>
      <div className="modal-container" role="document">
        <div className="modal-header">
          {/*<button type="button" className="btn btn-clear float-right" aria-label="Close"></button>*/}
          <div className="modal-title">{props.title}</div>
        </div>
        <div className="modal-body">
          <div className="content">
            {props
              .content
              .map((para, index) => {
                return (
                  <p key={index}>
                    {para}
                  </p>
                );
              })
}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" type="button" onClick={handleCloseClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
