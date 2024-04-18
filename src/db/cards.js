import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("eraseunavez.db");

export const createCardsTable = () => {
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE IF EXISTS Cards;");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
      [],
      (_, result) => console.log("Table created successfully"),
      (_, error) => {
        console.error(error);
        return true;
      }
    );
  });
};

export const addCard = (name) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Cards (name) values (?);",
      [name],
      (_, result) => console.log("Card inserted successfully"),
      (_, error) => {
        console.error(error);
        return true;
      }
    );
  });
};

export const getCards = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Cards;",
        [],
        (_, { rows: { _array } }) => resolve(_array), // Resolve the promise with the cards
        (_, error) => {
          console.error(error);
          reject(error); // Reject the promise with the error
          return true; // Return true to roll back transaction
        }
      );
    });
  });
};

export const getCardsName = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM Cards;",
        [],
        (_, { rows: { _array } }) => resolve(_array.map((item) => item.name)), // Resolve the promise with the card names
        (_, error) => {
          console.error(error);
          reject(error); // Reject the promise with the error
          return true; // Return true to roll back transaction
        }
      );
    });
  });
};
