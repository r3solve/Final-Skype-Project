import React from 'react';
import { StyleSheet, TouchableHighlight, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const ChatBar = ({navigation}) => {
    return (
        <TouchableOpacity onPress={()=> navigation.navigate("Chat-Details")}>
            <View>
                <Text>Hello</Text>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({})

export default ChatBar;
