import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import Colors from '../../../constants/Colors';
import { useUserStore } from '../../../store/UserDataStore';
import { firebaseConfig } from '../../../Configs/firebase';
import { getFirestore, getDoc, doc, onSnapshot } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { Avatar } from 'react-native-paper';

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const SettingsScreen = ({ navigation }) => {
    const {setUserState, setLoggedInUser, loggedInUser} = useUserStore()
    const [userData, setUserData]= useState(null)
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'Profile',
        headerTitleStyle: {
          fontSize: 28,
          fontWeight:'bold'
        },
        headerRight: () => (
          <TouchableOpacity>
            <Ionicons name="qr-code-outline" size={25} style={{ paddingHorizontal: 30 }} color={Colors.primary} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.background_color, // Replace with your desired header background color
        },
      });
    }, [navigation]);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userRef = doc(db, 'users', loggedInUser);
                const userSnapshot = await getDoc(userRef);
                if (userSnapshot.exists()) {
                    setUserData(userSnapshot.data());
                } else {
                    console.log('User document does not exist');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [loggedInUser]);


    const handleLogOut = () => {
        setUserState(false)
        setLoggedInUser(null)
    }
    return (
        <View style={styles.container}>
            <View style={styles.profilePicContainer}>
                {console.log(loggedInUser)}
                <View />
                <Avatar.Image size={100}  source={{uri:userData?.profileUrl}}/>
                <Text style={{fontSize:30, fontWeight:'bold', color:Colors.tertiary_color_tint}}>@{userData?.email.split("@")[0]}</Text>
            </View>
            <View style={[styles.option, styles.alignItemsCenter]}>
                <Ionicons name="mail-outline" size={24} color="black" />
                <Text style={styles.optionName}>Email</Text>
                <Text style={styles.optionValue}>{userData?.email}</Text>
            </View>
            <View style={[styles.option, styles.alignItemsCenter]}>
                <Ionicons name="call-outline" size={24} color="black"  />
                <Text style={styles.optionName}>Phone</Text>
                <Text style={styles.optionValue}>{userData?.phone}</Text>
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

                <TouchableOpacity onPress={handleLogOut}  style={[styles.option, styles.alignItemsCenter]}>
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
