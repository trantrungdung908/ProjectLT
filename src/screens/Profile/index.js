import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getData, removeData} from './action';
import {useNavigation} from '@react-navigation/native';
import {getProfileData, loadingData, errorData, fetchData} from './selector';

const ProfileScreen = props => {
  const navigation = useNavigation();
  const {
    getProfileData,
    onGetApi,
    loadingData,
    onRemoveData,
    errorData,
    fetchData,
  } = props;
  console.log('errorData', errorData);
  console.log('fetchData', fetchData);
  // console.log('loadingData', loadingData);
  const alertLogOut = () => {
    Alert.alert('Do you want to log out?', 'Confirm', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.popToTop();
        },
      },
    ]);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      onGetApi();
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View key={item.id} style={{flex: 1}}>
        <View key={item.id} style={styles.viewAvatar}>
          <Image style={styles.avaStyle} source={{uri: item.avatar}} />
          <Text style={styles.nameStyle}>{item.name}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <Text style={styles.textStyle}>
            Birthday: {moment(item.birthday).format('DD-MM-YYYY')}
          </Text>
          <Text style={styles.textStyle}>Age: {item.age}</Text>
          <Text style={styles.textStyle}>Sex: {item.sex}</Text>
          <Text style={styles.textStyle}>Phone: {item.phone}</Text>
          <Text style={styles.textStyle}>Email: {item.email}</Text>
        </View>
        <View style={styles.viewBtn}>
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() => {
              navigation.navigate('Settings', {
                name: item.name,
                avatar: item.avatar,
                birthday: item.birthday,
                age: item.age,
                sex: item.sex,
                phone: item.phone,
                email: item.email,
                id: item.id,
              });
              onRemoveData();
            }}>
            <Text style={styles.textSettingsStyle}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              alertLogOut();
            }}>
            <Text style={styles.textLogOutStyle}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {errorData ? (
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#1E90FF" />
        </SafeAreaView>
      ) : (
        <FlatList
          data={getProfileData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      {/* <FlatList
        data={getProfileData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
    </SafeAreaView>
  );
};

const mapStateToProps = createStructuredSelector({
  getProfileData: getProfileData(),
  loadingData: loadingData(),
  errorData: errorData(),
  fetchData: fetchData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetApi: () => {
      dispatch(getData());
    },
    onRemoveData: () => {
      dispatch(removeData());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfileScreen);

const styles = StyleSheet.create({
  viewAvatar: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A6C1FF',
  },
  avaStyle: {width: 150, height: 150, borderRadius: 100},
  nameStyle: {marginTop: 10, fontSize: 20, fontWeight: 'bold'},
  textStyle: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#fff',
    borderRadius: 4,
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    padding: 10,
  },
  viewBtn: {
    flex: 1,
    marginTop: 20,
    borderRadius: 4,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
  },
  textSettingsStyle: {
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    padding: 10,
    overflow: 'hidden',
    fontWeight: '500',
    backgroundColor: '#A6C1FF',
  },
  textLogOutStyle: {
    textAlign: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
    padding: 10,
    color: '#FA2A2A',
    fontWeight: '500',
    backgroundColor: '#FFF',
  },
});
