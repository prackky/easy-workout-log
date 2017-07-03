import React from 'react';
import {Link} from 'react-router-dom';

class LinkWithChildren extends Link {

  render() {

    const {
      replace,
      to,
      innerRef,
      children,
      ...props
    } = this.props; // eslint-disable-line no-unused-vars

    // delete exact because it is not necessary at this point
    if (props.hasOwnProperty('exact')) {
      delete props.exact;
    }

    const href = this
      .context
      .router
      .history
      .createHref(typeof to === 'string'
        ? {
          pathname: to
        }
        : to);

    return (
      <a {...props} onClick={this.handleClick} href={href} ref={innerRef}>{children}</a>
    );
  }

};

export default LinkWithChildren;
