import fs from 'fs';
import promisify from 'util.promisify';

const asyncWriteFile = promisify(fs.writeFile);
const asyncReadFile = promisify(fs.readFile);

const settings = {
  async loadOrCreate(settingsFile) {
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
  },
  async save(settingsFile, data) {
    try {
      await asyncWriteFile(settingsFile, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error saving settings file.'); // eslint-disable-line
    }
  },
};

export default settings;
