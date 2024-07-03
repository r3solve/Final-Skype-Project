import React from 'react';
import { StyleSheet, View , Text} from 'react-native';
import Colors from '../constants/Colors';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor:Colors.background_color,
        flex: 1
    }
})

export default ProfileScreen;
