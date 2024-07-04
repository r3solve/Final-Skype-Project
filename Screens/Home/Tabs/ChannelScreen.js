import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AccountBar from '../../../Components/AccountBar';
import ChannelBar from '../../../Components/ChannelBar';
const ChannelScreen = () => {
    const [channels, setChannels] = useState([
        {
          id: 2,
          title: 'Cooking Recipes',
          description: 'A channel for sharing delicious recipes.',
          profileImage: 'https://i.pravatar.cc/150?u=fake@pravatar.com',
          followers: 1234,
          members: ['user1', 'user2', 'user3'],
          posts: [
            {
              id: 1,
              title: 'Homemade Pasta',
              content: 'Learn how to make fresh pasta from scratch.',
              createdAt: '2023-06-01T12:00:00',
              mediaUrl:'',
            },
            {
              id: 2,
              title: 'Grilled Salmon',
              content: 'A simple and healthy salmon recipe.',
              createdAt: '2023-06-15T09:30:00'
            }
          ],
          createdAt: '2023-05-01T00:00:00',
          updatedAt: '2023-06-15T09:30:00',
          creatorId: 'user123',
          admins: ['user123', 'user456']
        },
        {
          id: 3,
          title: 'Travel Destinations',
          description: 'Explore the world with us!',
          profileImage: 'https://i.pravatar.cc/150?u=3',
          followers: 5678,
          members: ['user4', 'user5', 'user6', 'user7'],
          posts: [
            {
              id: 1,
              title: 'Top 10 Beaches in Hawaii',
              content: 'Discover the most beautiful beaches in the Hawaiian islands.',
              createdAt: '2023-04-20T15:00:00'
            },
            {
              id: 2,
              title: 'Hiking in the Swiss Alps',
              content: 'Breathtaking views and challenging trails in the Swiss Alps.',
              createdAt: '2023-05-10T11:45:00'
            }
          ],
          createdAt: '2023-03-01T00:00:00',
          updatedAt: '2023-05-10T11:45:00',
          creatorId: 'user789',
          admins: ['user789', 'user012']
        }
      ]);
      

  const navigation = useNavigation();

  const handleFabPress = () => {
    navigation.navigate('Create-Channel');
  };

  return (
    <View style={styles.container}>
      {channels.length > 0 ? (
        <FlatList
          data={channels}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <ChannelBar item={item}  onPress={()=> navigation.navigate('Channel-Details', {item:item})} />
          )}
        />
      ) : (
        <Text style={styles.noDataText}>No channels available.</Text>
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
