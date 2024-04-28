import { createContext, useEffect, useState } from "react";
import {
  createCardsTable,
  getUserCards,
  createUser,
  initializeCards,
  addCardToUserDeck,
  initializeUserCards,
  createUsersTable,
  createCardUserTable,
  resetCards,
} from "./cards";
import { cards } from "../components/setCards";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const initializeApp = async () => {
      await createUsersTable();
      await createCardUserTable();
      await createCardsTable();
      const newUserId = await createUser();
      setUserId(newUserId);
      await initializeCards(cards);
      await initializeUserCards(newUserId);
      const userCards = await getUserCards(newUserId);
      setUserCards(userCards);
      //resetCards();
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const updateDeck = async () => {
      for (let card of userCards) {
        await addCardToUserDeck(userId, card.id);
      }
    };

    updateDeck();
  }, [userCards]);

  return (
    <AppContext.Provider value={{ userId, setUserId, userCards, setUserCards }}>
      {children}
    </AppContext.Provider>
  );
};
