import React from 'react';
import {Link} from 'react-router-dom';

import {entry as entryHowToGainMuscle} from './HowToGainMuscle';
import {entry as entryVersion3} from './Version3';
import {entry as entryPrintableWorkoutLog} from './PrintableWorkoutLog';

const BlogEntry = (props) => {
  const entry = props.entry;

  return (
    <div className="entry">
      <div className="link">
        <Link to={entry.url}>{entry.title}</Link>
      </div>
      <div className="author">
        - {entry.author},
        &nbsp;<span className="date">{entry.dateStr}</span>
      </div>
    </div>
  )
};

const Blog = (props) => {

  return (
    <div className="container grid-sm section-content">
      <div className="columns">
        <div className="column col-12">
          <h3>Blog</h3>

          <BlogEntry entry={entryPrintableWorkoutLog}/>
          <div className="divider entry-divider"/>
          <BlogEntry entry={entryVersion3}/>
          <div className="divider entry-divider"/>
          <BlogEntry entry={entryHowToGainMuscle}/>

        </div>
      </div>

    </div>
  );

}

export default Blog;
