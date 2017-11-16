
import { app, ipcMain, BrowserWindow } from 'electron';
import { push } from 'react-router-redux';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

import path from 'path';
import url from 'url';

import { actionTypes as settingsActionTypes } from './src/store/reducers/settings';
import settings from './lib/settings';

const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow;
let workerWindow;

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
    const defaultWorkspacePath = path.join(app.getPath('home'), 'code-companion');
    const appSettingsPath = path.join(appData, 'code-companion', 'settings.json');
    const settingsObj = await settings.loadOrCreate(appSettingsPath);

    mainWindow.webContents.send('dispatch', {
      type: settingsActionTypes.APP_PATHS_LOADED,
      payload: {
        appData: appDataPath,
        defaultWorkspacePath,
      },
    });
    mainWindow.webContents.send('dispatch', {
      type: settingsActionTypes.APP_SETTINGS_LOADED,
      payload: {
        settings: settingsObj,
      },
    });
    if (!settingsObj.workspacePath) {
      mainWindow.webContents.send('dispatch', push('/onboarding'));
    } else if (!isDevelopment) {
      mainWindow.webContents.send('dispatch', push('/'));
    }
    ipcMain.on('action', (event, action) => {
      if (action.type === settingsActionTypes.SAVE_SETTINGS) {
        console.log('main got SAVE_SETTINGS', action);
        settings.save(appSettingsPath, action.settings);
      }
    });
    ipcMain.on('load-lesson', (event, lesson) => {
      global.workerWindow.webContents.send('load-lesson', lesson);
    });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createWorkerWindow() {
  global.workerWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload-worker.js'),
      nodeIntegration: false,
      // sandbox: true,
      contextIsolation: true,
    },
  });
  const workerHtml = url.format({
    pathname: path.join(__dirname, 'public', 'worker.html'),
    protocol: 'file:',
    slashes: true,
  });
  global.workerWindow.loadURL(workerHtml);
  global.workerWindow.webContents.on('did-finish-load', () => {
    global.workerWindow.webContents.openDevTools();
  });
}

app.on('ready', () => {
  createWorkerWindow();
  createWindow();
});

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
