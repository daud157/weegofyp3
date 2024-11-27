import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DriverMainHome from './driverMainHome';
import EarningsScreen from './Earnings';
import ProfileScreen from './Profile';
import SettingsScreen from './Settings';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const drawerAction = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <>
      <View className="absolute top-16 left-8 bg-slate-50 p-2 rounded-full shadow z-10">
        <TouchableOpacity onPress={drawerAction}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* <NavigationContainer> */}
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = 'home';
              if (route.name === 'Earnings') {
                iconName = 'cash';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              } else if (route.name === 'Settings') {
                iconName = 'settings';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FFA500',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Main" component={DriverMainHome} options={{ title: 'Home' }} />
          <Tab.Screen name="Earnings" component={EarningsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      {/* </NavigationContainer> */}

      <StatusBar style="auto" />
    </>
  );
};

export default HomeScreen;
