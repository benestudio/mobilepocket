import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => (
  <View style={styles.container}>
    <Text>Add your first item!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#1D2D44',
  },
});
