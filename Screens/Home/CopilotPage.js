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
import { arrayUnion, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useUserStore } from '../../store/UserDataStore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { HUGG_API } from '../../Configs/huggingface';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

firebase.initializeApp(firebaseConfig)

const CopilotPage = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const flatListRef = useRef(null);
  const [resultData, setAllData] = useState(null)
  const { loggedInUser } = useUserStore()
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={{ paddingTop: 5, margin: 4 }} />
          <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('Profile', { username: route.params.username })}>
            <Avatar.Image size={45} source={{ uri: 'https://em.jpg'}} />
          </TouchableOpacity>
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        color: Colors.text_color,
        fontWeight: '200',
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Ionicons style={{ padding: 3, marginHorizontal: 3 }} size={30} name='save-outline'></Ionicons>
          </TouchableOpacity>
        </View>
      )
    });
  }, [])
  
  const inference = async (query) => {
    fetch('https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "model": "meta-llama/Meta-Llama-3-8B-Instruct",
          "messages": [{"role": "user", "content": `${query}`}],
          "max_tokens": 500,
          "stream": false
      })
  })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

      }

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '' ) {
      const newMessageObj = {
        sender: loggedInUser,
        message: newMessage,
        
      };

      setNewMessage('');
      const lastIndex = resultData.length - 1;
      flatListRef.current.scrollToIndex({ index: lastIndex, animated: true });
    }
  };


  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === loggedInUser ? styles.sentMessage : styles.receivedMessage]}>
      {item.imageUrl && 
      <Image  source={{ uri: item.imageUrl }} style={styles.attachedImage} />
      
      }
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={{alignSelf:'flex-end', color:'white', fontSize:10}}>{item.sentTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={resultData}
        renderItem={renderItem}
        keyExtractor={(item) => item.ChatId}
        contentContainerStyle={[styles.messageList]}
      />
      <View style={styles.inputContainer}>
        {attachedImage && (
          <View style={styles.attachmentContainer}>
            <Image source={{ uri: attachedImage }} style={{width:30, height:30, borderRadius:3}} />
            <TouchableOpacity onPress={cancelImageSend}>
              <Ionicons name="close" size={20} color={Colors.text_color} />
            </TouchableOpacity>
          </View>
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSendMessage}
          cursorColor={Colors.primary_color}
        />
        
        <TouchableOpacity onPress={()=> inference('who is god ?')} >
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
    backgroundColor: '#4b94b1',
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
    fontSize:15,
    fontWeight:'light',
    
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  attachedImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 8,
    alignContent:'center'
  },
});

export default CopilotPage;
