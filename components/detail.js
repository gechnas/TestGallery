import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Detail = ({ item }) =>
  <View style={styles.container}>
    <Text style={styles.title}>{item.title}</Text>
    <Image
      source={{ uri: item.originalUrl }}
      style={styles.image}
      resizeMode='contain'
    />
    <Text style={styles.description}>{item.description}</Text>
  </View>;

Detail.propTypes = {
  item: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    originalUrl: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    padding: 10
  },
  image: {
    flex: 1
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
  }
});

export default Detail;
