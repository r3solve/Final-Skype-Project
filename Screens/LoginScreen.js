import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon
import CustomButton from '../Components/CustomButton';
import { useUserStore } from '../store/UserDataStore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import Colors from '../constants/Colors';
import { firebaseConfig } from '../Configs/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedInUser, setUserState, loggedInUser } = useUserStore();
    const [isLoading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSignIn = () => {
        if (email.length === 0 || password.length === 0) {
            alert("Fill in the entries");
            return;
        }

        try {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    setLoggedInUser(email);
                    console.log(loggedInUser);
                    setLoading(false);
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

        setLoggedInUser(loggedInUser);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Image style={styles.logoStyle} source={require('../assets/logo.png')} />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.iconContainer}
                >
                    <Icon
                        name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={() => {/* Add forgot password logic */ }}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size={30}></ActivityIndicator>}
            <CustomButton title="Sign In" primary={true} onPress={handleSignIn} />
            <TouchableOpacity style={styles.signUp} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

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
        color: Colors.primary_color,
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
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    iconContainer: {
        padding: 10,
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
        color: Colors.primary_color,
    },
    logoStyle: {
        height: 130,
        width: 130,
        alignSelf: 'center',
        marginVertical: 12,
    },
});

export default LoginScreen;
