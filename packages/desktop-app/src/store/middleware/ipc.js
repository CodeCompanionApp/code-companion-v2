import { ipcRenderer } from 'electron';

export default ({ dispatch }) => {
  ipcRenderer.on('dispatch', (event, payload) => dispatch(payload));
  return next => action => next(action);
};
