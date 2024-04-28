import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Main from "./screens/Main";
import Rules from "./screens/Rules";
import Extra from "./screens/Extra";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContextProvider } from "./src/db/context";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Rules" component={Rules} />
          <Stack.Screen
            name="Main"
            component={Main}
            // initialParams={{ myDeckCards, setMyDeckCards }}
          />
          <Stack.Screen name="Extra" component={Extra} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
