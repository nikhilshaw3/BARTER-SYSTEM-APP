import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import customSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarters from '../screens/MyBarters';
import NotificationScreen from '../screens/NotificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
  },
  Setting: {
    screen: SettingScreen
  },
  MyBarters: {
screen: MyBarters
  },
  Notifications:
  {screen:NotificationScreen
  },
  },
  {
    contentComponent:customSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })