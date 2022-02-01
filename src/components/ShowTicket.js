/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {Button, Subheading, Text, useTheme} from 'react-native-paper';

const ShowTicket = ({navigation, ticket}) => {
  const theme = useTheme();
  const dimensions = useWindowDimensions();

  const tdate = new Date(ticket.dday);

  let hour = tdate.getHours();
  let ampm = 'AM';
  if (hour > 12) {
    hour -= 12;
    ampm = 'PM';
  }
  const min = tdate.getMinutes() === 0 ? '' : tdate.getMinutes().toString();
  const month = tdate.getMonth() + 1;
  const day = tdate.getDate();
  const year = tdate.getFullYear().toString().substring(2);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.column, {minWidth: dimensions.width / 6}]}>
          <Subheading>{`${hour}:${min} ${ampm}`}</Subheading>
          <Text
            style={[
              styles.caption,
              {color: theme.colors.text200},
            ]}>{`${month}/${day}/${year}`}</Text>
          <Text style={styles.caption} />
          <Text
            style={[
              styles.caption,
              {color: theme.colors.text200},
            ]}>{`Ticket #${ticket.tnumber}`}</Text>
        </View>
        <View
          style={{
            borderColor: theme.colors.gray200,
            borderWidth: 1,
            alignSelf: 'stretch',
          }}
        />
        <View style={[styles.column, {marginLeft: 20}]}>
          <Subheading>{ticket.stype}</Subheading>
          <Text style={[styles.caption, {color: theme.colors.text200}]}>
            {ticket.address}
          </Text>
        </View>
      </View>
      <Button
        mode="contained"
        uppercase={false}
        onPress={() =>
          navigation.navigate('WorkTicket', {ticket, back: 'Dashboard'})
        }>
        View Ticket
      </Button>
    </View>
  );
};

export default ShowTicket;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    margin: 10,
    padding: 10,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  caption: {
    fontSize: 12,
  },
});
