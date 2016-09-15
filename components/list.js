import React, { Component } from 'react';
import { StyleSheet, ListView, Image, TouchableHighlight } from 'react-native';

class List extends Component {
  constructor({ items }) {
    super(...arguments);
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      dataSource: ds.cloneWithRows(items)
    };
  }

  render() {
    const { onItemTap } = this.props;
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(item, sectionId, idx) =>
          <TouchableHighlight key={idx} onPress={() => onItemTap(+idx)} style={styles.item}>
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={{ width: 150, height: 150 }}
              resizeMode='contain'
              onPress={() => onItemTap(idx)}
            />
          </TouchableHighlight>
        }
      />
    );
  }
}

List.propTypes = {
  items: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  onItemTap: React.PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  item: {
    width: 150,
    height: 150,
    margin: 5
  }
});

export default List;
