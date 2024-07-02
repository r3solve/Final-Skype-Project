import React from 'react';
import { StyleSheet,
    View ,
    Text,
    Image,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,

    
    } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { useUserStore } from '../store/UserDataStore';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import Colors from '../constants/Colors';
import { firebaseConfig } from '../Configs/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


const LoginScreen = ({navigation}) => {
    const [email, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setLoggedInUser, setUserState} = useUserStore()
    const [isLoading, setLoading] = useState(false)


    const handleSignIn = () => {
        try {
          setLoading(true);
          signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
              setLoggedInUser(res.user.email);
              setUserState(true);
            })
            .catch((error) => {
              setLoading(false);
              console.error(error);
              alert(`Login failed: ${error.message}`);
            })
            .finally(() => {
              setLoading(false);
            });
        } catch (error) {
          setLoading(false);
          console.error(error);
          alert(`Login failed: ${error.message}`);
        }
      };
      

    return (
        <View style={styles.container}>
            <Image  style={styles.logoStyle} source={require('../assets/logo.png')} />
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.forgotPassword} onPress={() => {/* Add forgot password logic */}}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
           { isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
            <CustomButton title="Sign In" primary={true} onPress={handleSignIn} />
            <TouchableOpacity style={styles.signUp} onPress={()=> navigation.navigate('Register')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.background_color,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: Colors.primary_color,
    },
    signUp: {
        marginTop: 20,
        alignItems: 'center',
    },
    signUpText: {
        color: '#1e90ff',
    },
    logoStyle: {
        height: 130,
        width: 130,
        alignSelf: 'center'
    }
});

export default LoginScreen;
