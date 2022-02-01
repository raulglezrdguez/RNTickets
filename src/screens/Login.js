/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Caption,
  HelperText,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import AppContext from '../context/AppContext';

import TicketsLogo from '../components/TicketsLogo';

const Login = ({navigation}) => {
  const theme = useTheme();
  const {login} = useContext(AppContext);

  const [variables, setVariables] = useState({
    username: 'raul',
    password: '123456',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const onDismissSnackBar = () => setSnackVisible(false);

  const loginUser = async () => {
    try {
      if (variables.username === 'raul' && variables.password === '123456') {
        login('raul');
      } else {
        setSnackMessage('Incorrect credentials.');
        setSnackVisible(true);
      }
    } catch (error) {
      setSnackMessage('Internal error.');
      setSnackVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.title}>
          <Text
            style={{
              marginBottom: -7,
              fontSize: 32,
              color: theme.colors.text300,
            }}>
            ACME
          </Text>
          <TicketsLogo height={60} width={60} strokeWidth="2%" />
        </View>
        <ScrollView style={styles.scroll}>
          <TextInput
            label="User name"
            value={variables.username}
            onChangeText={username => setVariables({...variables, username})}
            mode="outlined"
            placeholder="username"
            error={variables.username !== '' && variables.username.length < 4}
            keyboardType="default"
            left={<TextInput.Icon name={'account-outline'} />}
          />
          <HelperText
            type="error"
            visible={
              variables.username !== '' && variables.username.length < 4
            }>
            {variables.username !== '' &&
              variables.username.length < 4 &&
              'Incorrect username'}
          </HelperText>
          <TextInput
            label="Password"
            value={variables.password}
            onChangeText={password => setVariables({...variables, password})}
            mode="outlined"
            placeholder="password"
            error={variables.password !== '' && variables.password.length < 6}
            left={<TextInput.Icon name={'lock-outline'} />}
            right={
              <TextInput.Icon
                name={showPassword ? 'eye-off' : 'eye'}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                forceTextInputFocus={false}
              />
            }
            secureTextEntry={!showPassword}
          />
          <HelperText
            type="error"
            visible={
              variables.password !== '' && variables.password.length < 6
            }>
            {variables.password !== '' &&
              variables.password.length < 6 &&
              'Incorrect password'}
          </HelperText>

          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <View style={[styles.column, {width: '60%'}]}>
              <Button
                mode="contained"
                onPress={loginUser}
                style={{width: '100%'}}
                uppercase={false}
                disabled={
                  variables.username.length < 4 || variables.password.length < 6
                }>
                Login
              </Button>
              <Caption>Forgot?</Caption>
            </View>
          </View>

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

export default Login;

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
    marginTop: 40,
    marginBottom: 10,
    alignContent: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottom: {
    marginTop: 40,
  },
});
