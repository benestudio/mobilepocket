import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default ({
  item,
  onRemove,
}) => (
  <View
    style={styles.container}
  >
    <Image style={styles.image} source={{ uri: item.uri }} />
    <Text style={styles.text}>{item.text}</Text>
    <TouchableOpacity
      style={styles.removeButton}
      onPress={() => onRemove(item)}
    >
      <Text style={styles.removeText}>remove</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 300,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 3,
    padding: 15,
  },
  text: {
    fontSize: 20,
    marginTop: -6,
    color: '#F4FAFE',
  },
  removeButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,.4)',    
  },
  removeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -6,
    color: '#F4FAFE',
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
