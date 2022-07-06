// View
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getData, deleteDataRequest, remove} from './action';
import {getDataState, loadingData, deleteData, fetchData} from './selector';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ManageScreen = props => {
  const {
    getDataState,
    onGetApi,
    onDeleteApi,
    onRemove,
    loadingData,
    deleteData,
  } = props;
  const navigation = useNavigation();
  useEffect(() => {
    onGetApi();
  }, [deleteData]);

  // console.log('deleteData', deleteData);
  const alertDelete = item => {
    Alert.alert('Delete?', 'Do you want to delete?', [
      {
        text: 'OK',
        onPress: () => {
          onDeleteApi(item.id);
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const renderItem = ({item}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View key={item.id} style={{justifyContent: 'center'}}>
          <View key={item.id} style={[styles.viewRender]}>
            <View style={{width: '15%'}}>
              <Image
                source={{uri: item.avatar}}
                style={{width: 50, height: 50, borderRadius: 100}}
              />
            </View>
            <View
              style={{
                width: '60%',
                flexDirection: 'column',
              }}>
              <Text style={styles.textRender}>
                Name: <Text style={styles.textItem}>{item.name}</Text>
              </Text>
              <Text style={styles.textRender}>
                Gender: <Text style={styles.textItem}>{item.gender}</Text>
              </Text>
              <Text style={styles.textRender}>
                Birthday:{' '}
                <Text style={styles.textItem}>
                  {moment(item.birthday).format('DD-MM-YYYY')}
                </Text>
              </Text>
            </View>
            <View
              style={{
                width: '25%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ManageComponent', {
                    title: 'Update',
                    id: item.id,
                    avatar: item.avatar,
                    name: item.name,
                    birthday: item.birthday,
                    email: item.email,
                    age: item.age,
                    phone: item.phone,
                    position: item.position,
                  });
                  onRemove();
                }}
                style={styles.btnStyle}>
                <AntDesign name="edit" style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => {
                  alertDelete(item);
                }}>
                <AntDesign name="delete" style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* {loadingData ? (
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#1E90FF" />
        </SafeAreaView>
      ) : (
        <FlatList
          data={getDataState}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )} */}
      <FlatList
        data={getDataState}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = createStructuredSelector({
  getDataState: getDataState(),
  loadingData: loadingData(),
  deleteData: deleteData(),
  fetchData: fetchData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetApi: () => {
      dispatch(getData());
    },
    onDeleteApi: id => {
      dispatch(deleteDataRequest(id));
    },
    onRemove: () => {
      dispatch(remove());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ManageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewRender: {
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRender: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  textItem: {color: '#1E90FF', fontWeight: 'normal'},
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  iconStyle: {
    color: '#000',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
