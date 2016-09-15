import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const InfoMessage = ({ text = 'Please wait...' }) =>
  <View style={styles.container}>
    <Text style={styles.text}>
      {text}
    </Text>
  </View>;

InfoMessage.propTypes = {
  text: React.PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

export default InfoMessage;
