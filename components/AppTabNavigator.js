import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen'
import ExchangeScreen from '../screens/ExchangeScreen'
import LoginScreen from '../screens/WelcomeScreen'

export const AppTabNavigator = createBottomTabNavigator({
   HomeScreen:{
    screen:HomeScreen,
   navigationOptions:{
  tabBarIcon :<Image source={require('../assets/request-list.png')} 
style={{width: 20,height: 20}}
/>,
tabBarLabel: "HOME SCREEN",
   }

   } ,

    Exchange:{
   screen:ExchangeScreen,
   navigationOptions:{
       tabBarIcon :<Image source={require('../assets/request-list.png')} 
style={{width: 20,height: 20}}
/>,
   tabBarLabel:"EXCHANGE SCREEN"
   }

   } 
}) 