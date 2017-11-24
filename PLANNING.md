# Code Companion

## What is Code Companion?

Code Companion is a simple desktop application that teaches you programming and computer skills.

## Application Goals

For the first version of Code Companion the focus is on being able to view and run pre-installed lessons. Future versions will include features such as a lesson directory, user accounts, and even paid content.

## Stories

0. I can start the app and choose a directory for my workspaces
1. I can view available lessons and lessons in progress
2. I can start a lesson with a new workspace (directory)
    - I can edit code with a real editor
    - I am taken to the next step as I progress through the lesson content
    - I can see a persistent display on the screem with my next step
3. I can continue from an existing workspace and resume where I left off
4. I can delete an existing lesson workspace

## How lessons work

A lesson is a directory containing the following:

- **manifest.json**: A JSON file containing metadata for the lesson
- **lesson.md**: The lesson content in a special Markdown format (see below)
- **assets/**: A subdirectory of images and other assets (optional)
- **index.js**: A script for the logic of the lesson (optional)

### The Markdown format

