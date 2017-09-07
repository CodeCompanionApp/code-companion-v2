import url from 'url';
import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Return the src for the lesson to show in webview
 * @param  {object} lesson lesson manifest
 * @return {string}
 */
const getLessonSrc = lesson => url.format({
  pathname: path.join(lesson.path, lesson.main),
  protocol: 'file:',
  slashes: true,
});

class Lesson extends Component {
  constructor() {
    super();
    this.openLessonDevTools = this.openLessonDevTools.bind(this);
  }
  componentDidUpdate() {
    if (this.webview) {
      this.webview.addEventListener('dom-ready', () => {
        // this.openLessonDevTools();
      });
    }
  }
  openLessonDevTools() {
    this.webview.openDevTools();
  }
  renderLessonWebView() {
    return this.props.lesson ?
      <webview
        ref={(webview) => { this.webview = webview; }}
        id="foo"
        src={getLessonSrc(this.props.lesson)}
        style={{ display: 'inline-flex', width: '780px', height: '470px', border: '1px solid #ccc' }}
        preload={this.props.preload}
      /> : <p>Loading...</p>;
  }
  render() {
    return (
      <div>
        <p>
          This is a lesson!
          <button onClick={this.openLessonDevTools}>
            Open DevTools for Lesson
          </button>
        </p>
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
