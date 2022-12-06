import React from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import icons from './icons';
import styles from './Styles';

export default function HomeScreen({ navigation }) {
     // List data
     const list = [
        {
            genre: 'Art',
            icon: icons.art
        },
        {
            genre: 'Historical',
            icon: icons.history
        },
        {
            genre: 'Poetry',
            icon: icons.poetry
        },
        {
            genre: 'Romance',
            icon: icons.romance
        },
        {
            genre: 'Adventure',
            icon: icons.adventure
        },
        {
            genre: 'Fantasy',
            icon: icons.fantasy
        },
        {
            genre: 'Fiction',
            icon: icons.fiction
        },
        {
            genre: 'Crime',
            icon: icons.crime
        },
        {
            genre: 'Thriller',
            icon: icons.thriller
        },
        {
            genre: 'Horror',
            icon: icons.horror
        },  
    ];

  return (
      <ScrollView >
          <View style={styles.homeContainer}>
              <View>
                  {
                      list.map((l, i) => (
                        <ListItem key={i} bottomDivider onPress={() => navigation.navigate('Genre', { category: l.genre })}>
                              <Avatar source={l.icon} size={55} />
                              <ListItem.Content>
                                  <ListItem.Title>{l.genre}</ListItem.Title>
                              </ListItem.Content>
                          </ListItem>
                      ))
                  }
              </View>
          </View>
      </ScrollView>
  );
}
