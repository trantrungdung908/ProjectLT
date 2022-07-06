import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {putDataRequest, postDataRequest} from '../action';
import {loadingData, errorData} from '../selector';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioForm from 'react-native-simple-radio-button';

const ManageComponent = props => {
  console.log('mounting ManageComponent');
  const {onPutApi, errorData, loadingData, onPostApi} = props;
  const navigation = useNavigation();
  const route = useRoute();
  const {params} = route;

  const [chosenOption, setChosenOption] = useState('Male');

  const options = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const [localState, setLocalState] = useState({
    id: params.id,
    name: params.name,
    avatar: params.avatar,
    birthday: params.birthday,
    email: params.email,
    age: params.age,
    phone: params.phone,
    position: params.position,
    gender: params.gender,
  });

  const [localData, setLocalData] = useState({
    id: '',
    name: '',
    // avatar: '',
    // birthday: params.birthday,
    email: '',
    age: '',
    phone: '',
    position: '',
    // gender: '',
  });

  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date(localState.birthday),
  );
  const [newSelectedDate, setNewSelectedDate] = useState(new Date());

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
    setNewSelectedDate(date);
    hideDatePicker();
  };

  const handleChange = (key, value) => {
    let newData = {};
    newData[key] = value;
    {
      params.title === 'Add'
        ? setLocalData({
            ...localData,
            ...newData,
          })
        : setLocalState({
            ...localState,
            ...newData,
          });
    }
  };
  const handleUpdate = () => {
    onPutApi(localState, selectedDate, chosenOption);
    setLocalState({
      ...localState,
    });
  };
  const handleAdd = () => {
    onPostApi(localData, newSelectedDate, chosenOption);
    setLocalState({
      ...localData,
      name: '',
      age: '',
      phone: '',
      email: '',
      position: '',
    });
  };

  useEffect(() => {
    if (errorData === false) {
      navigation.goBack();
    }
  }, [errorData]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.viewContainer}>
      <View key={localState.id} style={[styles.viewContainer, {padding: 24}]}>
        {params.title === 'Add' ? (
          <View style={styles.viewAva}>
            <Icon
              name="user"
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              size={40}
            />
          </View>
        ) : (
          <View style={styles.viewAva}>
            <Image style={styles.imgAvaStyle} source={{uri: params.avatar}} />
          </View>
        )}
        <View style={styles.viewContent}>
          <TextInput
            value={params.title === 'Add' ? null : localState.name}
            autoFocus={true}
            placeholder="Name: "
            onChangeText={e => {
              handleChange('name', e);
            }}
            style={styles.textInputStyle}
          />

          <TextInput
            value={params.title === 'Add' ? null : localState.age.toString()}
            placeholder="Age: "
            onChangeText={e => {
              handleChange('age', e);
            }}
            style={styles.textInputStyle}
          />
          <View>
            <TouchableOpacity
              style={styles.btnCalendarStyle}
              onPress={showDatePicker}>
              <AntDesign name="calendar" size={25} />
            </TouchableOpacity>
            <DateTimePickerModal
              date={params.title === 'Add' ? newSelectedDate : selectedDate}
              isVisible={datePickerVisible}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput
              editable={false}
              value={
                params.title === 'Add'
                  ? isActive === false
                    ? ''
                    : moment(newSelectedDate).format('DD-MM-YYYY')
                  : isActive === false
                  ? moment(localState.birthday).format('DD-MM-YYYY')
                  : moment(selectedDate).format('DD-MM-YYYY')
              }
              placeholder={params.title === 'Add' ? 'Birthday: ' : null}
              style={styles.textInputStyle}
            />
          </View>

          <TextInput
            value={params.title === 'Add' ? null : localState.phone.toString()}
            placeholder={params.title === 'Add' ? 'Phone: ' : null}
            onChangeText={e => {
              handleChange('phone', e);
            }}
            style={styles.textInputStyle}
          />
          <TextInput
            value={params.title === 'Add' ? null : localState.email}
            placeholder={params.title === 'Add' ? 'Email: ' : null}
            onChangeText={e => {
              handleChange('email', e);
            }}
            style={styles.textInputStyle}
          />
          <TextInput
            value={params.title === 'Add' ? null : localState.position}
            placeholder={params.title === 'Add' ? 'Position: ' : null}
            onChangeText={e => {
              handleChange('position', e);
            }}
            style={styles.textInputStyle}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                padding: 10,
              }}>
              Gender:
            </Text>

            <RadioForm
              style={{
                marginTop: 10,
              }}
              formHorizontal={true}
              radio_props={params.title === 'Add' ? options : options}
              buttonColor={'#000'}
              animation={false}
              // initial={0} //initial value of this group
              onPress={value => {
                setChosenOption(value);
              }} //if the user changes options, set the new value
            />
          </View>
        </View>
        <View style={styles.viewFooter}>
          <TouchableOpacity
            onPress={() => {
              {
                params.title === 'Add' ? handleAdd() : handleUpdate();
              }
            }}
            style={styles.btnSubmitStyle}>
            {params.title === 'Add' ? (
              <Text style={styles.textStyle}>Add</Text>
            ) : (
              <Text style={styles.textStyle}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = createStructuredSelector({
  errorData: errorData(),
  loadingData: loadingData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onPostApi: (data, date, gender) => {
      dispatch(postDataRequest(data, date, gender));
    },
    onPutApi: (data, date, gender) => {
      dispatch(putDataRequest(data, date, gender));
    },
    onRemove: () => {
      dispatch(remove());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ManageComponent);

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  viewAva: {
    height: '20%',
    justifyContent: 'center',
  },
  imgAvaStyle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
  },
  viewContent: {
    height: '60%',
  },
  textInputStyle: {
    borderRadius: 4,
    height: 35,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
    padding: 10,
  },
  textStyle: {
    color: '#fff',
    justifyContent: 'center',
    fontSize: 16,
  },
  btnCalendarStyle: {
    position: 'absolute',
    zIndex: 99,
    right: 20,
    top: 15,
  },
  flexIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewFooter: {
    height: '10%',
  },
  btnSubmitStyle: {
    marginRight: 10,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 100,
    padding: 10,
    borderRadius: 4,
  },
});
