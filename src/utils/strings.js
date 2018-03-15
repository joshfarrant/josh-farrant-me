import { COLORS } from './styles';

const TITLE = 'Josh Farrant';
const DESCRIPTION = 'I\'m Josh, a JavaScript Developer, Consultant, and Blogger. Let\'s build something awesome together!';

export const DOCUMENT = {
  TITLE,
  URL: 'https://josh.farrant.me',
};

const TWITTER_USERNAME = '@farpixel';

export const META_TAGS = [
  {
    name: 'description',
    content: DESCRIPTION,
  }, {
    name: 'keywords',
    content: 'Freelance, JavaScript, React, Node.js, Developer',
  }, {
    name: 'theme_color',
    content: COLORS.PRIMARY,
  }, {
    name: 'twitter:card',
    content: 'summary',
  }, {
    name: 'twitter:site',
    content: TWITTER_USERNAME,
  }, {
    name: 'twitter:creator',
    content: TWITTER_USERNAME,
  }, {
    name: 'twitter:url',
    content: DOCUMENT.URL,
  }, {
    name: 'twitter:title',
    content: TITLE,
  }, {
    name: 'twitter:description',
    content: DESCRIPTION,
  }, {
    name: 'og:type',
    content: 'website',
  }, {
    name: 'og:title',
    content: TITLE,
  }, {
    name: 'og:description',
    content: DESCRIPTION,
  }, {
    name: 'og:url',
    content: DOCUMENT.URL,
  }, {
    name: 'og:site_name',
    content: TITLE,
  }, {
    name: 'og:locale',
    content: 'en_GB',
  },
];
