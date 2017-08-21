import React from 'react';

import BlogTemplate from './BlogTemplate';

export const entry = {
  title: 'Ewolo version 3',
  url: '/blog/ewolo-version-3',
  author: 'Victor Parmar',
  dateStr: 'August 23, 2017'
};

const Version3 = (props) => {

  return (
    <BlogTemplate entry={entry}>
              
{/*
<p>
I will save you some time right away by letting you know that the next time you see a title that tells you how to lose or gain x amount of weight in very little time you can move on. Such articles are written by people who have achieved incredible results but the same approach will not work for the majority of the people due to the fact that everyone has a <span className="highlight">different body type, diet and physical development</span>.
</p>

<p>
Despite the above disclaimer, I do have some recommendations on how you can achieve some concrete results based on my personal experience and research. <span className="highlight">I am 5'11 and I went from 122 lbs to 142 lbs in 4 weeks and then from 142 to 166 in another 5 weeks</span>.
</p>

<p>
When I started working out I had no idea what I was doing. I was 20 years old and I just started working out with a friend who had a home gym. He himself had previously worked out with someone else in their home gym so he knew a little bit. We worked out regularly for a couple of months and our routine consisted of only working out our chest and biceps. <span className="highlight">There was no talk of nutrition or tracking progress</span>. My friend was happy to continue with the same weights and I was happy to slowly increase weights which meant that I was getting stronger. I never saw much physical change though and after a couple of months I got demotivated and stopped working out.
</p>

<p>
A year later when I was 21, I was lucky enough to reconnect with an old friend who was studying to become a nutritionist. He started coaching me and we started working out together. This time around, I started doing a lot of research online and we would discuss routines and diet together. With his help I went from skinnymalinky to someone whose clothes actually fit! I gained 40 lbs in the span of 6 months! It has been 13 years since I first started working out and I am finally comfortable enough to share my recommendations.
</p>

<figure className="figure margin-top-5rem">
  <img src={img} className="img-responsive" alt="this isn't me just yet" />
</figure>

          <h4 className="margin-top-5rem">We are what we eat!</h4>
*/}

    </BlogTemplate>
  );

}

export default Version3;
