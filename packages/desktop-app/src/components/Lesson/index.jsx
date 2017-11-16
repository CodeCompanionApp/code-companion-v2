import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actionTypes as lessonsActionTypes } from '../../store/reducers/lessons';

const loadLesson = (lessonId, dispatch) => {
  dispatch({
    type: lessonsActionTypes.LESSON_LOAD,
    lessonId,
  });
};

class Lesson extends Component {
  componentDidMount() {
    const { match: { params: { lessonId } } } = this.props;
    loadLesson(lessonId, this.props.dispatch);
  }
  componentWillReceiveProps(nextProps) {
    const { match: { params: { lessonId: nextLessonId } } } = nextProps;
    const { match: { params: { lessonId: currentLessonId } } } = this.props;
    if (nextLessonId !== currentLessonId) {
      loadLesson(nextLessonId, this.props.dispatch);
    }
  }
  render() {
    const { match, lesson } = this.props;
    return (
      <div>
        <pre>{JSON.stringify(match.params, null, 2)}</pre>
        <pre>{JSON.stringify(lesson, null, 2)}</pre>
      </div>
    );
  }
}

Lesson.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line
  lesson: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    path: PropTypes.string,
  }),
};

Lesson.defaultProps = {
  lesson: null,
};

const mapStateToProps = (state, { match }) => ({
  lesson: state.lessons.byId[match.params.lessonId],
});

export default connect(mapStateToProps)(Lesson);
