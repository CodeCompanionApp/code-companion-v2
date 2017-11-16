const parser = require('cc-lesson-parser');
const { ipcRenderer } = require('electron');
const path = require('path');

ipcRenderer.on('load-lesson', (event, lesson) => {
  const fullPath = path.join(lesson.path, lesson.main);
  parser.readAndParse(fullPath).then((parsed) => {
    if (parsed.script) {
      // This is safe to do because we're in an entirely isolated context
      // where only the CodeCompanion API is available
      eval(parsed.script); // eslint-disable-line
    }
  });
});

const CodeCompanion = { // eslint-disable-line
  registerSlide() {
    console.log('registerSlide was just called');
  },
};

process.once('loaded', () => {
  console.log('hello');
});
