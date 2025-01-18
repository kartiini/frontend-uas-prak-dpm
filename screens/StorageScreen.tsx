import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface Item {
  _id: string;
  name: string;
  description: string;
}

const StorageScreen = ({ route }: { route: any }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/items');
        setItems(response.data);
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.error || 'Failed to fetch items.');
      }
    };

    fetchItems();

    if (route.params?.newItem) {
      setItems((prevItems) => [...prevItems, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items Storage</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F4EC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    color: '#DAB88B',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C5346',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#8B7E74',
  },
});

export default StorageScreen;
