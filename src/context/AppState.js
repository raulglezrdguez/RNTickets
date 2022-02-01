/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useReducer} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchTickets, insertTicket, deleteTicket} from '../util/db';

import AppContext from './AppContext';
import AppReducer from './AppReducer';

import {
  CombinedDarkTheme as darkTheme,
  CombinedDefaultTheme as lightTheme,
} from './theme';

import {
  SET_DARKMODE,
  SWITCH_DARKMODE,
  LOGIN,
  LOGOUT,
  SET_TICKETS,
  NEW_TICKET,
  DELETE_TICKET,
} from './types';

const initialState = {
  darkMode: false,
  user: null,
  tickets: [],
};

const AppState = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // load app theme
  const loadTheme = useCallback(async () => {
    let darkMode = await AsyncStorage.getItem('darkMode');
    darkMode = darkMode === 'true';
    dispatch({type: SET_DARKMODE, payload: darkMode});
  }, [dispatch]);

  // load user logged if any
  const loadUser = useCallback(async () => {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      dispatch({type: LOGIN, payload: user});
    } else {
      console.log('No user found');
    }
  }, [dispatch]);

  // load theme and user
  useEffect(() => {
    loadTheme();
    loadUser();
  }, []);

  // app mode handlers
  const switchDarkMode = async () => {
    await AsyncStorage.setItem('darkMode', state.darkMode ? 'false' : 'true');
    dispatch({type: SWITCH_DARKMODE, payload: ''});
  };

  // user login
  const login = async payload => {
    if (payload) {
      await AsyncStorage.setItem('user', payload);
    }
    dispatch({type: LOGIN, payload});
  };
  // user logout
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch({type: LOGOUT, payload: ''});
  };

  // tickets handlers
  const newTicket = async payload => {
    const {name, phone, dday, address, dnotes, dclass, stype, reason, tnumber} =
      payload;
    try {
      const dbResult = await insertTicket(
        name,
        phone,
        dday,
        address,
        dnotes,
        dclass,
        stype,
        reason,
        tnumber,
      );
      dispatch({
        type: NEW_TICKET,
        payload: {
          id: dbResult.insertId,
          name,
          phone,
          dday,
          address,
          dnotes,
          dclass,
          stype,
          reason,
          tnumber,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const removeTicket = async id => {
    try {
      await deleteTicket(id);
      dispatch({
        type: DELETE_TICKET,
        payload: id,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const loadTickets = async payload => {
    try {
      const dbResult = await fetchTickets();
      dispatch({type: SET_TICKETS, payload: dbResult});
      return true;
    } catch (err) {
      console.log('tickets error:', err);
    }
  };

  const theme = state?.darkMode ? darkTheme : lightTheme;

  return (
    <AppContext.Provider
      value={{
        darkMode: state.darkMode,
        switchDarkMode,
        user: state.user,
        tickets: state.tickets,
        login,
        logout,
        newTicket,
        loadTickets,
        removeTicket,
      }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            {props.children}
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

export default AppState;
