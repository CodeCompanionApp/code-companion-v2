import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';
import { actionTypes as settingsActionTypes } from '../../store/reducers/settings';

const { remote: { dialog } } = require('electron');

const containerStyle = {
  margin: '4rem 6rem',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
};

const welcomeHeaderStyle = {
  fontSize: '2.5rem',
  marginBottom: '1rem',
  fontWeight: 300,
  textAlign: 'center',
};

const labelStyle = {
  display: 'block',
  marginBottom: '1rem',
};

const radioStyle = {
  margin: '0 0.5rem 0 0',
};

class Onboarding extends React.Component {
  constructor() {
    super();
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.chooseWorkspacePath = this.chooseWorkspacePath.bind(this);
    this.finish = this.finish.bind(this);
  }

  state = {
    customWorkspacePath: null,
    currentlySelected: 'default',
  }

  handleOptionChange(event) {
    const newValue = event.target.value;
    this.setState({
      currentlySelected: newValue,
    });
    if (newValue === 'custom' && !this.state.customWorkspacePath) {
      setTimeout(() => this.chooseWorkspacePath(), 100);
    }
  }

  canContinue() {
    return this.state.currentlySelected === 'default' || this.state.customWorkspacePath;
  }

  chooseWorkspacePath() {
    const details = {
      title: 'Select a directory for your projects',
      properties: ['openDirectory', 'createDirectory'],
      buttonLabel: 'Choose',
    };

    const path = dialog.showOpenDialog(details);

    if (!path && !this.state.customWorkspacePath) {
      this.setState({ currentlySelected: 'default' });
      return;
    }
    if (path) {
      this.setState({ customWorkspacePath: path[0] });
    }
  }

  finish() {
    const { currentlySelected } = this.state;
    const workspacePath = currentlySelected === 'default'
      ? this.props.defaultWorkspacePath
      : this.state.customWorkspacePath;

    this.props.setWorkspacePath(workspacePath);
  }

  render() {
    const { defaultWorkspacePath } = this.props;
    const { customWorkspacePath } = this.state;
    return (
      <div style={containerStyle}>
        <div style={welcomeHeaderStyle}>Welcome to Code Companion! 👋</div>
        <p>
          Hey there! I hope you&apos;re excited to start coding.
          Let&apos;s choose a place on your computer to store your projects.
        </p>

        <p style={{ marginLeft: '2rem' }}>
          <label htmlFor="default" style={labelStyle}>
            <input
              style={radioStyle}
              type="radio"
              id="default"
              name="workspacePath"
              value="default"
              checked={this.state.currentlySelected === 'default'}
              onChange={this.handleOptionChange}
            />
            {defaultWorkspacePath} <span style={{ color: '#666' }}>(recommended)</span>
          </label>
          <label htmlFor="custom" style={labelStyle}>
            <input
              style={radioStyle}
              type="radio"
              id="custom"
              name="workspacePath"
              value="custom"
              checked={this.state.currentlySelected === 'custom'}
              onChange={this.handleOptionChange}
            />
            {customWorkspacePath ? <span>{customWorkspacePath} <a href="#" onClick={this.chooseWorkspacePath}>Change&hellip;</a></span> : <span>I&apos;ll choose my own path&hellip;</span>}
          </label>
        </p>

        <Button onClick={this.finish} disabled={!this.canContinue()}>Ok, let&apos;s go!</Button>

      </div>
    );
  }
}

Onboarding.propTypes = {
  defaultWorkspacePath: PropTypes.string,
  setWorkspacePath: PropTypes.func.isRequired,
};

Onboarding.defaultProps = {
  defaultWorkspacePath: 'Loading...',
};

const mapStateToProps = state => ({ defaultWorkspacePath: state.settings.defaultWorkspacePath });
const mapDispatchToProps = dispatch => ({
  setWorkspacePath(workspacePath) {
    dispatch({
      type: settingsActionTypes.SETTINGS_SET_WORKSPACE_PATH,
      workspacePath,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
