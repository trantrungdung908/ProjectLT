import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getInfoRequest} from './action';
import {getInfoData} from './selector';

const LoginScreen = props => {
  const {onGet, getInfoData} = props;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    onGet();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textLogin}>Login</Text>
      <View style={styles.container}>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.textStlye}>Username:</Text>
          <TextInput
            autoCapitalize="none"
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            placeholder="Enter your username: "
            style={styles.textInputStyle}
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.textStlye}>Password:</Text>
          <TextInput
            autoCapitalize="none"
            value={password}
            onChangeText={pass => {
              setPassword(pass.toString());
            }}
            secureTextEntry={true}
            placeholder="Enter your password:"
            style={styles.textInputStyle}
          />
        </View>
        <View style={styles.viewForgot}>
          <TouchableOpacity
            onPress={() => {
              alert('No');
            }}
            style={styles.btnForgot}>
            <Text style={styles.textForgotStyle}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewLogin}>
          <TouchableOpacity
            onPress={() => {
              {
                name === getInfoData[0].username &&
                password === getInfoData[0].password
                  ? navigation.navigate('MyTabs')
                  : alert('Error');
              }
              setName('');
              setPassword('');
            }}
            disabled={name != '' && password != '' ? false : true}
            style={[
              styles.buttonLogin,
              [
                name != '' && password != ''
                  ? {backgroundColor: '#000'}
                  : {backgroundColor: '#dddddd'},
              ],
            ]}>
            <Text
              style={[
                styles.textBtnLogin,
                [
                  name != '' && password != ''
                    ? {color: '#fff'}
                    : {color: '#000'},
                ],
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = createStructuredSelector({
  getInfoData: getInfoData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGet: () => {
      dispatch(getInfoRequest());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  viewInput: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  viewForgot: {marginTop: 20, justifyContent: 'center', alignSelf: 'flex-end'},
  textLogin: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    marginTop: 20,
    marginLeft: 20,
  },

  btnForgot: {
    borderRadius: 20,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    marginRight: 20,
  },
  textForgotStyle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  viewLogin: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogin: {
    width: '50%',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
  },

  textBtnLogin: {
    textAlign: 'center',
    fontSize: 16,
  },
  textStlye: {
    fontSize: 18,
    fontWeight: '500',
  },
  textInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
