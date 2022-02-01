/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Caption,
  IconButton,
  Subheading,
  Text,
  useTheme,
} from 'react-native-paper';
import * as permissions from 'react-native-permissions';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import AppContext from '../../../context/AppContext';

import {getLongDate} from '../../../util/utils';

import env from '../../../../env';
import axios from 'axios';

const Overview = props => {
  const theme = useTheme();
  const {tickets} = useContext(AppContext);

  const [ticket, setTicket] = useState(props.route?.ticket);
  const [permissionResult, setPermissionResult] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    if (!ticket && tickets.length > 0) {
      setTicket(tickets.sort((a, b) => b.id - a.id)[0]);
    }
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.ACCESS_COARSE_LOCATION
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ).then(result => {
      setPermissionResult(result);
    });
  }, []);

  useEffect(() => {
    if (permissionResult === permissions.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          if (position.coords.latitude && position.coords.longitude) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log(position.coords);
          }
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [permissionResult]);

  const calculateDistance = async address => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${address}&origins=${longitude}%2C${latitude}&key=${env.googleApiKey}`;
    var config = {
      method: 'get',
      url,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log('++++++++++++++++', JSON.stringify(response.data));
        /**
         *
         * {
         * "destination_addresses":[],
         * "error_message":"This API project is not authorized to use this API.",
         * "origin_addresses":[],
         * "rows":[],
         * "status":"REQUEST_DENIED"
         * }
         */
      })
      .catch(function (error) {
        console.log('++++++++++++++++++', error);
      });
  };

  useEffect(() => {
    if (ticket && latitude && longitude) {
      if (ticket.address.trim() !== '') {
        const address = ticket.address.replace(/ /g, '%20');
        calculateDistance(address);
      }
    }
  }, [ticket, latitude, longitude]);

  console.log(ticket);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
          <View style={[styles.row_between, {minHeight: 80}]}>
            <View style={[styles.column, {paddingLeft: 20, width: '50%'}]}>
              <Caption style={{color: theme.colors.text200}}>
                Customer Info:
              </Caption>
              <View style={styles.row}>
                <Subheading>{ticket?.name}</Subheading>
                <IconButton
                  icon="phone"
                  color={theme.colors.primary}
                  size={20}
                />
                <Text>{ticket?.phone}</Text>
              </View>
            </View>
            <View style={[styles.column, {paddingLeft: 20}]}>
              <Caption style={{color: theme.colors.text200}}>
                Scheduled For:
              </Caption>
              {ticket?.dday && (
                <Subheading>{getLongDate(new Date(ticket?.dday))}</Subheading>
              )}
            </View>
          </View>
          <View
            style={{
              borderColor: theme.colors.gray200,
              borderWidth: 1,
              alignSelf: 'stretch',
            }}
          />
          <View style={styles.row_between}>
            <View style={[styles.column, {paddingLeft: 20, width: '50%'}]}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <View style={styles.row}>
                    <IconButton
                      icon="map-marker"
                      color={theme.colors.text200}
                      size={20}
                    />
                    <Caption style={{color: theme.colors.text200}}>
                      Job Site Address:
                    </Caption>
                  </View>
                  <Subheading>{ticket?.address.split(',')[0]}</Subheading>
                  <Subheading>{ticket?.address.split(',')[1]}</Subheading>
                  <Subheading>{ticket?.address.split(',')[2]}</Subheading>
                  <View style={styles.row}>
                    <IconButton
                      icon="map-marker-distance"
                      color={theme.colors.text200}
                      size={20}
                    />
                    <Caption style={{color: theme.colors.text200}}>
                      Distance:
                    </Caption>
                  </View>
                  <Subheading>Not implemented</Subheading>
                </View>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={() => {
                    props.navigation.navigate('GetDirections', {
                      back: 'WorkTicket',
                      ticket: props.route.ticket,
                    });
                  }}
                  style={{alignSelf: 'flex-start'}}>
                  Get Directions
                </Button>
              </View>
            </View>
            <View
              style={{
                borderColor: theme.colors.gray200,
                borderWidth: 1,
                alignSelf: 'stretch',
              }}
            />
            <View style={[styles.column, {width: '49%'}]}>
              <View style={[styles.column, {paddingLeft: 10}]}>
                <View style={styles.row}>
                  <IconButton
                    icon="file-document"
                    color={theme.colors.text200}
                    size={20}
                  />
                  <Caption style={{color: theme.colors.text200}}>
                    Dispatch Note:
                  </Caption>
                </View>
                <ScrollView
                  style={{minHeight: 150, maxWidth: '70%'}}
                  nestedScrollEnabled={true}>
                  <Caption style={{color: theme.colors.text300}}>
                    {ticket?.dnotes}
                  </Caption>
                </ScrollView>
              </View>
              <View
                style={{
                  borderColor: theme.colors.gray200,
                  borderWidth: 1,
                  alignSelf: 'stretch',
                  width: '100%',
                }}
              />
              <View style={[styles.row_between]}>
                <View style={[styles.row]}>
                  <Caption>Dept. Class:</Caption>
                  <Subheading>{ticket?.dclass}</Subheading>
                </View>
                <View style={[styles.row]}>
                  <Caption>Service Type:</Caption>
                  <Subheading>{ticket?.stype}</Subheading>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderColor: theme.colors.gray200,
              borderWidth: 3,
              alignSelf: 'stretch',
            }}
          />
          <View style={styles.row_between}>
            <View style={[styles.row, {paddingLeft: 20}]}>
              <Caption>Reason for Call:</Caption>
              <ScrollView
                style={{
                  maxWidth: '75%',
                  maxHeight: 80,
                  paddingLeft: 10,
                }}
                nestedScrollEnabled={true}>
                <Caption
                  style={{
                    color: theme.colors.text300,
                  }}>
                  {ticket?.reason}
                </Caption>
              </ScrollView>
            </View>
            <Caption
              style={{
                paddingRight: 10,
                alignSelf: 'flex-end',
              }}>
              Ticket #{ticket?.tnumber}
            </Caption>
          </View>

          <View style={styles.bottom}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scroll: {
    padding: 2,
    marginBottom: 10,
    alignContent: 'center',
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  bottom: {
    marginTop: 40,
  },
});
