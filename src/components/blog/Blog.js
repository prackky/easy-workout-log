import React from 'react';
import {Link} from 'react-router-dom';

import HowToGainMuscleEntry from './HowToGainMuscle';
import Version3Entry from './Version3';
import PrintableWorkoutLogEntry from './PrintableWorkoutLog';

export const blogEntries = [PrintableWorkoutLogEntry, Version3Entry, HowToGainMuscleEntry];

const BlogEntry = (props) => {
  const entry = props.entry;

  return (
    <div className="entry">
      <div className="link">
        <Link to={entry.url}>{entry.title}</Link>
      </div>
      <div className="author">
        - {entry.author}, &nbsp;<span className="date">{entry.dateStr}</span>
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
          {blogEntries.map((entry, index) => {
            return (
              <div>
                <BlogEntry entry={entry}/>
                <div className="divider entry-divider"/>
              </div>
            );
          })
}
        </div>
      </div>

    </div>
  );

}

export default Blog;
