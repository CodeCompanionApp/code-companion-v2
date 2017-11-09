
import { app, BrowserWindow } from 'electron';
import { push } from 'react-router-redux';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

import path from 'path';
import url from 'url';
import fs from 'fs';
import promisify from 'util.promisify';

import { actionTypes as settingsActionTypes } from './src/store/reducers/settings';

// Promisify node fs functions
const asyncWriteFile = promisify(fs.writeFile);
const asyncReadFile = promisify(fs.readFile);

const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow;

async function loadOrCreateSettings(settingsFile) {
  let contents;
  let file;
  try {
    file = await asyncReadFile(settingsFile);
    contents = file.toString();
  } catch (e) {
    console.log('Could not read settings file, creating...'); // eslint-disable-line
    try {
      await asyncWriteFile(settingsFile, '{}');
      contents = '{}';
    } catch (err) {
      console.error('Could not write settings file!', err); // eslint-disable-line
      return {};
    }
  }
  try {
    return JSON.parse(contents);
  } catch (e) {
    console.error('Unable to parse settings file JSON', e); // eslint-disable-line
    return {};
  }
}

function createWindow() {
  installExtension([REDUX_DEVTOOLS]);
  mainWindow = new BrowserWindow({ width: 800, height: 600, titleBarStyle: 'hidden' });

  const hotURL = 'http://localhost:8080';
  const prodURL = url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(isDevelopment ? hotURL : prodURL);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', async () => {
    const appData = app.getPath('appData');
    const appDataPath = path.join(appData, 'code-companion');
    const appSettingsPath = path.join(appData, 'code-companion', 'settings.json');

    if (!isDevelopment) {
      mainWindow.webContents.send('dispatch', push('/'));
    }
    mainWindow.webContents.send('dispatch', {
      type: settingsActionTypes.APP_PATHS_LOADED,
      payload: {
        appData: appDataPath,
      },
    });
    mainWindow.webContents.send('dispatch', {
      type: settingsActionTypes.APP_SETTINGS_LOADED,
      payload: {
        settings: loadOrCreateSettings(appSettingsPath),
      },
    });
  });

  /* ipcMain.on('action', (event, action) => {
    console.log(action);
  }); */

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
