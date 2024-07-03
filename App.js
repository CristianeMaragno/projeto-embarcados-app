import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from './views/Home';
import FeedersListScreen from './views/FeedersList';
import ConfigurationsDetailsScreen from './views/ConfigurationsDetails';
import ActionsListScreen from './views/ActionsList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ title: 'Home' }} component={HomeScreen} />
          <Stack.Screen name="FeedersList" options={{ title: 'Alimentadores' }} component={FeedersListScreen} />
          <Stack.Screen name="ConfigurationsDetails" options={{ title: 'Configurações' }} component={ConfigurationsDetailsScreen} />
          <Stack.Screen name="ActionsList" options={{ title: 'Histórico' }} component={ActionsListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
