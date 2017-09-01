import React from 'react';
import { Route, Link } from 'react-router-dom';

import Home from '../Home';
import Lesson from '../Lesson';
import About from '../About';

export default () => (
  <div>
    <b>Menu: </b>
    <Link to="/">Home</Link> •&nbsp;
    <Link to="/about">About</Link>
    <hr />
    <Route exact path="/" component={Home} />
    <Route path="/lesson/:lessonId" component={Lesson} />
    <Route path="/about" component={About} />
  </div>
);
