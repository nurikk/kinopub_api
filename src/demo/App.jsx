import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom'

import * as kinopub from './../Api';

import s from './demo.css';

import HomePage from './pages/HomePage';
import PairPage from './pages/PairPage';
import VideoPage from './pages/VideoPage';
import CategoryPage from './pages/CategoryPage';
import NotFoundPage from './pages/NotFoundPage';

import HeaderNav from './components/HeaderNav';

import * as appCss from './App.css';

class App extends Component {
  onPairing(userCode, verificationUrl) {
    this.setState({isLoggedIn: false, verificationUrl, userCode});
  }
  onTokenLoaded() {
    this.setState({isLoggedIn: true});
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: undefined,
      userCode: '',
      verificationUrl: ''
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

    let routes;
    switch (this.state.isLoggedIn) {
      case false:
        routes = (<PairPage
          userCode={this.state.userCode}
          verificationUrl={this.state.verificationUrl}/>);
        break;

      case true:
        routes = (
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/category/:contentType' component={CategoryPage}/>
            <Route path='/video/:videoId' component={VideoPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        );
        break;

      default:
        routes = (
          <div>Loading...</div>
        );
        break;
    }

    return (
      <main>
        <HeaderNav/> {routes}
      </main>
    )
  }
}
export default App;
