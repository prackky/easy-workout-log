import React from 'react';

const Terms = (props) => {

  return (
    <div className="container grid-960 section-content">
      <div className="columns">
        <div className="column col-12">
          <h3 className="text-center">Terms of Service</h3>

          <h6>
            <u>Last updated</u>: June 22<sup>nd</sup>, 2017. Inspired by <a href="https://monicahq.com/terms" target="_blank" rel="noopener noreferrer">Monica</a></h6>

          <h4 className="margin-top-5rem">Scope of service</h4>
          <p>
            Ewolo supports the following browsers:
            <ul>
              <li>Internet Explorer (9+)</li>
              <li>Firefox (50+)</li>
              <li>Chrome (latest)</li>
              <li>Safari (latest)</li>
            </ul>

            Usage on any other browsers is likely but not guaranteed.
          </p>

          <h4 className="margin-top-5rem">Rights</h4>
          <p>
            You don’t have to provide your real name when you register to an account. You do
            however need a valid email address if you want to opt into our email
            notifications.
          </p>
          <p>
            You have the right to close your account at any time.</p>
          <p>Your personally identifiable data will not be intentionally shown to other
            users or shared with third parties.
          </p>
          {/*You have the right to export your data at any time, in the SQL format.*/}
          <p>
            If the site ceases operation, you will receive an opportunity to export all your
            data before the site dies.
          </p>
          <p>Any new features that affect privacy will be strictly opt-in.</p>

          <h4 className="margin-top-5rem">Responsibilities</h4>

          <p>You will not use the site to store illegal information or data under the
            Canadian law.</p>
          <p>You have to be at least 18+ to create an account and use the site.</p>
          <p>You must not abuse the site by knowingly posting malicious code that could
            harm you or the other users.</p>
          <p>You must only use the site to do things that are widely accepted as morally
            good.</p>
          <p>You may not make automated requests to the site.</p>
          <p>You are responsible for keeping your account secure.</p>
          <p>The site operators reserve the right to close accounts that abuse the system
            or use it in an unreasonable manner.</p>

          <h4 className="margin-top-5rem">Legal</h4>

          <p>Although we want to provide a great service, there are certain things about
            the service that cannot be promised. For example, the services and software are
            provided "as-is", at your own risk, without express or implied warranty or
            condition of any kind. Ewolo also disclaims any warranties of merchantability,
            fitness for a particular purpose or non-infringement. Ewolo will have no
            responsibility for any harm to your computer system, loss or corruption of data,
            or other harm that results from your access to or use of the Services or
            Software.</p>
          <p>
            These Terms can change at any time, but we will never be unreasonable. This
            product is a dream come true for us and we hope to run it as long as possible.
          </p>

        </div>
      </div>

    </div>
  );

}

export default Terms;
