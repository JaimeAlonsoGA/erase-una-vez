import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import background from "../assets/media/background.png";
import florIcon from "../assets/media/florIcon.png";
import { addCard, getCardsName } from "../src/db/cards";
import EditCard from "../src/components/editCard";

const { width, height } = Dimensions.get("screen");

const Extra = () => {
  const [cards, setCards] = useState([]);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardsUpdated, setCardsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const getCardsDeck = async () => {
      setIsLoading(true);
      const cardsFromDB = await getCardsName();
      setCards(cardsFromDB);
      setIsLoading(false);
    };

    getCardsDeck();
    console.log("Cartas actualizadas!");
  }, [cardsUpdated]);

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Rules")}
          style={styles.settingsContainer}
        >
          <Image source={florIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
        <CardDeck
          cards={cards}
          setText={setText}
          setIsEditing={setIsEditing}
          setSelectedCard={setSelectedCard}
          isLoading={isLoading}
        />
        <ModifyDeck
          cards={cards}
          setCards={setCards}
          text={text}
          setText={setText}
        />
        {isEditing && (
          <EditCard
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            cardsUpdated={cardsUpdated}
            setCardsUpdated={setCardsUpdated}
            card={selectedCard}
          />
        )}
      </ImageBackground>
    </View>
  );
};

const CardDeck = ({
  cards,
  setText,
  setIsEditing,
  setSelectedCard,
  isLoading,
}) => {
  return (
    <View style={styles.cardsContainer}>
      <Text style={styles.card}>Todas las cartas de la baraja</Text>
      <ScrollView
        style={styles.cardsScrollView}
        showsVerticalScrollIndicator={false}
      >
        <Cards
          cards={cards}
          setText={setText}
          setIsEditing={setIsEditing}
          setSelectedCard={setSelectedCard}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#00ff00" style={styles.load} />
        ) : null}
      </ScrollView>
    </View>
  );
};

const Cards = ({ cards, setIsEditing, setSelectedCard }) =>
  cards.map((card, key) => (
    <View key={key}>
      <TouchableOpacity
        onPress={() => {
          setSelectedCard(card);
          setIsEditing(true);
        }}
      >
        <Text style={styles.card}>{card}</Text>
      </TouchableOpacity>
    </View>
  ));

const ModifyDeck = ({ cards, setCards, text, setText }) => {
  const handleSubmit = () => {
    setCards((prevCards) => [...prevCards, text]);
    cards.push(text);
    addCard(text);
    setText("");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.card}>Añade tus propias cartas</Text>
      <TextInput style={styles.input} onChangeText={setText} value={text} />
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Añadir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Extra;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  settingsContainer: {
    position: "absolute",
    padding: 20,
    zIndex: 1,
  },
  settingsIcon: {
    resizeMode: "contain",
    width: 100,
  },
  cardsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height / 4,
  },
  cardsScrollView: {
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    width: 150,
    height: 200,
  },
  card: {
    color: "white",
    padding: 12.5,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  form: {
    marginTop: 50,
  },
  form: {
    alignItems: "center",
  },
  input: {
    textAlign: "center",
    height: 40,
    width: width / 2,
    borderColor: "gray",
    borderWidth: 1,
  },
  addButton: {
    padding: 20,
    marginTop: 10,
    backgroundColor: "rgba(150, 221, 234, 1)",
    borderRadius: 8,
  },
  buttonText: {
    color: "grey",
    textAlign: "center",
    letterSpacing: 1.5,
    fontSize: 12,
  },
  load: {
    marginTop: 80,
  },
});
