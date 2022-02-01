import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

const WorkDetails = () => {
  return (
    <View style={styles.container}>
      <Text>WorkDetails works</Text>
    </View>
  );
};

export default WorkDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
