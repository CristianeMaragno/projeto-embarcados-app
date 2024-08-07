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
      const uri = `http://192.168.1.6:3000`;
      const uriComplete = uri + '/logging/list';
      const response = await axios.get(uriComplete);
      setActions(response.data.actions);
    } catch (error) {
      console.error('Error fetching actions:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>Horário: {item.feedingTime}</Text>
      <Text style={styles.subtitle}>ID do alimentador: {item.feederId}</Text>
      <Text style={styles.subtitle}>Leitura do sensor: {item.sensorReading}</Text>
      <Text style={styles.subtitle}>Situação: {item.message}</Text>
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

export default ActionsListScreen;