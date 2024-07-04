import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AccountBar from '../../../Components/AccountBar';
import ChannelBar from '../../../Components/ChannelBar';
import { firebaseConfig } from '../../../Configs/firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore,setDoc, doc, collection, onSnapshot, updateDoc, arrayUnion} from 'firebase/firestore';
import { useUserStore } from '../../../store/UserDataStore';

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


const ChannelScreen = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [allChannels, setAllChannels] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterChannels, setFilteredChannels] = useState([])
    const {loggedInUser} = useUserStore()
      

  const navigation = useNavigation();
  
  const handleSearch = (val) => {
    setSearchQuery(val)

  }

  const handleFollow = async (id, name) => {
      const chatRef = doc(db, 'channels', id);
    
    try {
      await updateDoc(chatRef, {
        followers: arrayUnion(loggedInUser), // Add new message to the array
      });
      } catch (e) { 
        console.log('Error', e )
        console.log(chatRef)
        
      }
    }

  const handleFabPress = () => {
    navigation.navigate('Create-Channel');
  };

  useEffect(() => {
    setIsLoading(true)
    const unsub = onSnapshot(collection(db, "channels"), (snapshot) => {
      const channels = [];
      snapshot.docs.forEach((doc) => {
        channels.push(doc.data());
      });
      setAllChannels(channels);
      setFilteredChannels(channels);
      setIsLoading(false)
    });
    return () => unsub();
  }, []);


  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={{}}
        style={{ marginHorizontal: 3,
           marginVertical: 8,
            backgroundColor: '#e8f3f5', 
            height: 55
            
          }}
          cursorColor={Colors.primary_color}
        
      />
      {!isLoading? (
        <FlatList
          data={allChannels}
          keyExtractor={(item) => item.channelId}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <ChannelBar item={item} followPressed={()=> handleFollow(item.chatId, item.name)}   onPress={()=> navigation.navigate('Channel-Details', {item:item})} />
          )}
        />
      ) : (
        <ActivityIndicator size={40} color={Colors.primary_color} />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleFabPress}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background_color,
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
 
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary_color,
  },
  noDataText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ChannelScreen;
