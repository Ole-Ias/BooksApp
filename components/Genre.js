import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';

export default function Genre({ route, navigation }) {
    const { category } = route.params;
    const [books, setBooks] = useState([]);
    const [resultAmount, setResultAmount] = useState('');

    // Fetch books from API by genre
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=%27%27+subject:${category}&maxResults=40&key=AIzaSyAV52gUYYvzjzUaN5dZLcP4bAYPxQS5hQU`)
            .then(response => response.json())
            .then(data => {
                setBooks(data.items);
                const numToString = data.totalItems.toString();
                setResultAmount(numToString + ' results for "' + category + '"');
            })
            .catch((err) => {
                console.error('Error', err);
            });
    }, [category]);

    // Flatlist content
    const renderItem = ({ item }) => (
        <View style={styles.bookContainer}>
            <View>
                <Image
                    style={styles.bookImage}
                    source = {{uri: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail}}
                />
            </View>
            <View>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Details', { link: item.selfLink })}>
                <Text style={styles.title}>{item.volumeInfo.title}</Text>
            </TouchableNativeFeedback>
                <Text style={styles.author}>{item.volumeInfo.authors === undefined ? 'unknown' : item.volumeInfo.authors.join(' & ')}</Text>
            </View>
        </View >
    )


    // Rendered before flatlist
    const renderListHeader = () => (
        <View>
            <Text style={{ color: 'grey', marginVertical: 10 }}>{books === '' ? '' : resultAmount}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderListHeader}
                style={{ marginLeft: "5%" }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                data={books}
            />
        </View>
    );
}
