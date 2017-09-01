import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

import path from 'path';
import url from 'url';

const isDevelopment = process.env.NODE_ENV === 'development';
let mainWindow;

function createWindow () {
  if (isDevelopment) {
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
  }
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  const hotURL = 'http://localhost:8080';
  const prodURL = url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(isDevelopment ? hotURL : prodURL);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', () => {
    const appData = app.getPath('appData');
    const appDataPath = path.join(appData, 'code-companion');
    
    mainWindow.webContents.send('dispatch', {
      type: 'APP_PATHS_LOADED',
      payload: {
        // appPath: app.getAppPath(),
        appData: appDataPath,
        // userData: app.getPath('userData'),
      },
    });
  });

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
