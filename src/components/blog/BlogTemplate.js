import React from 'react';

import './Blog.css';

const BlogTemplate = (props) => {

  return (
    <div className="container grid-sm section-content">
      <div className="columns">
        <div className="column col-12">

          <div className="tile margin-top-1rem margin-bottom-2rem">
            <div className="tile-icon">
              <figure className="avatar avatar-lg" data-initial="VP" style={{backgroundColor: '#5764c6'}}>
                
              </figure>
            </div>
            <div className="tile-content">
              <div className="tile-title">{props.entry.author}</div>
              <div className="tile-subtitle text-gray">{props.entry.dateStr}</div>
            </div>
          </div>
              
          <h3>{props.entry.title}</h3>

          {props.children}

        </div>
      </div>

    </div>
  );

}

export default BlogTemplate;
