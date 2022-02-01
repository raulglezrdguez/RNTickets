/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './screens/Login';

import DashboardScreen from './screens/Dashboard';
import WorkTicketScreen from './screens/WorkTicket';
import NewTicketScreen from './screens/NewTicket';
import GetDirectionsScreen from './screens/GetDirections';
import InterCalendarScreen from './screens/InterCalendar';

import HeaderBar from './components/HeaderBar';

import AppContext from './context/AppContext';

const Stack = createStackNavigator();

const Main = () => {
  const {user, logout} = useContext(AppContext);

  /** to test logout */
  useEffect(() => {
    logout();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <HeaderBar {...props} />,
      }}>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="WorkTicket" component={WorkTicketScreen} />
          <Stack.Screen name="NewTicket" component={NewTicketScreen} />
          <Stack.Screen name="InterCalendar" component={InterCalendarScreen} />
          <Stack.Screen name="GetDirections" component={GetDirectionsScreen} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Main;
