import { Button, IconButton, MD3Colors, Card} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';


export default function FeedersList({ navigation }) {
	//get all feeders and put on list with the configs
	const [feeders, setFeeders] = useState([]);

	useEffect(() => {
	  fetchFeeders();
	}, []);
  
	const fetchFeeders = async () => {
	  try {
		const uri = `http://192.168.1.6:3000`;
      	const uriComplete = uri + '/controller/feeder/list';
		const response = await axios.get(uriComplete);
		setFeeders(response.data.feeders);
	  } catch (error) {
		console.error('Error fetching feeders:', error);
	  }
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
		  	<Text style={styles.title}>{item.name}</Text>
		  	<Text style={styles.subtitle}>{item.location}</Text>

			<Button icon="wrench" style={styles.button} mode="contained" 
				onPress={() => navigation.navigate('ConfigurationsDetails', { feederId: item.id })}>
				Configurações
			</Button>
		</View>
	);

	return(
		<View style={styles.container}>
			<FlatList
				data={feeders}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 16,
	},
	itemContainer: {
	  padding: 16,
	  borderBottomWidth: 1,
	  borderBottomColor: '#ccc',
	},
	title: {
	  fontSize: 18,
	  fontWeight: 'bold',
	},
	subtitle: {
	  fontSize: 14,
	  color: '#666',
	},
	button: {
		width: '100%',
		marginVertical: 10,
	}
});