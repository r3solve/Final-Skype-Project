import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { Avatar, Chip, Divider, Searchbar } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

import { firebaseConfig } from '../../Configs/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore,setDoc, doc, collection } from 'firebase/firestore';
import { useUserStore } from '../../store/UserDataStore';

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const CreateChannelScreen = () => {
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [checked, setChecked] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('https://i.pravatar.cc/150?u=fake@pravatar.com')
  const {loggedInUser} = useUserStore();
  const [searchQuery, setSearchQuery] = useState('')
  const tags = [
    { id: 1, label: 'Education' },
    { id: 2, label: 'Food' },
    { id: 3, label: 'Entertainment' },
    { id: 4, label: 'Travel' },
    { id: 5, label: 'Sports' },
    { id: 6, label: 'Technology' },
    { id: 7, label: 'Business' },
    { id: 8, label: 'Health' },
    { id: 9, label: 'Arts' },
    { id: 10, label: 'Music' },
  ];

  const handleTagSelect = (tag) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCreateChannel = async  () => {
    //Working on this side 
    const channelId = 'channel_' + Date.now().toString();

    const newChatRef = doc(collection(db, 'channels'), channelId);
    await setDoc(newChatRef, {
      chatId: channelId,
      name:channelName,
      description:channelDescription,
      createdBy: loggedInUser,
      admins:[loggedInUser],
      followers: [],
      posts: [],
      tags: [...selectedTags],
      avatarUrl:avatarUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      isMonetized: checked,
      dateCreated: new Date().toLocaleString()
    }).then(()=> {
      setSelectedTags([])
      setChannelDescription('')
      setChannelName('')

    }).catch(()=>{
      alert('Can\t Create Create Channel ')
    }).finally(()=>{
      navigation.navigate("Channel-Details", {profileUrl: profileUrl, id:chatId, name:channelName})

    });
    
    // Handle channel creation logic here
    // console.log('Channel Name:', channelName);
    // console.log('Channel Description:', channelDescription);
    // console.log('Selected Tags:', selectedTags);
  };

  

  return (
    <View style={styles.container}>

      <TouchableOpacity>
        <Avatar.Image style={{ margin: 4 }} size={100} source={{ uri: avatarUrl }} />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Channel Name"
          value={channelName}
          onChangeText={setChannelName}
        />
        <TextInput
          style={styles.input}
          placeholder="Channel Description"
          value={channelDescription}
          onChangeText={setChannelDescription}
        />
      </View>
      <Divider style={{ marginVertical: 15 }} />

      <View style={{ flexDirection: 'row' }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
          color={Colors.primary_color}
        />
        <Text style={{ paddingTop: 8 }}>Monetize</Text>
      </View>

      <View>
        <Text style={styles.subscriptionText}>
          Unlock Exclusive Earning Opportunities with Cloud Chat's Paid Subscription
        </Text>
        <Text style={styles.subscriptionDescription}>
          Leverage the power of our platform to monetize your channel and content. By
          upgrading to a paid subscription, you'll gain access to advanced features
          and tools that enable you to generate revenue from your audience.
        </Text>
      </View>
      <Divider style={{ marginVertical: 15 }} />
      <Text style={styles.sectionTitle}>Select Tags</Text>
      <View style={styles.tagContainerWrapper}>
        <ScrollView horizontal style={[styles.tagContainer, { maxHeight: 80 }]}>
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              style={[
                styles.tag,
                selectedTags.some((t) => t.id === tag.id) && styles.selectedTag,
              ]}
              onPress={() => handleTagSelect(tag)}
            >
              {tag.label}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateChannel}>
        <Text style={styles.createButtonText}>Create Channel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
    paddingHorizontal: 16,
    paddingVertical: 24,
    width: '100%',
  },
  inputContainer: {
    marginVertical:8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagContainerWrapper: {
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.primary_color_tint,
    marginRight: 8,
  },
  selectedTag: {
    backgroundColor: Colors.primary_color,
    elevation: 2,
    color: '#fff',
  },
  createButton: {
    backgroundColor: Colors.primary_color,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subscriptionDescription: {
    fontSize: 16,
    lineHeight: 18,
    color: '#666',
  },
});

export default CreateChannelScreen;