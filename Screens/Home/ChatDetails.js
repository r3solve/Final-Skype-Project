import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
import { Avatar } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../../Configs/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {arrayUnion, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useUserStore } from '../../store/UserDataStore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const ChatDetails = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const flatListRef = useRef(null);
  const [resultData, setAllData] = useState(null)
  const {id} = route.params
  const {loggedInUser} = useUserStore()

  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} style={{ paddingTop: 12, margin: 4 }} />
                <TouchableOpacity style={{paddingHorizontal:5}} onPress={()=> navigation.navigate('Profile')} >
                    <Avatar.Image size={50} source={{ uri: route.params.profileUrl }} />
                </TouchableOpacity>
            </TouchableOpacity>
        ),
        headerTitle: route.params.username.split('@')[0],
        headerTitleStyle: {
            color: Colors.text_color,
            fontWeight: '200',
          
        },
    });
}, [navigation, route.params.username]);

  useEffect(() => {
  
    const chatRef = doc(db, 'chats', id);
  
    // Set up the onSnapshot listener
    const unsub = onSnapshot(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data && data.messages) {
          setAllData(data.messages);
          console.log(resultData)

        } else {
          console.log('Messages field is missing in the document');
        }
      } else {
        alert.log("Can't Load Chats");
      }
    });
  
    // Clean up the onSnapshot listener on unmount
    return () => unsub();
  }, [id, resultData]); // Add chatId to dependency array to re-run the effect when chatId changes
  // Add chatId to dependency array to re-run the effect when chatId changes
  

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '' || attachedImage) {
      const newMessageObj = {
        sender: loggedInUser,
        message: newMessage,
        reciever:route.params.username,
        imageUrl: attachedImage,
        sentDate: new Date().toDateString(),
        sentTime: new Date().toTimeString()
      
      };

      const chatRef = doc(db, 'chats', id);
      await updateDoc(chatRef, {
        messages: arrayUnion(newMessageObj), // Add new message to the array
        updatedAt: Date.now() 
      });
      setNewMessage('');
      setAttachedImage(null);
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  const handleAttachImage = async () => {
    // Request camera roll permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAttachedImage(result.uri);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === loggedInUser ? styles.sentMessage : styles.receivedMessage]}>
      {item.image && <Image source={{ uri: item.image }} style={styles.attachedImage} />}
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={{alignSelf:'flex-end', color:'white'}}>{item.sentTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={resultData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.messageList]}
      />
      <View style={styles.inputContainer}>
        {attachedImage && (
          <View style={styles.attachmentContainer}>
            <Image source={{ uri: attachedImage }} style={styles.attachedImage} />
            <TouchableOpacity onPress={() => setAttachedImage(null)}>
              <Ionicons name="close" size={20} color={Colors.text_color} />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="add-circle-outline" size={30} color={Colors.primary_color} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAttachImage}>
          <Ionicons name="attach" size={30} color={Colors.primary_color} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSendMessage}
        />
        
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send" size={30} color={Colors.primary_color} />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  messageList: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 4,
  },
  sentMessage: {
    backgroundColor: Colors.primary_color,
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: Colors.primary_color,
    alignSelf: 'flex-start',
    
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background_color,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  attachedImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default ChatDetails;
