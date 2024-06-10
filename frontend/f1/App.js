import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start.</Text>
      <StatusBar style="auto" />
    </View>
   
  );
  return <AppNavigator />; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
