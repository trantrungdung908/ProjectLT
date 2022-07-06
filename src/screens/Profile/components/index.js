import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {putRequest} from '../action';
import {errorData, loadingData} from '../selector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SettingsScreen = props => {
  const {onPutApi, loadingData, errorData} = props;
  const route = useRoute();
  const {params} = route;
  const navigation = useNavigation();
  const [localState, setLocalState] = useState({
    name: params ? params.name : '',
    age: params ? params.age : '',
    phone: params ? params.phone : '',
    email: params ? params.email : '',
    id: params ? params.id : '',
    birthday: params ? params.birthday : '',
    sex: params ? params.sex : '',
  });
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date(localState.birthday),
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    setIsActive(true);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    if (errorData === false) {
      navigation.goBack();
    }
  }, [errorData]);
  // console.log('error', errorData);

  const handleChange = (key, value) => {
    let newData = {};
    newData[key] = value;
    setLocalState({
      ...localState,
      ...newData,
    });
  };
  const handlePut = () => {
    onPutApi(localState, selectedDate);
    setLocalState({
      ...localState,
    });
  };
  return (
    <SafeAreaView style={styles.viewContainer}>
      <ScrollView style={[styles.viewContainer, {marginHorizontal: 15}]}>
        <View>
          <Image style={styles.imgAvaStyle} source={{uri: params.avatar}} />
          <View style={styles.viewInput}>
            <Text style={styles.textStyle}>Username:</Text>
            <TextInput
              value={localState.name}
              onChangeText={e => {
                handleChange('name', e);
              }}
              autoFocus={true}
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.textStyle}>Age:</Text>
            <TextInput
              value={localState.age.toString()}
              onChangeText={e => {
                handleChange('age', e);
              }}
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.viewInput}>
            <TouchableOpacity
              style={styles.btnCalendarStyle}
              onPress={showDatePicker}>
              <Icon name="calendar" size={25} />
            </TouchableOpacity>

            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={styles.textStyle}>Date of birth:</Text>
            <TextInput
              editable={false}
              value={
                isActive === false
                  ? moment(localState.birthday).format('DD-MM-YYYY')
                  : moment(selectedDate).format('DD-MM-YYYY')
              }
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.textStyle}>Sex:</Text>
            <TextInput
              value={localState.sex}
              onChangeText={e => {
                handleChange('sex', e);
              }}
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.textStyle}>Phone:</Text>
            <TextInput
              value={localState.phone.toString()}
              onChangeText={e => {
                handleChange('phone', e);
              }}
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.textStyle}>Email:</Text>
            <TextInput
              value={localState.email}
              onChangeText={e => {
                handleChange('email', e);
              }}
              style={styles.textInputStyle}
            />
          </View>
        </View>
        <View style={styles.viewContainer}>
          <TouchableOpacity
            style={styles.btnSubmitStyle}
            onPress={() => {
              handlePut();
            }}>
            <Text style={styles.textEditStlye}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = createStructuredSelector({
  // putDataSelector: getProfileData(),
  errorData: errorData(),
  loadingData: loadingData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onPutApi: (data, date) => {
      dispatch(putRequest(data, date));
    },
    // onRemoveData: () => {
    //   dispatch(removeData());
    // },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SettingsScreen);

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  viewAva: {
    height: '20%',
    justifyContent: 'center',
  },
  imgAvaStyle: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  viewInput: {
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: '#000',
  },

  textInputStyle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textStyle: {
    marginTop: 10,
    fontSize: 16,
  },
  btnCalendarStyle: {
    position: 'absolute',
    zIndex: 1,
    right: 15,
    top: 30,
  },
  textEditStlye: {
    color: '#fff',
    fontSize: 16,
  },
  btnSubmitStyle: {
    marginTop: 20,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 100,
    padding: 10,
    borderRadius: 4,
  },
});
