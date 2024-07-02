import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Searchbar } from 'react-native-paper'
import { ActivityIndicator } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, collection } from "firebase/firestore";
import { firebaseConfig } from '../../Configs/firebase';

import AccountBar from '../../Components/AccountBar';
import Colors from '../../constants/Colors';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const FindChats = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterUsers(query);
  };

  const filterUsers = (query) => {
    if (query.length > 0 && allUsers && allUsers.length > 0) {
      const filteredData = allUsers.filter((item) => {
        return (
          item.username && 
          item.username.trim().toLowerCase().includes(query.trim().toLowerCase())
        );
      });
      setFilteredUsers(filteredData);
    } 
  };

  const renderItem = ({ item }) => {
    if (!item || !item.username || !item.bio) {
      return null; // Return null to skip rendering the item
    }
  
    return (
      <AccountBar
        avatarUrl={item.avatarUrl || "https://i.pravatar.cc/150?img=3"}
        onPress={() => {
          alert(`${item.username}-pressed`);
        }}
        username={`@${item.username}`}
        bio={item.bio}
      />
    );
  };

  useEffect(() => {
    setIsLoading(true)
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = [];
      snapshot.docs.forEach((doc) => {
        users.push(doc.data());
      });
      setAllUsers(users);
      setFilteredUsers(users);
      setIsLoading(false)
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        style={{ marginHorizontal: 3, marginVertical: 8, backgroundColor: '#e5ecec' }}
      />
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator size={40} color={Colors.primary_color} />
        ) : (
          filteredUsers && filteredUsers.length > 0 ? (
            <FlatList
              data={filteredUsers}
              renderItem={renderItem}
              keyExtractor={(item) => item.email}
              contentContainerStyle={styles.flatListContainer}
            />
          ) : (
            <Text>No users found.</Text>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  flatListContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
});

export default FindChats;
