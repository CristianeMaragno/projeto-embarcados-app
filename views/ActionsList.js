// ActionsListScreen.js
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ActionsListScreen = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/logging/list');
      setActions(response.data.actions);
    } catch (error) {
      console.error('Error fetching actions:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>Feeding Time: {item.feedingTime}</Text>
      <Text style={styles.subtitle}>Feeder ID: {item.feederId}</Text>
      <Text style={styles.subtitle}>Sensor Reading: {item.sensorReading}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={actions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});