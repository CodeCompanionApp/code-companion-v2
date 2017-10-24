import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Home from '../Home';
import LessonOverview from '../LessonOverview';
import Lesson from '../Lesson';
import About from '../About';

export default () => (
  <div>
    <b>Menu: </b>
    <Link to="/">Home</Link> •&nbsp;
    <Link to="/about">About</Link>
    <hr />
    <Switch>
      <Route exact path="/lesson/:lessonId" component={LessonOverview} />
      <Route exact path="/lesson/:lessonId/start" component={Lesson} />
      <Route exact path="/about" component={About} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);
