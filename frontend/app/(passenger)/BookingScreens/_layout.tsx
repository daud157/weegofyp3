import { createStackNavigator } from '@react-navigation/stack';
import Child1Screen from './index';
import Child2Screen from './ChildScreene';

const Stack = createStackNavigator();

function BookingLayout() {
  return (
    <Stack.Navigator initialRouteName="Homebooking"   options={{ headerShown: false }} >
      <Stack.Screen name="HomeBooking" component={Child1Screen}   options={{ headerShown: false }}  />
       <Stack.Screen name="Details" component={Child2Screen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}

export default BookingLayout;
