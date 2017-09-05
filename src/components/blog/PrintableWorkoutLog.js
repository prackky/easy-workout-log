import React from 'react';
// import {Link} from 'react-router-dom';

import BlogTemplate from './BlogTemplate';
import ewoloPrintableWorkoutLog from './media/ewolo-printable-workout-log.pdf';

export const entry = {
  title: 'Free printable workout log!',
  url: '/blog/printable-workout-log',
  author: 'Victor Parmar',
  dateStr: 'September 5, 2017'
};

const PrintableWorkoutLog = (props) => {

  return (
    <BlogTemplate entry={entry}>
              
<p>
While I highly recommend using Ewolo to log your workouts, there are still quite a few people who are old school and want to stick with pen and paper. If you are one of those, then you might find this <a href={ewoloPrintableWorkoutLog}>free printable workout log</a> useful :)
</p>

<p>
  Enjoy!
</p>

    </BlogTemplate>
  );

}

export default PrintableWorkoutLog;
