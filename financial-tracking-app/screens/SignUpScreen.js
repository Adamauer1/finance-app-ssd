import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TextButton from 'C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/TextButton.tsx';

export default function SignUpScreen({}) {

return (

<View style={styles.container}>
 <View style={styles.imageContainer}>
      <Image source={require('C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/images/Main.png')} style={styles.image} />
      </View>
   
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 80,
    backgroundColor: 'black',
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
    marginTop: 20,
    marginBottom : 100,
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