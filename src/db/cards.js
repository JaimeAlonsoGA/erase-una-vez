import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("eraseunavez.db");

export const createCardsTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
        [],
        (_, result) => {
          console.log("Table created successfully");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const createUsersTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users (userId INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT);",
        [],
        (_, result) => {
          console.log("Users table created successfully");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const createCardUserTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS CardUser (userId INTEGER, cardId INTEGER, FOREIGN KEY(userId) REFERENCES Users(userId), FOREIGN KEY(cardId) REFERENCES Cards(id));",
        [],
        (_, result) => {
          console.log("CardUser table created successfully");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const addCard = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Cards (name) values (?);",
        [name],
        (_, result) => {
          console.log("Card", name, "inserted successfully");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
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

export const getRandomCard = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Cards ORDER BY RANDOM() LIMIT 1;", // Order the cards randomly and limit the result to 1
        [],
        (_, { rows: { _array } }) => resolve(_array[0]), // Resolve the promise with the random card
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

export const createUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Users (username) VALUES (?);",
        [`User_${Date.now()}`], // Generate a unique username based on the current timestamp
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const initializeCards = (cards) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      for (let card of cards) {
        tx.executeSql(
          "INSERT INTO Cards (name) VALUES (?);",
          [card],
          (_, result) => {
            console.log("Card", card, "added successfully.");
          },
          (_, error) => {
            console.error(error);
            reject(error);
            return true;
          }
        );
      }
      resolve();
    });
  });
};

export const initializeUserCards = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get all cards
      const cards = await getCards();

      // Shuffle the array of cards
      const shuffledCards = shuffleArray(cards);

      // Add the first 10 cards to the user's deck
      for (let i = 0; i < 10; i++) {
        await addCardToUserDeck(userId, shuffledCards[i].id);
      }

      console.log("10 random cards added to user's deck successfully");
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const getUserCards = (userId) => {
  return new Promise((resolve, reject) => {
    let userCards = [];
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT Cards.* FROM Cards JOIN CardUser ON Cards.id = CardUser.cardId WHERE CardUser.userId = ?;",
        [userId],
        (_, { rows }) => {
          for (let i = 0; i < rows.length; i++) {
            userCards.push(rows.item(i));
          }
          resolve(userCards);
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const addCardToUserDeck = (userId, cardId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO CardUser (userId, cardId) VALUES (?, ?);",
        [userId, cardId],
        (_, result) => {
          //console.log("Card added to user deck successfully");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const removeCardFromUserDeck = (userId, cardId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM CardUser WHERE userId = ? AND cardId = ?;",
        [userId, cardId],
        (_, result) => {
          console.log("Card removed from user deck successfully");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const insertCards = (cards) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      cards.forEach((card) => {
        tx.executeSql(
          "INSERT INTO Cards (name) VALUES (?);",
          [card.name],
          (_, result) => {
            console.log("Card inserted successfully");
          },
          (_, error) => {
            console.error(error);
            reject(error);
            return true;
          }
        );
      });
      resolve();
    });
  });
};

export const updateCardName = (oldName, newName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Cards SET name = ? WHERE name = ?;",
        [newName, oldName],
        (_, result) => {
          console.log("Card", oldName, "updated successfully to", newName);
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const deleteCard = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Cards WHERE name = ?;",
        [name],
        (_, result) => {
          console.log("Card", name, "deleted successfully");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const resetCards = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Cards;",
        [],
        (_, result) => {
          console.log("All cards have been deleted.");
          resolve();
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const shuffleArray = (array) => {
  //The Fisher-Yates shuffle algorithm works by iterating over the array
  //from the last element to the first, and for each element,
  //swapping it with an element at a random index that is less than or equal to the current index.
  //This ensures that every permutation of the array is equally likely.
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
