import path from 'path';
import fs from 'fs';
import globby from 'globby';
import { actionTypes } from '../reducers/settings';

const getLessons = (potentialLessonDirs) => {
  const lessonsData = [];
  potentialLessonDirs.forEach((dir) => {
    const manifestPath = path.join(dir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) { return; }
    let parsedManifest;
    try {
      parsedManifest = JSON.parse(fs.readFileSync(manifestPath).toString());
    } catch (err) {
      return;
    }
    parsedManifest = { ...parsedManifest, path: dir };
    lessonsData.push(parsedManifest);
  });
  return lessonsData;
};

const discoverLessons = async (searchPath, dispatch) => {
  console.log('Going to search', searchPath);
  const potentialLessonDirs = await globby(searchPath);
  const lessonsData = await getLessons(potentialLessonDirs);
  dispatch({ type: 'LESSONS_LOADED', payload: { lessons: lessonsData } });
  console.log(lessonsData);
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.APP_PATHS_LOADED: {
      const { settings: { appData } } = getState();
      const searchPath = path.join(appData, 'lessons', '*/');
      discoverLessons(searchPath, dispatch);
      break;
    }
    default:
      break;
  }
};
