// FeederConfig.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button} from 'react-native-paper';
import axios from 'axios';

const ConfigurationsDetailsScreen = ({ route, navigation }) => {
  const { feederId } = route.params;
  const [config, setConfig] = useState({ height: '', timeInterval: '' });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const uri = `http://192.168.1.6:3000`;
      const uriComplete = uri + `/controller/config/${feederId}`;
      const response = await axios.get(uriComplete);
      setConfig(response.data.config);
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const updateConfig = async () => {
    try {
      const uri = `http://192.168.1.6:3000`;
      const uriComplete = uri + '/controller/config/update';
      await axios.put(uriComplete, config);
      Alert.alert('Sucesso', 'Configuração atualizada');
    } catch (error) {
      console.error('Error updating:', error);
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
      <Button icon="pen" style={styles.button} mode="contained" 
				onPress={updateConfig}>
				Atualizar config
			</Button>
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
  button: {
		width: '100%',
		marginVertical: 10,
	}
});

export default ConfigurationsDetailsScreen;
