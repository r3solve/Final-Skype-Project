import React from 'react';
import { StyleSheet,
     TouchableHighlight,
      View, 
      TouchableOpacity, 
      Text,
    Image,
    } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Badge } from 'react-native-paper';
import Colors from '../constants/Colors';
const ChatBar = ({username, avatarUrl, lastMessage}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.outContainer} onPress={()=> navigation.navigate("Chat-Details")}>
            <View style={styles.chatbar} >
                <Avatar.Image size={70} source={{uri:avatarUrl}} />
                <View style={{marginHorizontal:12,paddingTop:8}} >
                    <Text style={styles.profileNameText}>{username}</Text>
                    <Text style={styles.lastMessage}>{lastMessage}
                    </Text>

                </View>
                {/* <Badge style={{marginBottom:20, marginLeft:'35%', alignSelf:'flex-end'}} size={35}>3</Badge> */}

            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    chatbar:{
        flexDirection:'row',
        width: "100%",
        alignContent:'center'
       
    },
    profileNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary_color
    },
    lastMessage: {
        fontSize: 14,
        color: '#9ba3a8',
    },
    outContainer: {
        justifyContent:'center',
        width: "99%",
        borderRadius:4,
        borderWidth:1,
        borderColor:'#e6e2e2',
        backgroundColor:'white',
        height:80
        
    }
})

export default ChatBar;
