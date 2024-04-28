import {
  Animated,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import background from "../assets/media/background.png";
import Swiper from "react-native-deck-swiper";
import { AppContext } from "../src/db/context";

import florIcon from "../assets/media/florIcon.png";
import Bubble from "../src/components/bubble";
import { addCardToUserDeck, getRandomCard } from "../src/db/cards";

const { width, height } = Dimensions.get("screen");

const useIsVisible = (initialState = true) => {
  const { userCards, setUserCards, userId } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(initialState);
  const [textVisible, setTextVisible] = useState(false);

  const toggleIsVisible = () => {
    const randomTimer = Math.random() * (60000 - 10000) + 10000;
    // const randomCardIndex = Math.floor(Math.random() * cards.length);

    setTextVisible((currentTextVisible) => !currentTextVisible);
    setTimeout(() => {
      setTextVisible((currentTextVisible) => !currentTextVisible);
    }, 5000);

    setIsVisible((currentIsVisible) => !currentIsVisible);
    setTimeout(() => {
      setIsVisible((currentIsVisible) => !currentIsVisible);
    }, randomTimer);

    const addCard = async () => {
      const newCard = await getRandomCard();
      console.log(newCard);
      await addCardToUserDeck(userId, newCard);
      await setUserCards((prevCards) => [...prevCards, newCard]);
    };

    addCard();
  };
  return [isVisible, textVisible, toggleIsVisible];
};

const Main = () => {
  const navigation = useNavigation();
  const [isVisible, textVisible, toggleIsVisible] = useIsVisible();
  // useFonts({ PoorStory_400Regular });
  const position = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // useEffect(() => {
  //   const animate = () => {
  //     Animated.parallel([
  //       Animated.timing(position, {
  //         toValue: { x: 0, y: -200 },
  //         duration: 5000,
  //         useNativeDriver: false,
  //       }),
  //       Animated.sequence([
  //         Animated.timing(opacity, {
  //           toValue: 1,
  //           duration: 2000,
  //           useNativeDriver: false,
  //         }),
  //         Animated.timing(opacity, {
  //           toValue: 0,
  //           duration: 2000,
  //           useNativeDriver: false,
  //         }),
  //         Animated.timing(position, {
  //           toValue: { x: 0, y: 0 },
  //           duration: 5000,
  //           useNativeDriver: false,
  //         }),
  //       ]),
  //     ]).start(() => {
  //       animate();
  //     });
  //   };
  //   animate();
  // }, []);

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
          {isVisible && (
            <Bubble style={styles.bubble} toggleIsVisible={toggleIsVisible} />
          )}
        </View>
        {textVisible && (
          <Animated.Text
            style={[
              styles.textVisible,
              {
                transform: position.getTranslateTransform(),
                opacity,
              },
            ]}
          >
            +1 ¡carta añadida a tu baraja!
          </Animated.Text>
        )}
      </ImageBackground>
    </View>
  );
};

const SwiperComponent = () => {
  const { userCards, setUserCards } = useContext(AppContext);
  const [key, setKey] = useState(0);
  const [cardsLength, setCardsLength] = useState(userCards.length);

  const userCardArray = () => {
    return userCards.map((card) => card.name);
  };

  useEffect(() => {
    setCardsLength(userCards.length);
  }, [userCards]);

  const onDiscard = (index) => {
    setUserCards((prevCards) => {
      const newCards = [...prevCards];
      newCards.splice(index, 1); // remove the swiped card
      return newCards;
    });
    setKey((prevKey) => prevKey + 1); // Force a re-render of the Swiper component
  };

  const onSwiped = (index) => {
    setUserCards((prevCards) => {
      const newCards = [...prevCards];
      const swipedCard = newCards.splice(index, 1);
      newCards.push(swipedCard[0]);
      return newCards;
    });
    setKey((prevKey) => prevKey + 1);
    console.log(userCardArray());
  };

  return (
    <Swiper
      key={key}
      cards={userCardArray()}
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
      // onSwipedBottom={onDiscard}
      stackSize={10}
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
    zIndex: 2,
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
  text: {
    textAlign: "center",
    fontSize: 30,
    backgroundColor: "transparent",
    // fontFamily: "PoorStory_400Regular",
    letterSpacing: 1.5,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 4,
  },
  textVisible: {
    color: "white",
    textAlign: "center",
    letterSpacing: 1.5,
    padding: 10,
    position: "absolute",
    bottom: 100,
    fontSize: 20,
  },
  bubble: {
    zIndex: 1,
  },
});
