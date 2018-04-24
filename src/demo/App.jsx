import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import * as kinopub from './../Api';

import s from './demo.css';
import Home from './Home';
import Pair from './Pair';
import VideoPage from './VideoPage';
import Category from './Category';
import NotFoundPage from './NotFoundPage';
import {Switch, Route} from 'react-router-dom'

class App extends Component {
  onPairing() {
    this.setState({isLoggedIn: false});
  }
  onTokenLoaded() {
    this.setState({isLoggedIn: true});
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };

    kinopub
      .Api
      .on('pair', this.onPairing.bind(this));
    kinopub
      .Api
      .on('loaded', this.onTokenLoaded.bind(this));
  }
  componentDidMount() {
    kinopub
      .Api
      .auth
      .init();
  }
  render() {
    let routes = (
      <Switch>
        <Route component={Pair}/>
      </Switch>
    );

    if (this.state.isLoggedIn) {
      routes = (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/category/:contentType' component={Category}/>
          <Route path='/video/:videoId' component={VideoPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      );
    }
    return (
      <main>
        {routes}
      </main>
    )
  }
}
export default App;
