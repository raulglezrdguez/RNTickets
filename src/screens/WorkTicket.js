import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MenuTabBar from '../components/MenuTabBar';

import Overview from './details/workticket/Overview';
import WorkDetails from './details/WorkDetails';
import Purchasing from './details/Purchasing';
import Finishing from './details/Finishing';
import Pictures from './details/Pictures';

const Tab = createBottomTabNavigator();

const WorkTicket = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MenuTabBar {...props} />}>
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          tabBarLabel: 'Overview',
        }}
      />
      <Tab.Screen
        name="WorkDetails"
        component={WorkDetails}
        options={{
          tabBarLabel: 'WorkDetails',
        }}
      />
      <Tab.Screen
        name="Purchasing"
        component={Purchasing}
        options={{
          tabBarLabel: 'Purchasing',
        }}
      />
      <Tab.Screen
        name="Finishing"
        component={Finishing}
        options={{
          tabBarLabel: 'Finishing',
        }}
      />
      <Tab.Screen name="Pictures" component={Pictures} />
    </Tab.Navigator>
  );
};

export default WorkTicket;
