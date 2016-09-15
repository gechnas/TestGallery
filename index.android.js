/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Root from './containers/root';

class TestGallery extends Component {
  render() {
    return <Root />;
  }
}

AppRegistry.registerComponent('TestGallery', () => TestGallery);
