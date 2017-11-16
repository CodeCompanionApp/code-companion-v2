const Remarkable = require('remarkable');
const fs = require('fs');
const cheerio = require('cheerio');

const highlight = require('./lib/remarkable-highlight');
const DOMPurify = require('./lib/dom-purify');

const asyncReadFile = require('util.promisify')(fs.readFile);

const markdownRenderer = new Remarkable('full', { html: false, typographer: true, highlight });

/**
 * Extracts the <script> tag from a given lesson HTML and returns them both separately.
 *
 * @param  {string} html
 *
 * @return {object}  { script, doc }
 */
const exctractScript = (html) => {
  const $ = cheerio.load(html);
  const scriptEl = $('script');
  const script = scriptEl.length ? scriptEl.html() : false;

  $('script').remove();
  const doc = $.html();

  return {
    script,
    doc,
  };
};

/**
 * Parse and format the markdown content of a slide as sanitized HTML.
 *
 * @param  {sting} slideContent
 *
 * @return {string}
 */
const parseContent = (slideContent) => {
  const html = markdownRenderer.render(slideContent);
  const trimmed = html.replace(/^\s+|\s+$/g, '');
  const sanitized = DOMPurify.sanitize(trimmed);

  return sanitized;
};

/**
 * Splits a lesson file into slides.
 *
 * @param  {string} doc
 *
 * @return {array}
 */
const splitIntoSlides = (doc) => {
  const $ = cheerio.load(doc);
  const slides = $('slide').toArray().map((node, index) => {
    const id = node.attribs.id ? node.attribs.id : `slide-${index + 1}`;
    const html = node.children[0].data;
    const content = parseContent(html);
    return {
      id,
      content,
    };
  });
  return slides;
};

/**
 * Parses a specially formatted lesson Markdown (*.md) file into an object.
 * Also extracts the script, if present.
 *
 * Returns:
 *
 *  { slides: [ { id: 'foo', content: 'Hello, world!' }, ... ], script: 'CodeCompanion.foo();' }
 *
 * @param  {string} docString
 *
 * @return {object}
 */
const parse = (docString) => {
  const { script, doc } = exctractScript(docString);
  const slides = splitIntoSlides(doc);
  return {
    slides,
    script,
  };
};


const readAndParse = async (path) => {
  const file = await asyncReadFile(path);
  const doc = file.toString();
  return parse(doc);
};

const parser = {
  parse,
  readAndParse,
};

const doc = '/Users/hamstu/Library/Application Support/code-companion/lessons/welcome-to-code-companion/lesson.md';
(async () => { console.log(await parser.readAndParse(doc)); })();

module.exports = parser;
