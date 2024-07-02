import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import ChatBar from '../../../Components/ChatBar';
import AccountBar from '../../../Components/AccountBar';
const HomeScreen = ({navigation}) => {
  
  return (
    <>
    <Provider>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Home Screen</Text>
        <ChatBar></ChatBar>
        <FAB
          icon="message"
          style={styles.fab}
          color={Colors.secodary_color_tint}
          onPress={()=> navigation.navigate("Find-User")}
        />
      </View>
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background_color
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary_color,
  },
});

export default HomeScreen;
