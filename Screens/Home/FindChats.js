import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import AccountBar from '../../Components/AccountBar';
const FindChats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleFilter = () => {
    // Implement your filtering logic here
    console.log('Filtering');
  };

  const renderItem = ({ item }) => (
    <AccountBar uri={item.uri} onPress={() => {}} user={'@' + item.username}>
      {item.bio}
    </AccountBar>
  );

  const generateData = () => {
    const data = [];
    for (let i = 1; i <= 20; i++) {
      data.push({
        id: i,
        username: `user${i}`,
        bio: `This is the bio for user${i}`,
        uri: `https://i.pravatar.cc/150?img=${i}`
      });
    }
    setResults(data);
  };

  React.useEffect(() => {
    generateData();
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{marginHorizontal:3, marginVertical:8}}
      />
      <View>
        
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
  },
});

export default FindChats;
