import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import Colors from '../../../constants/Colors';

const SettingsScreen = ({ navigation }) => {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'Profile',
        headerTitleStyle: {
          fontSize: 28,
          fontWeight:'bold'
        },
        headerRight: () => (
          <TouchableOpacity>
            <Ionicons name="qr-code-outline" size={30} style={{ paddingHorizontal: 30 }} color={Colors.primary} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.background_color, // Replace with your desired header background color
        },
      });
    }, [navigation]);
    

    return (
        <View style={styles.container}>
            <View style={styles.profilePicContainer}>
                <View style={styles.profilePic} />
                <Text style={{fontSize:30, fontWeight:'bold'}}>John Doe</Text>
            </View>
            <View style={[styles.option, styles.alignItemsCenter]}>
                <Ionicons name="mail-outline" size={24} color="black" />
                <Text style={styles.optionName}>Email</Text>
                <Text style={styles.optionValue}>judosloth@gmail.com</Text>
            </View>
            <View style={[styles.option, styles.alignItemsCenter]}>
                <Ionicons name="call-outline" size={24} color="black"  />
                <Text style={styles.optionName}>Phone</Text>
                <Text style={styles.optionValue}>0540552725</Text>
            </View>
            <View style={[styles.option, styles.alignItemsCenter]}>
                <Ionicons name="gift-outline" size={24} color="black" />
                <Text style={styles.optionName}>Add birthday</Text>
                <Text style={styles.optionValue}>24 Dec 2024</Text>

            </View>
            <View style={{marginTop:40}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Other</Text>

                <TouchableOpacity style={[styles.option, styles.alignItemsCenter]}>
                    <Ionicons name="share-outline" size={24} color="black" />
                    <Text style={styles.optionName}>Share Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, styles.alignItemsCenter]}>
                    <Ionicons name='log-out-outline' size={24} color="black" />
                    <Text style={[styles.optionName, {fontSize:18, fontWeight:'bold'}]}>Log Out</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:Colors.background_color
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profilePicContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'purple', // Set your desired profile picture color
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth:1,
        paddingVertical: 10,
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    optionName: {
        flex: 1,
        marginHorizontal: 10,
    },
    optionValue: {
        flex: 1,
        textAlign: 'right',
        color:'#555555',
        fontSize:14
    },
});

export default SettingsScreen;
