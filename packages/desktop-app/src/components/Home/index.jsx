import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({ lessons }) => (
  <div>
    <p>Welcome to Code Companion. Here are the available lessons.</p>
    <ul>
      {lessons.map(lesson => (
        <li key={lesson.id}>
          <Link to={`/lesson/${lesson.id}`}>{lesson.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

Home.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.string }),
  ).isRequired,
};

const mapStateToProps = state => ({ lessons: state.lessons.lessons });

export default connect(mapStateToProps)(Home);
