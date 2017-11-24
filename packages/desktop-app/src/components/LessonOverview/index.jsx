import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { actionTypes as lessonsActionTypes } from '../../store/reducers/lessons';

import Button from '../Button';
import style from './index.css';

const LessonOverview = ({ lesson, workspaces, createNewWorkspace }) => (
  !lesson ? <div>Loading...</div> :
  <div className={style.container}>
    <div className={style.lessonName}>{lesson.name}</div>
    <p>{lesson.description}</p>
    <ul className={style.metaData}>
      <li>Created by: {lesson.author}</li>
      <li>Time: {lesson.time}</li>
    </ul>

    <table className={style.workspacesTable} cellPadding="0" cellSpacing="0">
      <thead>
        <tr>
          <th className={style.workspacesTableHeader}>Workspace Folder</th>
          <th className={style.workspacesTableHeader}>Last modified</th>
          <th className={style.workspacesTableHeader}>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {workspaces.map(w => (
          <tr key={w.folder}>
            <td className={style.workspacesTableRow}>{w.folder}</td>
            <td className={style.workspacesTableRow}>Unknown</td>
            <td className={style.workspacesTableRow}>
              <Link to={`/lesson/${lesson.id}/${w.folder}`}>Continue</Link>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="3" className={style.workspacesTableButtonRow}>
            <Button onClick={() => createNewWorkspace(lesson)}>
              Start Lesson (New Workspace)
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

LessonOverview.propTypes = {
  createNewWorkspace: PropTypes.func.isRequired,
  lesson: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    path: PropTypes.string,
  }),
  workspaces: PropTypes.arrayOf(PropTypes.shape({
    folder: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
};

LessonOverview.defaultProps = {
  lesson: null,
};

const getWorkspaces = (state, lessonId) => {
  const { workspaces = [] } = state.settings.settings;
  return workspaces.filter(w => w.lessonId === lessonId);
};

const mapStateToProps = (state, { match }) => ({
  lesson: state.lessons.byId[match.params.lessonId],
  workspaces: getWorkspaces(state, match.params.lessonId),
});

const mapDispatchToProps = dispatch => ({
  createNewWorkspace(lesson) {
    dispatch({
      type: lessonsActionTypes.LESSON_CREATE_WORKSPACE,
      lesson,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonOverview);
