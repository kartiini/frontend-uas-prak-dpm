import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const features = [
    { id: '1', screen: 'CRUD', icon: 'pluscircle' },
    { id: '2', screen: 'Storage', icon: 'database' },
  ];

  const renderFeature = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() => navigation.navigate(item.screen)}
    >
      <AntDesign name={item.icon} size={32} color="#B78C55" />
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Manage your items and storage seamlessly</Text>

      <FlatList
        data={features}
        renderItem={renderFeature}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.featureList}
      />

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>How to Get Started:</Text>
        <Text style={styles.tipText}>1. Navigate to "Manage Items" to create or edit items.</Text>
        <Text style={styles.tipText}>2. Use "View Storage" to see all stored items.</Text>
        <Text style={styles.tipText}>3. Combine these tools for efficient inventory management.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F4EC',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 225,
    marginBottom: 10,
    textAlign: 'center',
    color: '#B78C55',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#7A6A53',
  },
  featureList: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  featureCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7EAD6',
    borderRadius: 100,
    width: '100%',
    height: '100%',
  },
  tipContainer: {
    marginTop: 40,
    marginBottom: 200,
    backgroundColor: '#F7EAD6',
    padding: 24,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B78C55',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#7A6A53',
    marginBottom: 10,
  },
});

export default HomeScreen;
