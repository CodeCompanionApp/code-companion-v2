import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Home from '../Home';
import Onboarding from '../Onboarding';
import LessonOverview from '../LessonOverview';
import Lesson from '../Lesson';
import About from '../About';
import AppTitleBar from '../AppTitleBar';
import AppContentContainer from '../AppContentContainer';

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export default () => (
  <div style={appContainerStyle}>
    <AppTitleBar />
    <AppContentContainer>
      <Switch>
        <Route exact path="/onboarding" component={Onboarding} />
        <Route exact path="/lesson/:lessonId" component={LessonOverview} />
        <Route exact path="/lesson/:lessonId/:workspace" component={Lesson} />
        <Route exact path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      <Link to="/" style={{ color: '#888', fontSize: '0.8rem', padding: '0 1rem' }}>Back Home</Link>
    </AppContentContainer>
  </div>
);
