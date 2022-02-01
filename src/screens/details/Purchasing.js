import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

const Purchasing = () => {
  return (
    <View style={styles.container}>
      <Text>Purchasing works</Text>
    </View>
  );
};

export default Purchasing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
