import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';

const lessonOverviewContainerStyle = {

};

const LessonOverview = ({ lesson }) => (
  !lesson ? <div>Loading...</div> :
  <div style={lessonOverviewContainerStyle}>
    <p>Lesson: {lesson.name}</p>
    <Button to={`/lesson/${lesson.id}/start`}>
      Start Lesson
    </Button>
  </div>
);

LessonOverview.propTypes = {
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

export default connect(mapStateToProps)(LessonOverview);
