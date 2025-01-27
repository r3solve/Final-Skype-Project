import React, { useState } from 'react';
import { StyleSheet, 
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
    } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Checkbox from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc} from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useUserStore } from '../store/UserDataStore';

import { firebaseConfig } from '../Configs/firebase';

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

const RegisterScreen = ({navigation}) => {
    const [username, setUsername ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatarUrl, setAvatarUrl] = useState("https://placeholder.pics/svg/120")
    const [isLoading, setIsLoading] = useState(false)

    const {setUserState, setLoggedInUser} = useUserStore();
    const handleCreateAccount = async () => {
        console.log('Create Account');
        setIsLoading(true);
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Prepare user data for Firestore
            const userData = {
                username: username,
                email: email,
                bio: 'Hey there I am on cloud Chat',
                contacts: [],
                profileUrl: avatarUrl,
                status: 'online'
            };
    
            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), userData);
            alert('User Created');
            setUserState(true)
            setLoggedInUser(user.email)
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
    
            // Get a reference to the Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `avatars/${Date.now()}`);
    
            // Upload the image to Firebase Storage
            await uploadBytes(storageRef, blob);
            alert('Image uploaded')
            // Retrieve the download URL of the uploaded image
            const downloadURL = await getDownloadURL(storageRef);
            setAvatarUrl(downloadURL);
        }
    };
    
      

    return (
        <>
       <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity style={{alignSelf:'flex-start', marginTop:60}} onPress={()=> navigation.navigate('Get-Started')}   >
            <Ionicons name='chevron-back' size={40} ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
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

        <CustomButton title='Create Account' primary='true' onPress={handleCreateAccount} />
        <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <Text>Already Have An Account? SignIn</Text>
        </TouchableOpacity>
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
