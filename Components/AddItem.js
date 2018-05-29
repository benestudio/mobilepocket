import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default ({
  item,
  text,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
  >
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#86BBD8',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#0B5A84',    
    marginTop: -6,
  },
});
