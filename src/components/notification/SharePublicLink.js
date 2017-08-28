import React from 'react';
// import moment from 'moment';
// import PropTypes from 'prop-types';

// import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';

const getInfoFromType = (type, publicLink) => {
  const publicUrl = 'https://ewolo.fitness/public/' + publicLink.id;

  if ('twitter' === type) {
    const text = publicLink.type === 'workout-details' ? 'Checkout out my workout for ' + publicLink.workoutDate : '';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${window.encodeURIComponent(text)}&url=${window.encodeURIComponent(publicUrl)}`;

    return {
      linkText: publicLink.type === 'workout-details' ? 'Tweet workout!' : '',
      url: twitterUrl
    };
  }

  return {};
}

const SharePublicLink = (props) => {

  const publicLink = props.publicLink;
  const info = getInfoFromType(props.type, publicLink);

  return (
    <div>
      <a href={info.url}>{info.linkText}</a>
    </div>
  );
}

export default SharePublicLink;
