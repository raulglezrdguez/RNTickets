/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import ShowTicket from '../components/ShowTicket';

import AppContext from '../context/AppContext';

const Dashboard = ({navigation}) => {
  const theme = useTheme();
  const {loadTickets, tickets} = useContext(AppContext);

  const [currentDate, _] = useState(new Date());

  useEffect(() => {
    loadTickets();
  }, []);

  const getCurrentDataStr = date => {
    const tdate = new Date(date);
    const month = tdate.toLocaleString('default', {month: 'short'});
    const monthStr = month.charAt(0).toUpperCase() + month.slice(1);

    return monthStr + ' ' + tdate.getDate() + ', ' + tdate.getFullYear();
  };

  const ticketsSorted = tickets.sort(
    (a, b) => new Date(a.dday) - new Date(b.dday),
  );
  let currentDay = new Date().getDate();
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let ticketsView = [];
  ticketsSorted.forEach(tk => {
    const ddata = new Date(tk.dday);
    if (
      currentDay !== ddata.getDate() ||
      currentMonth !== ddata.getMonth() ||
      currentYear !== ddata.getFullYear()
    ) {
      currentDay = ddata.getDate();
      currentMonth = ddata.getMonth();
      currentYear = ddata.getFullYear();
      ticketsView.push(
        <View
          style={{
            width: '100%',
            backgroundColor: theme.colors.gray200,
            alignItems: 'center',
          }}
          key={ddata.getTime()}>
          <Text style={{width: '80%'}} key={ddata.getTime()}>
            {getCurrentDataStr(tk.dday)}
          </Text>
        </View>,
      );
    }
    ticketsView.push(
      <ShowTicket navigation={navigation} key={tk.id} ticket={tk} />,
    );
  });

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.gray100}]}>
      <View style={styles.form}>
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          style={styles.scroll}>
          {ticketsView}
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scroll: {
    width: '100%',
    padding: 2,
    marginBottom: 10,
    alignContent: 'center',
  },
  currentDate: {
    width: '80%',
    paddingLeft: 20,
  },
});
