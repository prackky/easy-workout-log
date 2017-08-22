import React from 'react';
import {Link} from 'react-router-dom';

import {entry as entryHowToGainMuscle} from './HowToGainMuscle';
import {entry as entryVersion3} from './Version3';

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

          <BlogEntry entry={entryVersion3}></BlogEntry>
          <div className="divider entry-divider"></div>
          <BlogEntry entry={entryHowToGainMuscle}></BlogEntry>

        </div>
      </div>

    </div>
  );

}

export default Blog;
