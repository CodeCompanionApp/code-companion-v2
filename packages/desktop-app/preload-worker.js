const parser = require('cc-lesson-parser');

const { ipcRenderer } = require('electron');
const path = require('path');

let _settings = {}; // eslint-disable-line
function configure(settings) {
  _settings = settings;
}

const CodeCompanion = { // eslint-disable-line
  configure,
};

ipcRenderer.on('load-lesson', (event, lesson) => {
  const fullPath = path.join(lesson.path, lesson.main);
  parser.readAndParse(fullPath).then((parsed) => {
    if (parsed.script) {
      // This is safe to do because we're in an entirely isolated context
      // where only the CodeCompanion API is available
      // eval(parsed.script); // eslint-disable-line
      // delete parsed.script;
    }
    ipcRenderer.send(
      'load-lesson-complete',
      Object.assign(
        { lessonId: lesson.id },
        parsed,
        { settings: _settings },
      ),
    );
  });
});

process.once('loaded', () => {
  // Expose any needed globals
  // window.foo = foo;
});
