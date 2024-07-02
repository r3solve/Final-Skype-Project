import React, { useState } from 'react';
import { StyleSheet, 
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput
    } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Checkbox from 'react-native-paper';
import CustomButton from '../Components/CustomButton';

const RegisterScreen = ({navigation}) => {

    const handleCreateAccount = ()=> {
        console.log('Create Account');
    }

    const [avatarUrl, setAvatarUrl] = useState("https://i.pravatar.cc/150?u=fake@pravatar.com")
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
       <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity style={{alignSelf:'flex-start', marginTop:60}} onPress={()=> navigation.navigate('Get-Started')}   >
            <Ionicons name='chevron-back' size={40} ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity>
            <Avatar.Image size={120} source={{uri: avatarUrl}} />
            <Text style={{textAlign:'center', fontSize:20}} >Choose Image</Text>
        </TouchableOpacity>

        <View style={styles.form}>
            <TextInput autoCapitalize='none' onChangeText={(text)=>setUsername(text)} style={styles.input} placeholder='@Username' ></TextInput>
            
            <TextInput autoCapitalize='none' onChangeText={(text)=> setEmail(text)}  style={styles.input}
                placeholder='Email Address' >
                    
             </TextInput>
            <TextInput autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true} 
                style={styles.input} placeholder='Password' >
            </TextInput>
            <View style={{flexDirection:'row'}}>
                
                <Text style={{fontSize:12, paddingVertical:16, fontWeight:'100'}} >Sync contacts with servers</Text>
            </View>
            </View>
        
        { isLoading && <ActivityIndicator size={30}></ActivityIndicator>}

        <CustomButton title='Create Account' primary='true' />
       </SafeAreaView>
       </>

      )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems:'center',
        backgroundColor:Colors.background_color
    },
    input: {
        height: 45,
        width:'95%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#ecf1f1',
        fontSize: 16,
    },
    avatar: {
        
    },
    form: {
        marginTop:15,
        backgroundColor: Colors.background_color,
        width:"90%"
        

    }
})

export default RegisterScreen;
