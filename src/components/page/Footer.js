import React from 'react';

import './Footer.css';

const Footer = (props) => {

  return (
    <footer className="bg-gray">
      <section id="copyright" className="grid-footer container grid-1280">
        Built with ❤ by <a href="https://smalldata.tech">SmallData</a>.
      </section>
    </footer>
  );

};

export default Footer;
