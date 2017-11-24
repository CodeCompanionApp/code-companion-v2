import path from 'path';
import fs from 'fs';
import globby from 'globby';
import mkdirp from 'mkdirp';
import promisify from 'util.promisify';
import { push } from 'react-router-redux';
import { ipcRenderer } from 'electron';

import { actionTypes as settingsActionTypes } from '../reducers/settings';
import { actionTypes as appActionTypes } from '../reducers/app';
import { actionTypes } from '../reducers/lessons';

const asyncReadFile = promisify(fs.readFile);
const asyncMkdirp = promisify(mkdirp);

const processLessonDirectory = async (lessonDir) => {
  const manifestPath = path.join(lessonDir, 'manifest.json');
  let parsedManifest;
  try {
    const manifestFile = await asyncReadFile(manifestPath);
    parsedManifest = JSON.parse(manifestFile.toString());
    parsedManifest = {
      ...parsedManifest,
      path: lessonDir,
      loading: false,
      loaded: false,
    };
  } catch (err) {
    console.error(`Error parsing lesson directory ${lessonDir}`, err);
    parsedManifest = null;
  }
  return parsedManifest;
};

const getLessons = (potentialLessonDirs) => {
  const processLessonsPromises = potentialLessonDirs.map(dir => processLessonDirectory(dir));
  return Promise.all(processLessonsPromises);
};

const discoverLessons = async (searchPath, settings, dispatch) => {
  console.log('Going to search', searchPath);

  const potentialLessonDirs = await globby(searchPath);
  const lessonsData = await getLessons(potentialLessonDirs);
  const validLessons = lessonsData.filter(lesson => lesson);

  dispatch({ type: actionTypes.LESSONS_LOADED, payload: { lessons: validLessons } });
  console.log(lessonsData);
};

export const findExistingWorkspaces = async (workspacePath, lessonWorkspaceName) => {
  const directoryGlob = `${lessonWorkspaceName}*/`;
  const glob = path.join(workspacePath, directoryGlob);
  const paths = await globby(glob);
  const dirNames = paths.map(p => path.basename(p));

  return dirNames;
};

const getFinalWorkspacePath = (lessonWorkspaceName, existingWorkspaces) => {
  let final = lessonWorkspaceName;
  let num = 1;
  while (existingWorkspaces.includes(final)) {
    num += 1;
    final = `${lessonWorkspaceName}-${num}`;
  }
  return final;
};

const createLessonWorkspace = async (workspacePath, lessonWorkspaceName) => {
  const existingWorkspaces = await findExistingWorkspaces(workspacePath, lessonWorkspaceName);
  const finalWorkspaceName = getFinalWorkspacePath(
    lessonWorkspaceName,
    existingWorkspaces,
  );
  const finalWorkspacePath = path.join(workspacePath, finalWorkspaceName);
  console.log({ existingWorkspaces, finalWorkspacePath });
  try {
    await asyncMkdirp(finalWorkspacePath);
  } catch (err) {
    console.error(`Couldn't create workspace directory ${finalWorkspacePath}`, err);
    return false;
  }
  return finalWorkspaceName;
};

async function handleCreateWorkspace({ settings, action, dispatch }) {
  const workspaceName = await createLessonWorkspace(
    settings.workspacePath,
    action.lesson.workspaceName,
  );
  if (workspaceName) {
    dispatch({
      type: actionTypes.LESSON_CREATE_WORKSPACE_COMPLETE,
      lessonId: action.lesson.id,
      workspaceName,
    });
    dispatch(push(`/lesson/${action.lesson.id}/${workspaceName}`));
    return;
  }
  dispatch({
    type: actionTypes.LESSON_CREATE_WORKSPACE_FAILED,
    lessonId: action.lesson.id,
  });
}

const events = [];

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  const { settings: { appData, settings } } = getState();
  switch (action.type) {
    case actionTypes.LESSONS_LOADED:
      dispatch({ type: appActionTypes.APP_READY });
      break;
    case actionTypes.LESSON_LOAD: {
      const { lessonId } = action;
      const { lessons: { byId: lessons } } = getState();
      const lesson = lessons[lessonId];
      if (lesson) {
        ipcRenderer.send('load-lesson', lesson);
      }
      break;
    }
    case actionTypes.LESSON_CREATE_WORKSPACE:
      handleCreateWorkspace({ settings, action, dispatch });
      break;
    // We need both of the next actions to happen before we load the lessons
    // so we keep track of them with the `events` array...
    case settingsActionTypes.APP_PATHS_LOADED:
    case settingsActionTypes.APP_SETTINGS_LOADED: {
      events.push(action.type);
      if (events.includes(settingsActionTypes.APP_PATHS_LOADED) &&
          events.includes(settingsActionTypes.APP_SETTINGS_LOADED)) {
        // @TODO: Allow custom lesson paths via settings file?
        const searchPath = path.join(appData, 'lessons', '*/');
        discoverLessons(searchPath, settings, dispatch);
      }
      break;
    }
    default:
      break;
  }
};
