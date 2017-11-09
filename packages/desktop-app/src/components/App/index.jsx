import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
import LessonOverview from '../LessonOverview';
import Lesson from '../Lesson';
import About from '../About';
import HeaderNavBar from '../HeaderNavBar';

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

export default () => (
  <div style={appContainerStyle}>
    <HeaderNavBar />
    <Switch>
      <Route exact path="/lesson/:lessonId" component={LessonOverview} />
      <Route exact path="/lesson/:lessonId/start" component={Lesson} />
      <Route exact path="/about" component={About} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);
