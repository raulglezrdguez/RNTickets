import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

const Pictures = () => {
  return (
    <View style={styles.container}>
      <Text>Pictures works</Text>
    </View>
  );
};

export default Pictures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
