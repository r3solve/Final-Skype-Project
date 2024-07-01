import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen  from './Tabs/HomeScreen';
import ExploreScreen from './Tabs/ExploreScreen';
import FeedScreen from './Tabs/FeedScreen';
import SettingsScreen from './Tabs/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeBase = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" options={{title:'Chats'}} component={HomeScreen} />
            <Tab.Screen name='Explore' component={ExploreScreen} />
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
        
    );
}

const styles = StyleSheet.create({})

export default HomeBase;
