import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, Image, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import { userStore } from './UserReducer';
import styles from './Styles';

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

export default function Favorites() {

  const [items, setItems] = useState([]);
  const [uid, setUid] = useState('');

  // Get userId from UserStore and set it
  useEffect(() => {
    setUid(userStore.getState());
  }, []);

  // Get and set books from database
  useEffect(() => {
    const itemsRef = ref(database, uid + '/read/')
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setItems([])
      } else {
        setItems(Object.values(data));
      }
    })
  },[uid]);

  // Removes one book from database
  const deleteItem = (bookDetails) => {
    Alert.alert(
      'Deleting book from favorites',
      'Are you sure?',
      [
        { text: 'NO', onPress: () => console.log("Cancel Pressed"), style: 'cancel' },
        {
          text: 'YES', onPress: () => {
            const readRef = ref(database, uid + '/read/');
            onValue(readRef, (snapshot) => {
              snapshot.forEach((childSnap) => {
                if (childSnap.val().bookDetails.title === bookDetails.title) {
                  const deleteRef = ref(database, uid + '/read/' + childSnap.key);
                  remove(deleteRef);
                }
              })
            })
          }
        },
      ]
    )
  }

 
  // Flatlist content
  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <View>
        <Image
          style={styles.bookImage}
          source={{ uri: item.bookDetails.imageLinks && item.bookDetails.imageLinks.smallThumbnail }}
        />
      </View>
      <View>
        <Text style={styles.title}>{item.bookDetails.title}</Text>
        <Text style={styles.author}>by {item.bookDetails.authors.join(' & ')}</Text>
        <View style={styles.favButton}>
          <Button onPress={() => deleteItem(item.bookDetails)}
            color="rgb(204, 204, 255)"
            title="Delete Book"
          />
        </View>
      </View>
    </View>
  )


  // Rendered if flatlist is empty
  const renderEmptyContainer = () => (
    <View style={styles.container}>
      <Text style={styles.emptyTitle}>Nothing has been added yet!</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={items}
        ListEmptyComponent={renderEmptyContainer()}
      />
    </View>
  );
}
