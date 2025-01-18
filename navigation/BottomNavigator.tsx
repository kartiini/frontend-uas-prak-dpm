import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import CRUDScreen from '../screens/CRUDScreen';
import StorageScreen from '../screens/StorageScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#F8F4EC', height: 90, paddingBottom: 10, paddingTop: 10, borderTopLeftRadius: 25, borderTopRightRadius: 25, borderColor: '#DAB88B', borderWidth: 1 },
        tabBarActiveTintColor: '#C3B091',
        tabBarInactiveTintColor: '#8B7E74',
        tabBarLabelStyle: { fontSize: 12, marginTop: 4 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'appstore-o';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'CRUD') {
            iconName = 'plussquareo';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Storage') {
            iconName = 'profile';
            return <AntDesign name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CRUD" component={CRUDScreen} />
      <Tab.Screen name="Storage" component={StorageScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
