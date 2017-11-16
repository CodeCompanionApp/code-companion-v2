import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actionTypes as lessonsActionTypes } from '../../store/reducers/lessons';

import Button from '../Button';
import style from './index.css';

const LessonOverview = ({ lesson, createNewWorkspace }) => (
  !lesson ? <div>Loading...</div> :
  <div className={style.container}>
    <div className={style.lessonName}>{lesson.name}</div>
    <p>{lesson.description}</p>
    <Button onClick={() => createNewWorkspace(lesson)}>
      Start Lesson
    </Button>
  </div>
);

LessonOverview.propTypes = {
  createNewWorkspace: PropTypes.func.isRequired,
  lesson: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    path: PropTypes.string,
  }),
};

LessonOverview.defaultProps = {
  lesson: null,
};

const mapStateToProps = (state, { match }) => ({
  lesson: state.lessons.byId[match.params.lessonId],
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
