import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Tabs/HomeScreen';
import ExploreScreen from './Tabs/ExploreScreen';
import FeedScreen from './Tabs/FeedScreen';
import SettingsScreen from './Tabs/SettingsScreen';
import Colors from '../../constants/Colors';

const Tab = createBottomTabNavigator();

const HomeBase = ({navigation}) => {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home-Screen') {
                            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-outline';
                        } else if (route.name === 'Explore') {
                            iconName = focused ? 'compass' : 'compass-outline';
                        } else if (route.name === 'Feed') {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={32} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.primary_color,
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        backgroundColor: Colors.background_color,
                        height:60
                    },
                    headerStyle: {
                        backgroundColor: Colors.background_color,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            >
                <Tab.Screen name="Home-Screen"   options={{ title: 'Chats', headerRight:() => (<>
                    <TouchableOpacity onPress={()=> navigation.navigate("Find-User")} >
                        <Ionicons style={{paddingHorizontal:12}} name='person-add-outline' size={30} ></Ionicons>
                    </TouchableOpacity>
                    </>), }} component={HomeScreen} />
                    
                <Tab.Screen name="Explore" component={ExploreScreen} />
                {/* <Tab.Screen name="Feed" component={FeedScreen} /> */}
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
    );
};

const styles = StyleSheet.create({});

export default HomeBase;
