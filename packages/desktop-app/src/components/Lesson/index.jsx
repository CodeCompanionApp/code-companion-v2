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

function createMarkup(html) { return { __html: html }; }

class Lesson extends Component {
  state = {
    currentSlideIndex: 0,
  }

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
    const { lesson } = this.props;
    const { currentSlideIndex } = this.state;
    return (
      lesson.loaded &&
      <div>
        <div dangerouslySetInnerHTML={createMarkup(lesson.data.slides[currentSlideIndex].content)} />
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
  lesson: { loaded: false },
};

const mapStateToProps = (state, { match }) => ({
  lesson: state.lessons.byId[match.params.lessonId],
});

export default connect(mapStateToProps)(Lesson);
