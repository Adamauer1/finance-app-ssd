import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import GetStartedScreen from 'C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/screens/GetStartedScreen.js';
import MainScreen from 'C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/screens/MainScreen.js';
import SignUpScreen from 'C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/screens/SignUpScreen.js' ;
import LogInScreen from 'C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/screens/LogInScreen.js';


const Stack = createNativeStackNavigator();
export default function App() {
 return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
      <Stack.Screen name="GetStarted" component={GetStartedScreen}  />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="SignUP" component={SignUpScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
     