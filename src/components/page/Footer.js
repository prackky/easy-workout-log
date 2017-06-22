import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.css';

const Footer = (props) => {

  return (
    <footer className="bg-gray">
      <section id="copyright" className="grid-footer grid-1280">
        {/*
        <div className="columns">
          <div className="column col-12">
            &copy; 2017 Ewolo
          </div>
          <div className="column col-12">
            <Link to="/privacy">Privacy</Link> &nbsp;
            <Link to="/terms">Terms</Link> &nbsp;
          </div>
        </div>
        <div className="columns">
          <div className="column col-12">
            Built with ❤ by&nbsp;<a href="https://smalldata.tech">SmallData</a>.
          </div>
        </div>
        */}

        <div className="r">
          By using this service you agree to the <Link to="/privacy">Privacy policy</Link> and <Link to="/terms">Terms of service</Link>. Feel free to <a href="mailto:feedback@ewolo.fitness">get in touch</a> regarding questions/feedback.
        </div>
        <div className="r">
          Built with ❤ by&nbsp;<a href="https://smalldata.tech">SmallData</a>.
        </div>
      </section>
    </footer>
  );

};

export default Footer;
