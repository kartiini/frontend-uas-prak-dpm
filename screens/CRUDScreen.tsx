import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axiosInstance from '../utils/axiosInstance';

interface Item {
  _id: string;
  name: string;
  description: string;
}

const CRUDScreen = ({ navigation }: { navigation: any }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/items');
      setItems(response.data);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to fetch items.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateItem = async () => {
    if (!name || !description) {
      Alert.alert('Validation', 'Name and Description are required.');
      return;
    }

    try {
      if (editMode && editingId) {
        await axiosInstance.put(`/items/${editingId}`, { name, description });
        Alert.alert('Success', 'Item updated successfully!');
      } else {
        const response = await axiosInstance.post('/items', { name, description });
        Alert.alert('Success', 'Item added successfully!');
        navigation.navigate('Storage', { newItem: response.data });
      }
      setName('');
      setDescription('');
      setEditMode(false);
      setEditingId(null);
      fetchItems();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to save item.');
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await axiosInstance.delete(`/items/${id}`);
      Alert.alert('Success', 'Item deleted successfully!');
      fetchItems();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to delete item.');
    }
  };

  const handleEditItem = (item: Item) => {
    setName(item.name);
    setDescription(item.description);
    setEditMode(true);
    setEditingId(item._id);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.actionButtons}>
          <Pressable style={styles.iconButton} onPress={() => handleEditItem(item)}>
            <AntDesign name="edit" size={20} color="#C3B091" />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => handleDeleteItem(item._id)}>
            <AntDesign name="delete" size={20} color="#FF6347" />
          </Pressable>
        </View>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Your Items</Text>
      <Text style={styles.subtitle}>{editMode ? 'Edit the selected item' : 'Add new items or view existing ones'}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#B8A398"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#B8A398"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Pressable style={styles.addButton} onPress={handleAddOrUpdateItem}>
        <Text style={styles.addButtonText}>{editMode ? 'Update Item' : 'Add Item'}</Text>
      </Pressable>

      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={fetchItems}
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
    marginBottom: 10,
    textAlign: 'center',
    color: '#DAB88B',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#8B7E74',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#DAB88B',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#5C5346',
  },
  addButton: {
    backgroundColor: '#DAB88B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C5346',
  },
  itemDescription: {
    fontSize: 14,
    color: '#8B7E74',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 5,
  },
});

export default CRUDScreen;
