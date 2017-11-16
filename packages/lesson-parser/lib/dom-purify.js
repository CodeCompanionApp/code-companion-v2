const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const getWindow = () => {
  try {
    return window;
  } catch (err) {
    const { window } = (new JSDOM(''));
    return window;
  }
};


const DOMPurify = createDOMPurify(getWindow());

module.exports = DOMPurify;
