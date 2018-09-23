import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../components/homeScreen';
import DetailList from '../components/DetailList/detailList';
const RootStack = createStackNavigator(
  {
    Home: {
      screen:HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Details : {
      screen : DetailList
    }
  //   Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  },
  
);
export default RootStack;
