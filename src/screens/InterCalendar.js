/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {getDateYMD} from '../util/utils';
import {Button, Subheading, useTheme} from 'react-native-paper';

import AppContext from '../context/AppContext';

const DeleteTicketView = ({ticket, deleteTicket}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.row_around,
        {
          marginBottom: 10,
          borderRadius: 3,
          backgroundColor: theme.colors.gray200,
          padding: 10,
        },
      ]}>
      <View style={styles.column}>
        <Text>{ticket.stype}</Text>
        <Text>{ticket.address}</Text>
        <Text style={{color: theme.colors.text200}}>
          {getDateYMD(new Date(ticket.dday))}
        </Text>
      </View>
      <Button
        icon="delete"
        compact={true}
        color={theme.colors.error}
        onPress={() => deleteTicket(ticket.id)}>
        DELETE
      </Button>
    </View>
  );
};

const InterCalendar = () => {
  const {tickets, removeTicket} = useContext(AppContext);

  const [fromDate, setFromDate] = useState(new Date()); // getDateYMD(new Date()));
  const [toDate, setToDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);

  const onChangeFromDate = (event, selectedDate) => {
    const day = selectedDate || fromDate;
    setShowFromDate(Platform.OS === 'ios');
    setFromDate(day);
  };

  const onChangeToDate = (event, selectedDate) => {
    const day = selectedDate || toDate;
    setShowToDate(Platform.OS === 'ios');
    setToDate(day);
  };

  const deleteTicket = id => {
    removeTicket(id);
  };

  console.log(tickets);
  const ticketsView = [];
  tickets.forEach(t => {
    const tDate = new Date(t.dday);
    if (tDate >= fromDate && tDate <= toDate) {
      ticketsView.push(
        <DeleteTicketView key={t.id} ticket={t} deleteTicket={deleteTicket} />,
      );
    }
  });

  return (
    <View style={[styles.container, {backgroundColor: '#fff'}]}>
      <View style={styles.row}>
        <Subheading>From date:</Subheading>
        <Button onPress={() => setShowFromDate(true)}>
          {fromDate.toLocaleString().split(' ')[0]}
        </Button>
      </View>
      {showFromDate && (
        <DateTimePicker
          testID="fromDate"
          value={fromDate}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeFromDate}
        />
      )}
      <View style={styles.row}>
        <Subheading>To date:</Subheading>
        <Button onPress={() => setShowToDate(true)}>
          {toDate.toLocaleString().split(' ')[0]}
        </Button>
      </View>
      {showToDate && (
        <DateTimePicker
          testID="toDate"
          value={toDate}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeToDate}
        />
      )}
      <ScrollView>{ticketsView}</ScrollView>
    </View>
  );
};

export default InterCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row_around: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});
