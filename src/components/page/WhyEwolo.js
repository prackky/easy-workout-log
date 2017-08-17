import React from 'react';

import './WhyEwolo.css';

const WhyEwolo = (props) => {

  return (
    <div className="container grid-640 section-content">
      <div className="columns">
        <div className="column col-12">
          <h3>Why Ewolo?</h3>

          <p>
            Ewolo is a web application that allows you to log your workouts. It was designed and developed by Victor Parmar when he couldn't find a simple cross-platform solution for logging his workouts and tracking progress. While there exist quite a few apps that provide the ability to track workouts, they are either platform specific: only iOS, or only android or no web version, not user friendly: convoluted web interfaces, no simple way to start logging a workout or just not flexible: either need to create routines beforehand of use fixed routines, no support for supersets and non-listed exercises.
          </p>
          
          <p>
          Thus arose the need for Ewolo, a streamlined flexible interface for logging workouts built from the ground up to be a pleasure to use on a mobile device.
          </p>

          <p>
            <strong>If you are looking for a simple workout log that you can use on any platform via a web browser, Ewolo is your solution:</strong>
          </p>
          
          <ul className="text why-ewolo">
            <li><strong>It comes with a list of over 100 exercises but you can add any exercise you want.</strong></li>
            <li><strong>Most fields are optional and you can log workouts in the past, present and future (to set up future routines).</strong></li>
            <li><strong>Log multiple workouts for a single day.</strong></li>
            <li><strong>Log supersets, circuits (2 or more exercises without rest) and optionally specify tempo for high intensity workouts.</strong></li>
            <li><strong>Copy, edit and delete workouts.</strong></li> 
            <li><strong>All of the above plus a simple interface that is navigable on the smallest mobile device!</strong></li>
          </ul>
          
          <p>
            Any feedback is very much welcome and we hope that you like it as much as we enjoyed making it. Oh and in case you were wondering, Ewolo is simply short for &quot;easy workout log&quot; :)
          </p>

        </div>
      </div>

    </div>
  );

}

export default WhyEwolo;
