import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  LogBox,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getData} from '../Manage/action';
import {getDataState, loadingData} from '../Manage/selector';
import {SliderBox} from 'react-native-image-slider-box';
import {PieChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';
import images from '../../constants/images';
import React, {useState, useEffect} from 'react';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const screenWidth = Dimensions.get('window').width;

const DashBoard = props => {
  const {getDataState, onGetApi, themeState, loadingData} = props;
  const navigation = useNavigation();
  useEffect(() => {
    onGetApi();
  }, []);

  const [image, setImage] = useState([
    images.dashBoard1,
    images.dashBoard2,
    images.dashBoard3,
    images.dashBoard4,
  ]);
  let fmale = 0;
  let male = 0;
  {
    Array.isArray(getDataState) &&
      getDataState.map(item => {
        {
          item.gender === 'Male' ? male++ : fmale++;
        }
      });
  }
  const data = [
    {
      name: 'Male',
      gender: male,
      color: '#1E90FF',
      legendFontColor: '#1E90FF',

      legendFontSize: 15,
    },
    {
      name: 'Female',
      gender: fmale,
      color: '#F00',
      legendFontColor: '#F00',
      legendFontSize: 15,
    },
  ];
  console.log('mount');
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <SliderBox
          images={image}
          sliderBoxHeight={300}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 15,
            marginHorizontal: 10,
            padding: 0,
            margin: 0,
          }}
          paginationBoxStyle={{
            position: 'absolute',
            bottom: 0,
            padding: 0,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 10}}
        />
        <View
          style={{
            marginTop: 10,
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            backgroundColor: '#fff',
            borderRadius: 15,
            marginHorizontal: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              marginVertical: 10,
              fontWeight: 'bold',
            }}>
            Gender Analytics
          </Text>
          <PieChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            center={[5, -15]}
            accessor={'gender'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#A6C1FF',
              width: '70%',
              alignSelf: 'center',
              borderRadius: 4,
              marginVertical: 10,
              paddingVertical: 10,
            }}
            onPress={() => {
              navigation.navigate('Mange');
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 22,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Total:{' '}
              <Text
                style={{
                  color: '#000',
                  fontSize: 22,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                {getDataState.length} members
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = createStructuredSelector({
  getDataState: getDataState(),
  loadingData: loadingData(),
  // themeState: themeState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetApi: () => {
      dispatch(getData());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashBoard);

const styles = StyleSheet.create({});
