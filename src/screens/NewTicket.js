/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View, Platform} from 'react-native';
import {
  Button,
  HelperText,
  Snackbar,
  Subheading,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputMask from 'react-native-text-input-mask';

import AppContext from '../context/AppContext';

const NewTicket = ({navigation}) => {
  const theme = useTheme();
  const {newTicket} = useContext(AppContext);

  const [variables, setVariables] = useState({
    name: '',
    phone: '',
    dday: new Date(),
    address: '',
    dnotes: '',
    dclass: '',
    stype: '',
    reason: '',
    tnumber: '',
  });

  const [loading, setLoading] = useState(false);

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const [dateMode, setDateMode] = useState('date');
  const [showDate, setShowDate] = useState(false);

  const onDismissSnackBar = () => setSnackVisible(false);

  const showDateMode = currentMode => {
    setShowDate(true);
    setDateMode(currentMode);
  };

  const onChangeDate = (event, selectedDate) => {
    const dday = selectedDate || variables.dday;
    setShowDate(Platform.OS === 'ios');
    setVariables({...variables, dday});
  };

  const validateData = () => {
    return (
      variables.name.trim().length > 3 && variables.address.trim().length > 8
      // variables.phone.trim().length === 12 &&
      // variables.dnotes.trim().length > 4 &&
      // variables.dclass.trim().length > 4 &&
      // variables.stype.trim().length > 4 &&
      // variables.reason.trim().length > 4 &&
      // variables.tnumber.trim() !== '0'
    );
  };

  const createTicket = async () => {
    try {
      const {
        name,
        phone,
        address,
        dnotes,
        dclass,
        stype,
        reason,
        tnumber,
        dday,
      } = variables;
      setLoading(true);
      const dbResult = await newTicket({
        name: name.trim(),
        phone,
        dday: dday.toString(),
        address: address.trim(),
        dnotes: dnotes.trim(),
        dclass: dclass.trim(),
        stype: stype.trim(),
        reason: reason.trim(),
        tnumber: tnumber.trim(),
      });
      if (dbResult) {
        navigation.navigate('WorkTicket', {back: 'Dashboard'});
      } else {
        setSnackMessage('Internal database error.');
        setSnackVisible(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSnackMessage('Internal error.');
      setSnackVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ScrollView style={styles.scroll}>
          <Title style={{color: theme.colors.text300, alignSelf: 'center'}}>
            New Ticket
          </Title>
          <Subheading>Client data</Subheading>
          <TextInput
            label="Client name"
            value={variables.name}
            onChangeText={name => setVariables({...variables, name})}
            mode="outlined"
            error={variables.name !== '' && variables.name.trim().length < 4}
            keyboardType="default"
          />
          <HelperText
            type="error"
            visible={variables.name !== '' && variables.name.trim().length < 4}>
            {variables.name !== '' &&
              variables.name.trim().length < 4 &&
              'Incorrect name'}
          </HelperText>

          <Subheading>Job site address</Subheading>
          <TextInput
            label="Address"
            value={variables.address}
            onChangeText={address => setVariables({...variables, address})}
            mode="outlined"
            error={
              variables.address !== '' && variables.address.trim().length < 5
            }
            keyboardType="default"
          />
          <HelperText
            type="error"
            visible={
              variables.address !== '' && variables.address.trim().length < 5
            }>
            {variables.address !== '' &&
              variables.address.trim().length < 5 &&
              'Incorrect address'}
          </HelperText>

          <Subheading>Schedule for</Subheading>
          <View style={styles.row}>
            <Button onPress={() => showDateMode('date')}>
              {variables.dday.toLocaleString().split(' ')[0]}
            </Button>
            <Button onPress={() => showDateMode('time')}>
              {variables.dday.toLocaleString().split(' ')[1]}
            </Button>
          </View>
          {showDate && (
            <DateTimePicker
              testID="dday"
              value={variables.dday}
              mode={dateMode}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}

          <TextInput
            label="Client phone"
            mode="outlined"
            error={
              variables.phone !== '' && variables.phone.trim().length !== 12
            }
            keyboardType="number-pad"
            style={{marginTop: 20}}
            render={props => (
              <TextInputMask
                {...props}
                mask="[000] [000] [0000]"
                value={variables.phone}
                onChangeText={phone => {
                  props.onChangeText(phone);
                  setVariables({...variables, phone});
                }}
              />
            )}
          />
          <HelperText
            type="error"
            visible={
              variables.phone !== '' && variables.phone.trim().length !== 12
            }>
            {variables.phone !== '' &&
              variables.phone.trim().length !== 12 &&
              'Incorrect phone'}
          </HelperText>

          <TextInput
            label="Dispatch notes"
            value={variables.dnotes}
            onChangeText={dnotes => setVariables({...variables, dnotes})}
            mode="outlined"
            error={
              variables.dnotes !== '' && variables.dnotes.trim().length < 5
            }
            keyboardType="default"
            multiline={true}
            numberOfLines={5}
          />
          <HelperText
            type="error"
            visible={
              variables.dnotes !== '' && variables.dnotes.trim().length < 5
            }>
            {variables.dnotes !== '' &&
              variables.dnotes.trim().length < 5 &&
              'Incorrect dispatch notes'}
          </HelperText>

          <TextInput
            label="Department class"
            value={variables.dclass}
            onChangeText={dclass => setVariables({...variables, dclass})}
            mode="outlined"
            error={
              variables.dclass !== '' && variables.dclass.trim().length < 5
            }
            keyboardType="default"
          />
          <HelperText
            type="error"
            visible={
              variables.dclass !== '' && variables.dclass.trim().length < 5
            }>
            {variables.dclass !== '' &&
              variables.dclass.trim().length < 5 &&
              'Incorrect departament class'}
          </HelperText>

          <TextInput
            label="Service type"
            value={variables.stype}
            onChangeText={stype => setVariables({...variables, stype})}
            mode="outlined"
            error={variables.stype !== '' && variables.stype.trim().length < 5}
            keyboardType="default"
          />
          <HelperText
            type="error"
            visible={
              variables.stype !== '' && variables.stype.trim().length < 5
            }>
            {variables.stype !== '' &&
              variables.stype.trim().length < 5 &&
              'Incorrect service type'}
          </HelperText>

          <TextInput
            label="Reason for call"
            value={variables.reason}
            onChangeText={reason => setVariables({...variables, reason})}
            mode="outlined"
            error={
              variables.reason !== '' && variables.reason.trim().length < 5
            }
            keyboardType="default"
            multiline={true}
            numberOfLines={5}
          />
          <HelperText
            type="error"
            visible={
              variables.reason !== '' && variables.reason.trim().length < 5
            }>
            {variables.reason !== '' &&
              variables.reason.trim().length < 5 &&
              'Incorrect reason for call'}
          </HelperText>

          <TextInput
            label="Ticket number"
            value={variables.tnumber}
            onChangeText={tnumber => setVariables({...variables, tnumber})}
            mode="outlined"
            error={variables.tnumber !== '' && variables.tnumber === '0'}
            keyboardType="number-pad"
          />
          <HelperText
            type="error"
            visible={variables.tnumber !== '' && variables.tnumber === '0'}>
            {variables.tnumber !== '' &&
              variables.tnumber === '0' &&
              'Incorrect ticket number'}
          </HelperText>

          <Button
            mode="contained"
            uppercase={false}
            onPress={createTicket}
            style={{width: '60%', alignSelf: 'center'}}
            disabled={!validateData() || loading}>
            Add Ticket
          </Button>

          <View style={styles.bottom}></View>
        </ScrollView>
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.accent,
        }}
        action={{
          label: 'Ok',
          onPress: () => {
            // Do something
          },
        }}>
        {snackMessage}
      </Snackbar>
    </View>
  );
};

export default NewTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  scroll: {
    width: '100%',
    padding: 2,
    marginBottom: 10,
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  bottom: {
    marginTop: 40,
  },
});
