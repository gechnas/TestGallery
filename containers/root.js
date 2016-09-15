import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
import API from '../lib/api';
import InfoMessage from '../components/info-message';
import List from '../components/list';
import Slider from '../components/slider';

export default class Root extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      mode: 'loading',
      images: [],
      imageId: null,
    };
    this.api = new API();
    this.retrieveImages();
  }

  componentDidMount() {
    this._backHandler = () => {
      if (this.state.mode === 'detail') {
        this.setState({ mode: 'gallery' });
        return true;
      }
      return false;
    };
    BackAndroid.addEventListener('hardwareBackPress', this._backHandler);
  }

  componenWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._backHandler);
  }

  retrieveImages() {
    return this.api.getAll()
      .then(images => this.setState({ mode: 'gallery', images }))
      .catch(() => this.setState({ mode: 'error' }));
  }

  render() {
    const { mode, images, imageId } = this.state;
    switch (mode) {
      case 'gallery':
        return (
          <List
            items={images}
            onItemTap={itemId => this.setState({ mode: 'detail', imageId: itemId })}
          />
        );

      case 'detail':
        return (
          <Slider
            items={images}
            position={imageId}
          />
        );

      case 'error':
        return <InfoMessage text='Opps! Something went wrong.' />;

      default:
        return <InfoMessage text='Loading...' />;
    }
  }
}
