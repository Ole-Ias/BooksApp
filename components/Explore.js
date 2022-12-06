import React, { useState } from 'react';
import { TextInput, Text, View, Button, FlatList, Image, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';

export default function Explore ({ navigation }){

const [keyword, setKeyword] = useState('');
const [data, setData] = useState([]);
const [resultAmount, setResultAmount] = useState('');


const fetchBooks = () => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40&key=AIzaSyAV52gUYYvzjzUaN5dZLcP4bAYPxQS5hQU`)
  .then(response => response.json())
  .then(data => {
    setData(data.items);
    const numToString = data.totalItems.toString();
            setResultAmount(numToString + ' results for "' + keyword + '"');
          })
  .catch((err) => {
      console.error('Error', err);
        });
}


const renderItem= ({item}) => (
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
      <Text style={styles.author}>{item.volumeInfo.authors}</Text>
  </View>
</View>
)

const renderListHeader = () => (
  <View>
    <Text style={{ color: 'grey', marginVertical: 10 }}>{data === '' ? '' : resultAmount}</Text>
  </View>
)

return (
  <View style={styles.container}>
    <View style={styles.textInput}>
    <TextInput
      style={styles.textInputInside}
      placeholder='Name'
      onChangeText={text => setKeyword(text)}
    />
    </View>
    <View style={styles.button}>
    <Button
      color="rgb(204, 204, 255)"
      title = 'Search'
      onPress={fetchBooks}
    />
    </View>
    <FlatList
      ListHeaderComponent={renderListHeader}
      data = {data}
      style={{ marginLeft: "5%" }}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  </View>
);
}
