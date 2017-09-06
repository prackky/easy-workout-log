import React from 'react';
import {Link} from 'react-router-dom';

import BlogTemplate from './BlogTemplate';
import ewoloSquatAnalytics from './media/ewolo-squats-analytics.png';
import ewoloMarkExerciseDone from './media/ewolo-mark-exercise-done.png';

const entry = {
  title: 'Ewolo version 3',
  url: '/blog/ewolo-version-3',
  author: 'Victor Parmar',
  dateStr: 'August 23, 2017'
};

const Version3 = (props) => {

  return (
    <BlogTemplate entry={entry}>
              
<p>
I am super proud to present Ewolo version 3 which comes with a brand new <Link to="/analytics">analytics</Link> section! This section displays an exercise specific progress chart broken down by &quot;rep maximums&quot;. Simply pick an exercise, an optional date range and hit the apply button to update the chart.
</p>

<figure className="figure blog">
  <a href={ewoloSquatAnalytics}><img src={ewoloSquatAnalytics} className="img-responsive bordered" alt="Vic's squat history for 2017" /></a>
  <figcaption className="figure-caption text-center">My squat history for 2017</figcaption>
</figure>

<p>
Apart from the analytics, there have been quite a few UX improvements with a major one being a new &quot;mark exercise as done&quot; button which marks the exercise as read-only. This saves space and allows you to clearly keep track of which set you are currently on. You can always edit the exercise again using the edit button.
</p>

<figure className="figure blog">
  <a href={ewoloMarkExerciseDone}><img src={ewoloMarkExerciseDone} className="img-responsive centered bordered" alt="Ewolo mark exercise as done" /></a>
  <figcaption className="figure-caption text-center">Ewolo mark exercise as done.</figcaption>
</figure>

<p>
  I hope that you enjoy the new features. Any feedback is welcome!
</p>

    </BlogTemplate>
  );

}

const Version3Entry = {
  ...entry,
  component: Version3
}

export default Version3Entry;
