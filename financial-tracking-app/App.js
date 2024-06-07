import { StyleSheet, Text, View , Image } from 'react-native';
import TextButton from 'C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/TextButton.tsx';

export default function App() {
 /*return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text> home screen  </Text>
      <StatusBar style="auto" />
    </View>*/
 // );
//}
//const HomeScreen = () => {
 // const navigation = useNavigation();

  return (
    /*
 <ImageBackground
      source={require('C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/images/Main.png')}
      style={styles.background}
    >*/
      <View style={styles.container}>
      
      <Text style={styles.text}>    FINANCIAL TRACKER APP</Text> 
     
      <View style={styles.imageContainer}>
      <Image source={require('C:/Users/nina-/my-SSD-app/finance-app-ssd/financial-tracking-app/images/Main.png')} style={styles.image} />
      </View>
   
      <TextButton
        //onPress={() => navigation.navigate('MainScreen')}
        buttonStyle={styles.button}
        buttonText="GET STARTED"
      />
 </View>
      // </ImageBackground>
   
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 80,
    backgroundColor: 'black',
    flex: 11,
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
    padding: 30,
    backgroundColor: '#afee',
    marginTop: 240,
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
    //alignItems : 'center',
    alignItems:'center',
    marginTop: 250,
    
   
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    //position : 'absolute',
    top : 100,
    color : '#999'
   
  },
});
