import url from 'url';
import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const getLessonSrc = lesson => url.format({
  pathname: path.join(lesson.path, lesson.main),
  protocol: 'file:',
  slashes: true,
});

class Lesson extends Component {
  componentDidMount() {
    this.wv.addEventListener('dom-ready', () => {
      this.wv.openDevTools();
    });
  }
  renderLessonWebView() {
    return this.props.lesson ?
      <webview
        ref={(wv) => { this.wv = wv; }}
        id="foo"
        src={getLessonSrc(this.props.lesson)}
        style={{ display: 'inline-flex', width: '780px', height: '470px', border: '1px solid #ccc' }}
        preload={this.props.preload}
      /> : <p>Loading...</p>;
  }
  render() {
    return (
      <div>
        <p>This is a lesson!</p>
        {this.renderLessonWebView()}
      </div>
    );
  }
}

Lesson.propTypes = {
  lesson: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
  preload: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { match }) => ({
  lesson: state.lessons.byId[match.params.lessonId],
  preload: state.settings.preloadScript,
});

export default connect(mapStateToProps)(Lesson);
