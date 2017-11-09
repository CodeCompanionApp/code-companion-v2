const { remote } = require('electron');

window.remote = remote;
window.lessonApi = () => require.resolve('code-companion-lesson-api');
