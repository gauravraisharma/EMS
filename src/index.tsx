import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import CustomDrawerContentComponent from './components/Drawer';

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  HomeScreen,
  EmployeeDetail,
  LeaveApply,
  Leaves,
} from './screens';

const AppDrawerNavigator = createDrawerNavigator(
  {Dashboard, Leaves},
  {
    contentComponent: props => <CustomDrawerContentComponent {...props} />,
  },
);

const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    HomeScreen,
    AppDrawerNavigator,
    EmployeeDetail,
    LeaveApply,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

// const AppSwitchNavigator = createSwitchNavigator({
//   Router,
//   AppDrawerNavigator,
// });

export default createAppContainer(Router);
