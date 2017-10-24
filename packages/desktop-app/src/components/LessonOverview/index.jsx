import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LessonOverview = ({ lesson }) => (
  <div>
    <h4>{lesson.name}</h4>
    <pre><code>{JSON.stringify(lesson, null, 4)}</code></pre>
    <ul>
      <li><Link to={`/lesson/${lesson.id}/start`}>Start lesson</Link></li>
      <li><Link to="/">Back home</Link></li>
    </ul>
  </div>
);

LessonOverview.propTypes = {
  lesson: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state, { match }) => ({
  lesson: state.lessons.byId[match.params.lessonId],
});

export default connect(mapStateToProps)(LessonOverview);
