import {
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
import ruleContainer from "../assets/media/ruleContainer.png";
import florIcon from "../assets/media/florIcon.png";
import { useNavigation } from "@react-navigation/native";
import { RULES_TEXT } from "../src/components/rules";

const { width, height } = Dimensions.get("screen");

const Rules = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.background}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={styles.settingsContainer}
        >
          <Image source={florIcon} style={styles.settingsIcon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.alertText}>
            Este juego requiere que todos los participantes se instalen la
            aplicación*
          </Text>
        </View>
        <View style={styles.rulesContainer}>
          <Text style={styles.rules}>Aquí van las reglas del juego</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Extra")}
          style={styles.extraContainer}
        >
          <Image source={florIcon} style={styles.extraIcon} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Rules;

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
  rules: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    padding: 4,
    margin: 15,
    marginTop: 120,
    letterSpacing: 1.5,
  },
  alertText: {
    position: "absolute",
    marginLeft: 140,
    marginTop: 60,
    letterSpacing: 1.5,
  },
  rulesContainer: {
    width: width,
    height: height,
    justifyContent: "center",
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
  extraContainer: {
    position: "absolute",
    marginLeft: width / 1.5,
    marginTop: height / 1.2,
    zIndex: 1,
  },
  extraIcon: {
    resizeMode: "contain",
    width: 100,
  }
});
