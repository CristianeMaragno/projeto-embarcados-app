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
		const response = await axios.get('http://localhost:3000/controller/feeder/list');
		setFeeders(response.data.feeders);
	  } catch (error) {
		console.error('Error fetching feeders:', error);
	  }
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
		  	<Text style={styles.title}>{item.name}</Text>
		  	<Text style={styles.subtitle}>{item.location}</Text>
		  	<Button
				title="Config"
				onPress={() => navigation.navigate('ConfigurationsDetails', { feederId: item.id })}
			/>
		</View>
	);

	//On click, update
	//Create new feede
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
});