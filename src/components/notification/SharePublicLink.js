import React from 'react';
import {connect} from 'react-redux';

import ewoloUtil from '../../common/ewoloUtil';

import globalActions from '../../modules/global/globalActions';
import publikActions from '../../modules/publik/publikActions';

const mapStateToProps = (state) => {
  return {authToken: state.user.data.authToken};
};

const mapDispatchToProps = (dispatch) => {
  return {taskStart: globalActions.taskStart, taskEnd: globalActions.taskEnd, userNotificationAdd: globalActions.userNotificationAdd};
};

const SharePublicLink = (props) => {

  const publicLink = props.publicLink;
  const linkText = (props.type === 'twitter' && publicLink.type === 'workout-details')
    ? 'Tweet workout!'
    : 'Share link';

  const handleShareLinkClick = (event) => {
    event.preventDefault();

    props.taskStart();

    publikActions
      .linkCreateAsync({linkType: publicLink.type, authToken: props.authToken, workoutId: publicLink.workoutId})
      .then(body => {
        const publicUrl = 'https://ewolo.fitness/public/' + body.id;

        if ('twitter' === props.type) {
          const text = publicLink.type === 'workout-details'
            ? `Just logged a workout for ${publicLink.workoutDate}: `
            : '';
          const twitterUrl = `https://twitter.com/intent/tweet?text=${window.encodeURIComponent(text)}&url=${window.encodeURIComponent(publicUrl)}&hashtags=TrackProgress&via=EwoloFitness`;
          window.location = twitterUrl;
        }
      })
      .catch(err => {
        console.error(err);
        props.userNotificationAdd({type: 'ERROR', text: 'Error while creating public link'});
      })
      .then(() => {
        props.taskEnd();
      });
  }

  return (
    <div>
      <a href="" onClick={handleShareLinkClick}>{linkText}</a>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePublicLink);
