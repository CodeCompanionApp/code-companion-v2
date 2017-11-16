const hljs = require('highlight.js');

module.exports = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (__) {} // eslint-disable-line
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (__) {} // eslint-disable-line

  return ''; // use external default escaping
};
