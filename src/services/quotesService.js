import Chance from 'chance';

const chance = new Chance();

const quotes = [
  "Eat clean, train dirty.",
  "No pain, no gain.",
  "If it doesn't challenge you, it doesn't change you.",
  "The only way to finish is to start.",
  "Don't stop when you are tired. Stop when you are done.",
  "You don't always get what you wish for, you get what you work for.",
  "Pain is weakness leaving the body.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "Push harder than yesterday if you want a different tomorrow.",
  "You're only one workout away from a good mood.",
  "The same voice that says \"give up\" can also be trained to say \"keep going\".",
  "You are what you eat - so don't be fast, cheap, easy or fake.",
  "It hurts now, but one day it'll be your warm up.",
  "Pain is temporary, pride is forever.",
  "That which does not kill me makes me stronger.",
  "Tough times don't last. Tough people do.",
  "There are no shortcuts to any place worth going.",
  "The only way to define your limits is by going beyond them.",
  "The good stuff is always worth the work it takes.",
  "The body achieves what the mind believes.",
  "Limitations exist only if you let them.",
  "It's not about having time. It's about making time.",
  "It doesn't matter who’s faster or stronger than you. All that matters is YOU are better than the previous you."
];

export const getRandomQuote = () => {
  const index = chance.natural({ min: 0, max: quotes.length });
  return quotes[index];
}
