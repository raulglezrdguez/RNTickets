/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  Appbar,
  Divider,
  IconButton,
  Menu,
  Text,
  useTheme,
} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

import TicketsLogo from './TicketsLogo';
import {StyleSheet, View} from 'react-native';

const HeaderBar = ({navigation, back}) => {
  const theme = useTheme();
  const route = useRoute();
  const dimensions = useWindowDimensions();

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const menuItemWorkTicket = (
    <Menu.Item
      onPress={() => {
        closeMenu();
        navigation.navigate('WorkTicket', {
          ticket: null,
          back: 'Dashboard',
        });
      }}
      title="Work Ticket"
    />
  );
  const menuItemDashboard = (
    <Menu.Item
      onPress={() => {
        closeMenu();
        navigation.navigate('Dashboard', {
          ticket: null,
          back: null,
        });
      }}
      title="Dashboard"
    />
  );
  const menuItemGetDirections = (
    <Menu.Item
      onPress={() => {
        closeMenu();
        navigation.navigate('GetDirections', {back: 'Dashboard'});
      }}
      title="Get Directions"
    />
  );

  return (
    <Appbar.Header
      style={{backgroundColor: theme.colors.gray200, elevation: 0}}>
      {route.name === 'Dashboard' ? (
        <View
          style={[
            styles.row_between,
            {backgroundColor: theme.colors.gray200, width: '100%'},
          ]}>
          <View style={styles.row_center}>
            <View style={styles.column_center}>
              <IconButton
                icon="calendar-blank"
                color={theme.colors.primary}
                size={25}
                onPress={() => {
                  navigation.navigate('InterCalendar', {back: 'Dashboard'});
                }}
              />
              <Text
                style={{
                  fontSize: 8,
                  color: theme.colors.primary,
                  marginTop: -18,
                }}>
                Calendar
              </Text>
            </View>
            <View style={styles.column_center}>
              <IconButton
                icon="sync"
                color={theme.colors.primary}
                size={25}
                onPress={() => {}}
              />
              <Text
                style={{
                  fontSize: 8,
                  color: theme.colors.primary,
                  marginTop: -18,
                }}>
                Sync
              </Text>
            </View>
          </View>
          <View style={styles.row_end}>
            <View style={styles.title}>
              <Text
                style={{
                  marginBottom: -4,
                  fontSize: 14,
                  color: theme.colors.text300,
                }}>
                ACME
              </Text>
              {dimensions.width > 500 && (
                <TicketsLogo height={25} width={25} strokeWidth="2%" />
              )}
            </View>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text100,
              }}>
              |
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: theme.colors.text100,
                marginLeft: 5,
              }}>
              DASHBOARD
            </Text>
          </View>
          <View style={styles.row_center}>
            <View style={styles.column_center}>
              <IconButton
                icon="plus"
                color={theme.colors.primary}
                size={25}
                onPress={() =>
                  navigation.navigate('NewTicket', {back: 'Dashboard'})
                }
              />
              <Text
                style={{
                  fontSize: 8,
                  color: theme.colors.primary,
                  marginTop: -18,
                }}>
                New Ticket
              </Text>
            </View>
            <View style={styles.column_center}>
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <IconButton
                    icon="menu"
                    color={theme.colors.primary}
                    size={25}
                    onPress={openMenu}
                  />
                }>
                {menuItemWorkTicket}
                <Divider />
                {menuItemGetDirections}
              </Menu>
              <Text
                style={{
                  fontSize: 8,
                  color: theme.colors.primary,
                  marginTop: -18,
                }}>
                Menu
              </Text>
            </View>
          </View>
        </View>
      ) : route.name === 'WorkTicket' ? (
        <View
          style={[
            styles.row_between,
            {backgroundColor: theme.colors.gray200, width: '100%'},
          ]}>
          <View style={styles.column_center}>
            <IconButton
              icon="less-than"
              color={theme.colors.primary}
              size={25}
              onPress={() => {
                navigation.navigate('Dashboard');
              }}
            />
            <Text
              style={{
                fontSize: 8,
                color: theme.colors.primary,
                marginTop: -18,
              }}>
              Dashboard
            </Text>
          </View>
          <View style={styles.column_center}>
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="menu"
                  color={theme.colors.primary}
                  size={25}
                  onPress={openMenu}
                />
              }>
              {menuItemDashboard}
              <Divider />
              {menuItemGetDirections}
            </Menu>
            <Text
              style={{
                fontSize: 8,
                color: theme.colors.primary,
                marginTop: -18,
              }}>
              Menu
            </Text>
          </View>
        </View>
      ) : route.params?.back ? (
        <View style={styles.column_center}>
          <IconButton
            icon="less-than"
            color={theme.colors.primary}
            size={25}
            onPress={() => {
              navigation.navigate(route.params.back);
            }}
          />
          <Text
            style={{
              fontSize: 8,
              color: theme.colors.primary,
              marginTop: -18,
            }}>
            {route?.params?.back}
          </Text>
        </View>
      ) : (
        <IconButton
          icon="less-than"
          color={theme.colors.primary}
          size={25}
          onPress={() => navigation.goBack()}
        />
      )}
    </Appbar.Header>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  scroll: {
    width: '100%',
    padding: 2,
    marginBottom: 10,
    alignContent: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginTop: -10,
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 0,
  },
  column_center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row_start: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row_end: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  row_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
