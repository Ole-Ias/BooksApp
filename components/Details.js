import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, ScrollView, Button, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import { userStore } from './UserReducer';
import styles from './Styles';


initializeApp(firebaseConfig);
const database = getDatabase();

export default function Details({ route }) {

    const { link } = route.params;
    const [bookDetails, setBookDetails] = useState({});
    const [imageLink, setImageLink] = useState({});
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const [description, setDescription] = useState('');
    const [authors, setAuthors] = useState([]);
    const [favorites, setFavorites] = useState('read')
    const [exists, setExists] = useState(false);
    const [uid, setUid] = useState('');

    useEffect(() => {
        setUid(userStore.getState());
    }, []);

    // Fetch book from API and set data
    useEffect(() => {
        fetch(`${link}?key=AIzaSyAV52gUYYvzjzUaN5dZLcP4bAYPxQS5hQU`)
            .then(response => response.json())
            .then(data => {
                setBookDetails(data.volumeInfo);
                setImageLink(data.volumeInfo.imageLinks)
                setAuthors(data.volumeInfo.authors.join(' & '));
                if (data.volumeInfo.description) {
                    setDescription(data.volumeInfo.description.replace(/\<[^>]*>?/gm, '').replace(/\&quot;/gm, ''))
                }
            })
            .catch((e) => console.error(e))
    }, []);

     // Wait for checkBook to finish and then add book if it's not in database
     const addBook = async () => {
        await checkBook();
        if (exists === false) {
            push(ref(database, uid + '/' + favorites + '/'), {
                bookDetails
            });
            Alert.alert('Book has been added');
        } else {
            Alert.alert('Book is already in Favorites');
        }
    };

    // Check if book is in database and setExist to true or false
    const checkBook = async () => {
        const readRef = ref(database, uid + '/' + favorites + '/');
        onValue(readRef, (snapshot) => {
            snapshot.forEach((childSnap) => {
                if (childSnap.val().bookDetails.title === bookDetails.title) {
                    setExists(true);
                } else {
                    setExists(false);
                }
            })
        })
    }




    return (
     
        <View style={styles.detailsContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailsContainer}>
                <Image
                    style={styles.detailsBookImage}
                    source={{ uri: imageLink && imageLink.smallThumbnail }}
                />
                <Text style={styles.detailsTitle}>{bookDetails.title}</Text>
                <Text style={styles.detailsAuthor}>Author: {authors}</Text>
                <Text > Released: {bookDetails.publishedDate} </Text>
                <View style={styles.button}>
                    <Button
                        selectedValue={favorites}
                        onValueChange={(itemValue, itemIndex) =>
                            setFavorites(itemValue)}
                        onPress={addBook}
                        color='rgb(204, 204, 255)'
                        title='Add to Favorites'
                    />
                </View>
                <Text style={styles.detailsHeader}>Book description</Text>
                    <Text style={styles.detailsDescription}>{description}</Text>
                </View>
            </ScrollView>
        </View >

    );
}