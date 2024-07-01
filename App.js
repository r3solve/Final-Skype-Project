import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBase from './Screens/Home/HomeBase';
import BaseScreen from './Screens/BaseScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const isLoggedIn = true;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group name='home-decendants'
          screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeBase} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group 
            name='before-login'
            screenOptions={{ headerShown: false }}
          > 
            <Stack.Screen name="GetStarted" component={BaseScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
