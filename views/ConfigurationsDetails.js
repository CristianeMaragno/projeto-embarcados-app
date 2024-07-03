// FeederConfig.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const ConfigurationsDetailsScreen = ({ route, navigation }) => {
  const { feederId } = route.params;
  const [config, setConfig] = useState({ height: '', timeInterval: '' });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/controller/config/${feederId}`);
      setConfig(response.data.config);
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const updateConfig = async () => {
    try {
      await axios.put('http://localhost:3000/controller/config/update', config);
      Alert.alert('Success', 'Configuration updated successfully');
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Height</Text>
      <TextInput
        style={styles.input}
        value={String(config.height)}
        onChangeText={(text) => setConfig({ ...config, height: Number(text) })}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Time Interval</Text>
      <TextInput
        style={styles.input}
        value={String(config.timeInterval)}
        onChangeText={(text) => setConfig({ ...config, timeInterval: Number(text) })}
        keyboardType="numeric"
      />
      <Button title="Atualizar config" onPress={updateConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});

export default ConfigurationsDetailsScreen;
