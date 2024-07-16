import React, { useEffect, useState } from 'react';
import { StyleSheet, 
    View,
    // Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    ScrollView
    } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {Checkbox} from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, collection, getDocs} from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useUserStore } from '../store/UserDataStore';

import { firebaseConfig } from '../Configs/firebase';
import { Dialog, Portal, PaperProvider, Text} from 'react-native-paper'
firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

const RegisterScreen = ({navigation}) => {
    const [username, setUsername ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('https://image.rul.com')
    const [isLoading, setIsLoading] = useState(false)
    const [imageBlob, setImageBlob] = useState(null)
    const [localImageUrl, setLocalUrl] = useState(null)
    const [checked, setChecked] = useState(false)
    const {setUserState, setLoggedInUser} = useUserStore();
    const [visible, setVisible] = React.useState(false);
    const [takenUsernames, setTakenUsernames] = useState([])
    const [takenAlert, setTakenAlert] = useState(false)
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        const fetchUsers = async () => {
          const usernames = [];
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            usernames.push(doc.data().username);
          });
          setTakenUsernames(usernames);
        };
        fetchUsers();
      }, []);
      



    const handleCreateAccount = async () => {
        if (!checked) {
            alert("You need to accept our terms and agreements")
            return
        }
        if (takenAlert) {
            alert("Username Already taken")
            return 
        }

        if (username.length === 0 || email.length  === 0 || password.length === 0) {
            alert("Fill in the entries")
            return 
        }

        setIsLoading(true);
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            const storage = getStorage();
            const storageRef = ref(storage, `avatars/${Date.now()}`);
            await uploadBytes(storageRef, imageBlob);
            // Retrieve the download URL of the uploaded image
            const downloadURL = await getDownloadURL(storageRef);
            setAvatarUrl(downloadURL);
    
            // Prepare user data for Firestore
            const userData = {
                username: username,
                email: email,
                bio: 'Hey there I am on cloud Chat',
                contacts: [],
                profileUrl: downloadURL,
                status: 'online',
                phone: '',
                birthday: ''
            };
    
            // Store user data in Firestore
            await setDoc(doc(db, "users", user.email), userData);
            alert('User Created');
            setUserState(true);
            setLoggedInUser(user.email);
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
            if( result.assets[0].type == 'image') {
                setImageBlob(blob)
                setLocalUrl(result.assets[0].uri)
            }
    
        }
    };
    const checkTakenUsername =() =>{
        if (takenUsernames.includes(username)) {
            setTakenAlert(true)
        }else {
            setTakenAlert(false)
        }
    }
      
    return (
        <>
        <PaperProvider>
       <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity style={{alignSelf:'flex-start', marginTop:60}} onPress={()=> navigation.navigate('Get-Started')}   >
            <Ionicons name='chevron-back' size={40} ></Ionicons>
        </TouchableOpacity>
        <Text style={styles.title}>Cloud Chat</Text>
        <TouchableOpacity onPress={pickImage}>
            <Avatar.Image size={120} style={{backgroundColor:'gray'}} source={{uri: localImageUrl}} />
            <Text style={{textAlign:'center', fontSize:20,}} >Choose Image</Text>
        </TouchableOpacity>
        <View style={styles.form}>
            <TextInput autoCapitalize='none'  onChangeText={(text)=>setUsername(text)} style={styles.input} placeholder='@Username' onBlur={checkTakenUsername} ></TextInput>
            {takenAlert && <Text style={{textAlign:'right', fontSize:12, paddingBottom:4, color:'red'}}>username  @{username}Already Taken</Text>}
             
            <TextInput autoCapitalize='none' onChangeText={(text)=> setEmail(text)}  style={styles.input}
                placeholder='Email Address' >
                    
             </TextInput>
            <TextInput autoCapitalize='none' onChangeText={(text) => setPassword(text)} secureTextEntry={true} 
                style={styles.input} placeholder='Password' >
            </TextInput>
            <View style={{flexDirection:'row', justifyContent:"center", }}>
                <Checkbox  color={Colors.primary_color} 
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
                />
                <TouchableOpacity onPress={()=> showDialog()} ><Text style={{fontSize:12, paddingVertical:8, fontWeight:'100', color:Colors.primary_color}} >Accept Terms and Agreements</Text></TouchableOpacity>
                
            </View>
            </View>
        
        { isLoading && <ActivityIndicator size={30}></ActivityIndicator>}

        <CustomButton title='Create Account' primary='true' onPress={handleCreateAccount} />
        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Text style={styles.signUpText}>Already Have An Account? SignIn</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor:Colors.background_color, marginVertical:"30%"}}>
            <Dialog.Title>Terms of use</Dialog.Title>
            <Dialog.ScrollArea>
                <ScrollView contentContainerStyle={{paddingHorizontal:0}}>
                    <Dialog.Content>
                        <Text style={{textAlign:'center'}}>
                        - CloudChat is intended for personal, non-commercial use only. Users shall not use the service for any illegal, harmful, or offensive activities.
                        - Users must be at least 13 years of age to use CloudChat. Minors may only use the service under the supervision of a parent or legal guardian.
                        - Users shall not share personal information, including phone numbers, addresses, or financial details, through CloudChat without the consent of the other party.
                        - Users shall not send any content that is violent, hateful, or sexually explicit through CloudChat.

                        ****Prohibited Activities****
                        - Users are prohibited from using automated tools, bots, or scripts to access or use CloudChat.
                        - Users shall not attempt to circumvent any security measures or restrictions implemented by CloudChat.
                        - Users shall not use CloudChat to engage in spamming, phishing, or other unsolicited commercial communications.
                        - Users shall not use CloudChat to violate any applicable laws, regulations, or third-party policies.

                        ****Privacy and Data****
                        - CloudChat collects and processes user data in accordance with its Privacy Policy. Users must agree to the Privacy Policy to use the service.
                        - CloudChat reserves the right to monitor, review, and disclose user communications and activities as necessary to comply with legal requirements or to protect the rights and safety of CloudChat, its users, and the public.

                        ****Termination and Suspension****
                        - CloudChat reserves the right to suspend or terminate a user's access to the service at any time, for any reason, including if CloudChat reasonably believes the user has violated these Terms and Conditions.
                        - Users may terminate their use of CloudChat at any time by deactivating their account.

                        ****Limitation of Liability****
                        - CloudChat shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of the service.
                        - CloudChat's total liability to users shall not exceed the amount of fees paid by the user, if any, in the 12 months preceding the claim.

                        By using CloudChat, you agree to these Terms and Conditions. If you do not agree, please do not use the service.
                        </Text>
                    </Dialog.Content>
                </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
          <Button textColor={Colors.primary_color} onPress={hideDialog}>Okay</Button>
        </Dialog.Actions>
        </Dialog>
        </Portal>
       </SafeAreaView>
       </PaperProvider>
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
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    avatar: {
        
    },
    form: {
        marginTop:15,
        backgroundColor: Colors.background_color,
        width:"90%"
        

    },
    signUpText: {
        color: Colors.primary_color,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:Colors.primary_color
    },
})

export default RegisterScreen;
