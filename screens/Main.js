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
import React from "react";
import background from "../assets/media/background.png";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
// import cardTexture from "../assets/media/cardTexture.png";
import florIcon from "../assets/media/florIcon.png";

const { width, height } = Dimensions.get("screen");

const Main = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <TouchableOpacity style={styles.settingsContainer}>
          <Image source={florIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
        <View style={styles.swiperContainer}>
          <SwiperComponent />
        </View>
      </ImageBackground>
    </View>
  );
};

const SwiperComponent = () => {
  return (
    <Swiper
      cards={[
        "MAGO",
        "CHOZA",
        "VIENTO",
        "RANA",
        "RON",
        "FIESTA",
        "ESTRELLA FUGAZ",
        "HOJAS",
      ]}
      renderCard={(card) => {
        return (
          <View style={styles.card}>
            <LinearGradient
              colors={['#AEC6CF', '#B39EB5', '#FFB1B9']}
              style={styles.linearGradient}
            >
              {/* <ImageBackground
              source={cardTexture}
              resizeMode="contain"
              style={styles.cardTexture}
            > */}
              <Text style={styles.text}>{card}</Text>
            </LinearGradient>
          </View>
        );
      }}
      onSwiped={(cardIndex) => {
        console.log(cardIndex);
      }}
      onSwipedAll={() => {
        console.log("onSwipedAll");
      }}
      cardIndex={0}
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
    borderRadius: 2,
    borderWidth: 2,
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
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 2,
  },
});
