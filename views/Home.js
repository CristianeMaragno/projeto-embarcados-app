import { Button, IconButton, MD3Colors, Card, Text} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {

	return(
		<View style={styles.container}>
			<Button icon="eye" style={styles.button} mode="contained" onPress={() => navigation.navigate('FeedersList')}>
				Alimentadores
			</Button>

			<Button icon="history" style={styles.button} mode="contained" onPress={() => navigation.navigate('ActionsList')}>
				Histórico
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
	},

	button: {
		width: '100%',
		marginVertical: 10,
	}
})