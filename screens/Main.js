import {
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useFonts, PoorStory_400Regular } from "@expo-google-fonts/poor-story";

import background from "../assets/media/background.png";
import Swiper from "react-native-deck-swiper";
import { getCardsName, getCards } from "../src/db/cards";
import { setPersonalDeck } from "../src/components/setCards";

import florIcon from "../assets/media/florIcon.png";
import Bubble from "../src/components/bubble";

const { width, height } = Dimensions.get("screen");

const Main = () => {
  const navigation = useNavigation();
  // useFonts({ PoorStory_400Regular });

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
        <View style={styles.swiperContainer}>
          <SwiperComponent />
          <Bubble />
        </View>
      </ImageBackground>
    </View>
  );
};

const SwiperComponent = () => {
  const [cards, setCards] = useState(setPersonalDeck());
  const [key, setKey] = useState(0);

  // useEffect(() => {
  //   getCardsName()
  //     .then((names) => {
  //       setCards(names);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const onSwiped = (index) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const swipedCard = newCards.splice(index, 1);
      newCards.push(swipedCard[0]);
      return newCards;
    });
    setKey((prevKey) => prevKey + 1); // increment key to force re-render
  };

  //SOLUCIONAR EL DESCARTAR CARTAS ONSWIPEBOTTOM
  const onDiscard = () => {
    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards.splice(0, 1);
        return newCards;
      });
      setKey((prevKey) => prevKey + 1); // increment key to force re-render
    }, 0);
  };

  return (
    <Swiper
      key={key}
      cards={cards}
      renderCard={(card) => {
        return (
          <View style={styles.card}>
            <LinearGradient
              colors={["#ADD8E6", "#1E90FF"]}
              style={styles.linearGradient}
            >
              <Text style={styles.text}>{card}</Text>
            </LinearGradient>
          </View>
        );
      }}
      onSwiped={onSwiped}
      onSwipedBottom={onDiscard}
      // backgroundColor={"white"}
      stackSize={3}
      backgroundColor="transparent"
      cardVerticalMargin={160}
      cardHorizontalMargin={60}
    ></Swiper>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  background: {
    width: width,
    height: height,
  },
  settingsIcon: {
    resizeMode: "contain",
    width: 100,
  },
  settingsContainer: {
    position: "absolute",
    padding: 20,
    zIndex: 1,
  },
  swiperContainer: {
    alignItems: "center",
  },
  card: {
    flex: 1,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#FAE193",
    justifyContent: "center",
    backgroundColor: "#90D2E8",
  },
  // cardTexture: {
  //   // width: 236,
  //   // height: 440,
  //   width: width / 1.52,
  //   height: height,
  //   // marginVertical: 160,
  //   // marginHorizontal: 60,
  //   // marginRight: 400,
  //   justifyContent: "center",
  // },
  text: {
    textAlign: "center",
    fontSize: 30,
    backgroundColor: "transparent",
    // fontFamily: "PoorStory_400Regular",
    letterSpacing: 1.5
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 4,
  },
});
