import React from 'react';

const Privacy = (props) => {

  return (
    <div className="container grid-960 section-content">
      <div className="columns">
        <div className="column col-12">
          <h3 className="text-center">Privacy policy</h3>

          <h6>
            <u>Last updated</u>: June 22<sup>nd</sup>, 2017</h6>
          <p>
            When you create your account, you are giving this site information about yourself
            that is collected. This includes your name, your email address and your password
            (which is encrypted before being stored). No other personal information is
            stored. You can change your personal information at any time by logging into the site.
          </p>
          <p>
            No personal information is collected when browsing this site anonymously.
          </p>
          <p>
            Any workouts logged on this site may be anonymized, analyzed and shared with other users to improve the product. However, <b>any personally identifiable data will never be intentionally shared without your
            explicit consent</b>. When you close your account, all your personal information is
            destroyed however a backup is kept for a limited time (30 business days), after
            which all account data is permanently deleted.
          </p>
          <p>Ewolo runs on Linode and the site operators are the only ones, apart from
            Linode’s employees, who have access to those servers.</p>
          {/*Transactional emails are served through Postmark.*/}
          <p>The site does not show ads. <b>It also does not sell data to any third party.</b> Google Analytics is used to track visits, keywords search and to get to know the
            audience. Google Analytics uses <a
              href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
              target="_blank">cookies</a>.</p>
          {/*We use Stripe to collect payments made to access the paid version. We do not store credit card information or anything concerning the transactions themselves on our servers. As per the open source library we use to process the payments (Laravel Cashier), we store the last 4 digits of the credit card, the brand name (VISA or MasterCard). As a user, you are identified on Stripe by a random number that they generate and use.*/}
          <p>You will be notified of any changes to this document via this page.</p>
          <p>Ewolo does not specifically market to children under the age of 13 years old.</p>
          <p>Ewolo is proudly built on open-source projects, a majority of which are
            hosted on Github.</p>
        </div>
      </div>

    </div>
  );

}

export default Privacy;
