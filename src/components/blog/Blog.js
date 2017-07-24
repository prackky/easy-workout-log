import React from 'react';
import {Link} from 'react-router-dom';

const Blog = (props) => {

  return (
    <div className="container grid-640 section-content">
      <div className="columns">
        <div className="column col-12">
          <h3>Blog</h3>

          {/*
          <div className="tile margin-bottom-3rem">
            <div className="tile-icon">
              <figure className="avatar avatar-xl" data-initial="VP" style={{'background-color': '#5764c6'}}>
                
              </figure>
            </div>
            <div className="tile-content">
              <div className="tile-title">Victor Parmar</div>
              <div className="tile-title"><Link to="/how-to-gain-20-lbs-of-muscle-in-4-weeks">How to gain 20 pounds of muscle in 4 weeks</Link></div>
              <div className="tile-subtitle">July 23, 2017</div>
            </div>
          </div>
          */}

          <div className="entry">
            <div className="link">
              <Link to="/blog/how-to-gain-20-lbs-of-muscle-in-4-weeks">How to gain 20 pounds of muscle in 4 weeks</Link>
            </div>
            <div className="author">
              - Victor Parmar, <span className="date">July 23, 2017</span>
            </div>
          </div>

          {/*<div className="divider"></div>*/}

        </div>
      </div>

    </div>
  );

}

export default Blog;
