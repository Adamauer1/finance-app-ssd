import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { View,  StyleSheet, Image, Text } from 'react-native';
//import TextButton from 'C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/TextButton.tsx';


export default function AllScreens({}) {
    const params = useLocalSearchParams();
    const {userID} = params;
  return (

<View style={styles.container}>
           <View style={styles.imageContainer}>
      <Image source={require('@/images/Main.png')} style={styles.image} />
      <Text>Hello {userID}</Text>
      </View>
    
      {/* <TextButton
       onPress={() => navigation.navigate('TransactionScreen')}
       buttonStyle={styles.button}
        buttonText="TRANSACTION"
      />
      <TextButton
       onPress={() => navigation.navigate('BudgetScreen')}
        buttonStyle={styles.button}
        buttonText="BUDGET"
      />
      <TextButton
       onPress={() => navigation.navigate('StatisticsScreen')}
        buttonStyle={styles.button}
        buttonText="STATISTICS"
      /> */}
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 80,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    alignContent: 'center',
    padding: 7,
    borderRadius: 5,
  },
  button: {
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: '#afee',
    marginTop: 10,
    marginBottom : 50,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  image: {
    width: 250,
    height: 250,
   // marginRight: 10,
    resizeMode : 'contain',
    
  },
  imageContainer:{
     flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 10,
    
   
  },
});