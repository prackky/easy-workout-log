import React from 'react';

const Privacy = (props) => {

  return (
    <div className="container grid-960 section-content">
      <div className="columns">
        <div className="column col-12">
          <h3 className="text-center">Privacy policy</h3>
          
          <h6><u>Last updated</u>: June 22<sup>nd</sup>, 2017</h6>
          <p>
            When you create your account, you are giving the site information about yourself
            that is collected. This includes your name, your email address and your password
            (which is encrypted before being stored). No other personal information is
            stored.
          </p>
          <p>Ewolo runs on Linode and the site operators are the only ones, apart from
            Linode’s employees, who have access to those servers.</p>
          {/*Transactional emails are served through Postmark.*/}
          <p>The site does not show ads. It also does not sell data to a third party.</p>
          <p>Google Analytics is used to track visits, keywords search and to get to know
            the audience.</p>

          {/*We use Stripe to collect payments made to access the paid version. We do not store credit card information or anything concerning the transactions themselves on our servers. As per the open source library we use to process the payments (Laravel Cashier), we store the last 4 digits of the credit card, the brand name (VISA or MasterCard). As a user, you are identified on Stripe by a random number that they generate and use.*/}
          <p>Ewolo is proudly built on open-source projects, a majority of which are
            hosted on Github.</p>
          <p>When you close your account, all your personal information is destroyed
            however a backup is kept for a limited time (30 business days), after which all
            account data is permanently deleted.</p>

          
        </div>
      </div>

    </div>
  );

}

export default Privacy;
