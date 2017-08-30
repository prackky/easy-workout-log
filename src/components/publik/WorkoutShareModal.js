import React, {Component} from 'react';

import SimpleModal from '../generic/SimpleModal';
import SharePublicLink from './SharePublicLink';

class WorkoutShareModal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const publicLink = {
      type: 'workout-details',
      workoutId: this.props.workoutId,
      workoutDate: this.props.workoutDate
    };

    return (
      <SimpleModal
        doModalActionClose={this.props.doModalActionClose}
        showModal={this.props.showModal}
        size="sm"
        title="Share workout">
        <SharePublicLink type='twitter' publicLink={publicLink}>Tweet workout details</SharePublicLink>
      </SimpleModal>
    );
  }

};

export default WorkoutShareModal;
