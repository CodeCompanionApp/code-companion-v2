import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Lesson extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.lesson)}
      </div>
    );
  }
}

Lesson.propTypes = {
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
