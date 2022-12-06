import React, { useState } from "react";
import { Alert, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { signIn, store } from './SigninReducer';
import firebaseConfig from './firebaseConfig';
import { userInfo, userStore } from './UserReducer';
import styles from './Styles';

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Listen to any changes in 'user' data and set "userReducer's" store to "user.uid"
    const authListener = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                userStore.dispatch(userInfo(uid))
            } else {
                userStore.dispatch(userInfo(''))
            }
        })
    };

    // Login if credentials match existing crendentials and if so, set "signInReducer's" store to "true"
    const onLogin = () => {
        try {
            if (email !== '' && password !== '') {
                signInWithEmailAndPassword(auth, email.replace(' ', ''), password.replace(' ', ''))
                    .then(() => store.dispatch(signIn(true)))
                    .then(() => authListener())
                    .catch(error => {
                        switch (error.code) {
                            case 'auth/user-not-found':
                                Alert.alert('User Not Found!')
                                break;
                            case 'auth/wrong-password':
                                Alert.alert('Incorrect Password!')
                                break;
                            case 'auth/invalid-email':
                                Alert.alert('Invalid Email!')
                                break;
                            case 'auth/too-many-requests':
                                Alert.alert('Too Many Login Attempts. Try again later!')
                                break;
                        }
                    })
            } else {
                Alert.alert('Login Fields Cannot Be Empty')
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <View style={styles.signContainer}>
              <Image
                style={styles.signImage}
                source={require('../assets/logo.png')}
            />
            <Text style={styles.signTitle}>Happy to see You!</Text>
            <View style={styles.signInputView}>
                <TextInput
                    style={styles.signTextInput}
                    placeholder="Email"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholderTextColor="grey"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.signInputView}>
                <TextInput
                    style={styles.signTextInput}
                    placeholder="Password"
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.signBtn} onPress={onLogin}>
                <Text>LOG IN</Text>
            </TouchableOpacity>
            <Text>Don't have an account?</Text>
            <TouchableOpacity style={styles.signUpBtn} onPress={() => navigation.navigate('SignUp')}>
                <Text>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}
