# Code Companion Desktop App

This package contains all the code for the main Code Companion Electron app.

# Development

Follow the instructions to setup this repository in the [main README.md](/README.md).

Then to start the Electron app type `yarn start`.

You will be prompted to choose a workspace path, which is where you will keep content and files related to lessons. (Not the lessons themselves, see below for that.)

# Adding Lessons

When the application finishes loading press <kbd>Ctrl (or Cmd)</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> to open the Chrome DevTools, check the _Console_ tab for a message that says `Going to search` which is followed by the search path for lessons. Copy or note this path down.

Create the `lessons` folder at that path and then `cd` into it so you can `git pull` down the sample Code Companion lesson from this repository. Now when you reload or restart the app you should be able to see and start your lesson.
