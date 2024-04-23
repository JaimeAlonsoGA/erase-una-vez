import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createCardsTable, addCard, getCards } from "./src/db/cards";

import Main from "./screens/Main";
import Rules from "./screens/Rules";
import Extra from "./screens/Extra";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { setTotalDeckCard } from "./src/components/setCards";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    createCardsTable();
    setTotalDeckCard();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Extra" component={Extra} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
