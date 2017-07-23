import Chance from 'chance';

const chance = new Chance();

const quotes = [
  {
    quote: "Eat clean, train dirty.",
    author: "unknown"
  }, {
    quote: "No pain, no gain.",
    author: "unknown"
  }, {
    quote: "If it doesn't challenge you, it doesn't change you.",
    author: "unknown"
  }, {
    quote: "The only way to finish is to start.",
    author: "unknown"
  }, {
    quote: "Don't stop when you are tired. Stop when you are done",
    author: "unknown"
  }, {
    quote: "You don't always get what you wish for, you get what you work for.",
    author: "unknown"
  }, {
    quote: "Pain is weakness leaving the body.",
    author: "unknown"
  }, {
    quote: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "unknown"
  }, {
    quote: "Push harder than yesterday if you want a different tomorrow",
    author: "unknown"
  }, {
    quote: "You're only one workout away from a good mood.",
    author: "unknown"
  }, {
    quote: "The same voice that says \"give up\" can also be trained to say \"keep going\".",
    author: "unknown"
  }, {
    quote: "You are what you eat - so don't be fast, cheap, easy or fake.",
    author: "unknown"
  }, {
    quote: "It hurts now, but one day it'll be your warm up.",
    author: "unknown"
  }, {
    quote: "Pain is temporary, pride is forever.",
    author: "unknown"
  }, {
    quote: "That which does not kill me makes me stronger.",
    author: "unknown"
  }, {
    quote: "Tough times don't last. Tough people do.",
    author: "unknown"
  }, {
    quote: "There are no shortcuts to any place worth going.",
    author: "unknown"
  }, {
    quote: "The only way to define your limits is by going beyond them.",
    author: "unknown"
  }, {
    quote: "The good stuff is always worth the work it takes.",
    author: "unknown"
  }, {
    quote: "The body achieves what the mind believes.",
    author: "unknown"
  }, {
    quote: "Limitations exist only if you let them.",
    author: "unknown"
  }, {
    quote: "It's not about having time. It's about making time.",
    author: "unknown"
  }, {
    quote: "It doesn't matter who’s faster or stronger than you. All that matters is YOU are better than the previous you.",
    author: "unknown"
  }
];

export const getRandomQuote = () => {
  const index = chance.natural({ min: 0, max: quotes.length });
  return quotes[index];
}
