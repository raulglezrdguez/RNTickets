import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

const Finishing = () => {
  return (
    <View style={styles.container}>
      <Text>Finishing works</Text>
    </View>
  );
};

export default Finishing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
