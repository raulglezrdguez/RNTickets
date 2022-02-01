import React from 'react';
import {StyleSheet} from 'react-native';

import WebView from 'react-native-webview';

const Overview = props => {
  let address = '';
  if (props.route?.ticket) {
    address = props.route.ticket.address.replace(/ /g, '+');
  }

  return (
    <WebView
      source={{
        uri: `https://www.google.com/maps/search/?api=1&query=${address}`,
      }}
    />
  );
};

export default Overview;

const styles = StyleSheet.create({});
