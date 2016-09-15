import React, { Component } from 'react';
import { StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import Detail from './detail';

class Slider extends Component {
  constructor({ position }) {
    super(...arguments);

    this.state = {
      left: new Animated.Value(
        this.getLeftForIdx(position)
      ),
      position,
    };
  }

  componentWillMount() {
    let canSwitchLeft, canSwitchRight, left;

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dx) > 5,
      onPanResponderGrant: () => {
        left = this.getLeftForIdx(this.state.position);
        canSwitchLeft = this.state.position > 0;
        canSwitchRight = this.state.position < this.props.items.length - 1;
      },
      onPanResponderMove: (e, gState) => {
        let dx = gState.dx;
        if (!canSwitchRight) { dx = Math.max(dx, -50); }
        if (!canSwitchLeft) { dx = Math.min(dx, 50); }

        this.state.left.setValue(left + dx);
      },
      onPanResponderRelease: (e, gState) => {
        const { width } = Dimensions.get('window');
        const { position } = this.state;
        let toValue, newPosition;

        if (gState.dx >= 150 && canSwitchLeft) { // switch left
          [toValue, newPosition] = [left + width, position - 1];

        } else if (gState.dx <= -150 && canSwitchRight) { // switch right
          [toValue, newPosition] = [left - width, position + 1];

        } else { // move back
          [toValue, newPosition] = [left, position];
        }

        Animated.timing(this.state.left, { toValue, duration: 200 }).start(() => {
          this.setState({ position: newPosition });
        });
      },
    });
  }

  componentWillUpdate(nextProps, nextState) {
    this.state.left.setValue(this.getLeftForIdx(nextState.position));
    return true;
  }

  getItemsToDisplay() {
    const { position } = this.state;
    const { items } = this.props;

    return position === 0
      ? items.slice(0, 2)
      : position === items.length - 1
        ? items.slice(items.length - 2, items.length)
        : items.slice(position - 1, position + 2);
  }

  getLeftForIdx(idx) {
    return idx === 0 ? 0 : -Dimensions.get('window').width;
  }

  render() {
    const { width } = Dimensions.get('window');
    const items = this.getItemsToDisplay();

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              { translateX: this.state.left }
            ],
            width: width * items.length
          }
        ]}
        {...this._panResponder.panHandlers}
      >
        {items.map(item => <Detail key={item.title} item={item} />)}
      </Animated.View>
    );
  }
}

Slider.PropTypes = {
  items: React.PropTypes.array.isRequired,
  position: React.PropTypes.number
};

Slider.defaultProps = {
  position: 0
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
});

export default Slider;
