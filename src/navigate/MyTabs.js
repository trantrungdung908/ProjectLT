import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageScreen from '../screens/Manage';
import ProfileScreen from '../screens/Profile';
import DashBoard from '../screens/DashBoard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {remove} from '../screens/Manage/action';
import {loadingData} from '../screens/Manage/selector';

const Tab = createBottomTabNavigator();

const MyTabs = props => {
  const navigation = useNavigation();
  const {onRemove} = props;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginTop: 10}}>
              <AntDesign
                name="linechart"
                style={[
                  styles.tabIconStyle,
                  // [focused ? {color: '#1E90FF'} : {color: '#000'}],
                ]}
              />
              <Text
                style={[
                  styles.textStyle,
                  // [focused ? {color: '#1E90FF'} : {color: '#000'}],
                ]}>
                DashBoard
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Mange"
        component={ManageScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginTop: 10}}>
              <AntDesign
                name="database"
                style={[
                  styles.tabIconStyle,
                  [focused ? {color: '#1E90FF'} : {color: '#000'}],
                ]}
              />
              <Text
                style={[
                  styles.textStyle,

                  [focused ? {color: '#1E90FF'} : {color: '#000'}],
                ]}>
                Manage
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate('ManageComponent', {
                  title: 'Add',
                });
                onRemove();
              }}>
              <AntDesign name="adduser" style={[styles.iconStyle]} />
            </TouchableOpacity>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{marginTop: 10}}>
              <AntDesign
                name="user"
                style={[
                  styles.tabIconStyle,
                  // [focused ? {color: '#1E90FF'} : {color: '#000'}],
                ]}
              />
              <Text
                style={[
                  styles.textStyle,
                  // [focused ? {color: '#1E90FF'} : {color: '#000'}],
                ]}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = createStructuredSelector({
  loadingData: loadingData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onRemove: () => {
      dispatch(remove());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyTabs);

const styles = StyleSheet.create({
  iconStyle: {
    color: '#000',
    marginLeft: 14,
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    alignSelf: 'center',
  },
  tabIconStyle: {
    alignSelf: 'center',
    marginLeft: 14,
    color: '#000',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textStyle: {
    // marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});
