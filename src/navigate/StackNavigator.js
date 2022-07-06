import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/Profile/components/index';
import MyTabs from './MyTabs';
import LoginScreen from '../screens/Login';
import ManageComponent from '../screens/Manage/components';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyTabs">
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
        {/* <Stack.Screen
          name="ManageComponent"
          component={ManageComponent}
          options={({route}) => ({title: route.params.title})}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
