import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { deleteCard, updateCardName } from "../db/cards";

const { width, height } = Dimensions.get("screen");

const EditCard = ({
  isEditing,
  setIsEditing,
  card,
  cardsUpdated,
  setCardsUpdated,
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(card);
  }, [card]);

  const deleteCardFromDB = async () => {
    await deleteCard(card);
    setIsEditing(!isEditing);
    setCardsUpdated(!cardsUpdated);
  };

  const updateCardNameFromDB = async () => {
    await updateCardName(card, text);
    setIsEditing(!isEditing);
    setCardsUpdated(!cardsUpdated);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isEditing}
      onRequestClose={!isEditing}
    >
      <View style={styles.ModalStyle}>
        <View style={styles.ModalContent}>
          <Text style={styles.titleText}>EDITAR CARTA</Text>
          <View style={{alignItems: 'center'}}>
            <TextField card={card} setText={setText} style={styles.nameText} />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => updateCardNameFromDB()}
              style={[styles.button, { backgroundColor: "#FAE193" }]}
            >
              <Text style={styles.textButton}>ACTUALIZAR</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => deleteCardFromDB()}
              style={[styles.button, { backgroundColor: "#FAE193" }]}
            >
              <Text style={styles.textButton}>ELIMINAR</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              style={[styles.button, { backgroundColor: "#90D2E8" }]}
            >
              <Text style={styles.textButton}>CERRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const TextField = ({ card, setText }) => {
  return (
    <TextInput placeholder={card} onChangeText={setText} style={styles.text} />
  );
};

export default EditCard;

const styles = StyleSheet.create({
  ModalStyle: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(1, 120, 400, 0.1)",
  },
  ModalContent: {
    width: width / 1.5,
    height: height / 1.9,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 100,
  },
  button: {
    alignItems: "center",
    padding: 5,
    borderRadius: 4,
    marginTop: 60,
    backgroundColor: "red",
    width: width / 3,
  },
  titleText: {
    textAlign: "center",
    letterSpacing: 1.5,
    padding: 20,
  },
  text: {
    width: 200,
    fontSize: 20,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    letterSpacing: 1.5,
    fontWeight: "bold",
    padding: 10,
  },
  textButton: {
    fontWeight: "300",
    letterSpacing: 1,
  },
});
