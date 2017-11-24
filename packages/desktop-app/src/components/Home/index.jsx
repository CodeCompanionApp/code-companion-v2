import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = ({ lessons }) => (
  <div>
    <div style={{ fontSize: '24px' }}>Welcome to <br /><b>Code Companion</b> 👋</div>
    {
      lessons.length === 0
      ? <p>
        Sorry, no lessons were found on your computer. That&apos;s really kind of sad. 😧
        </p>
      : <p>
          Here the available lessons:
        </p>
    }
    {
      lessons.length > 0
      ?
        <ul>
          {lessons.map(lesson => (
            <li key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`}>{lesson.name}</Link>
            </li>
          ))}
        </ul>
      : null
    }
  </div>
);

Home.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({ lessons: Object.values(state.lessons.byId) });

export default connect(mapStateToProps)(Home);
