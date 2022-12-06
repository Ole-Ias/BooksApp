import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from "./components/HomeScreen"; 
import Explore from "./components/Explore"; 
import Details from "./components/Details"; 
import Favorites from "./components/Favorites"; 
import Genre from './components/Genre';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { signIn, store } from './components/SigninReducer';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = 'home-outline';
    } else if (route.name === 'Explore') {
      iconName = 'search-outline';
    } else if (route.name === 'Favorites') {
      iconName = 'heart-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  }
});

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          },
          headerTitle: ""
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          }
        }}
      />
    </Stack.Navigator>
  );
};

const ExploreNav = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Explore} options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          },
          headerRight: () => (
            <Ionicons.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(204, 204, 255)"
              name="log-out-outline"
              size={28}
            />
          ),
        }}/>
      <Stack.Screen name="Details" component={Details} options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          }}}/>
    </Stack.Navigator>
  );
}

const HomeNav = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={HomeScreen} options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          },
          headerRight: () => (
            <Ionicons.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(204, 204, 255)"
              name="log-out-outline"
              size={28}
            />
          ),
        }}/>
      <Stack.Screen name="Genre" component={Genre} options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          }}}/>
      <Stack.Screen name="Details" component={Details} options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          }}}/>
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeNav} options={{
          headerShown: false
        }} />
      <Tab.Screen name="Explore" component={ExploreNav} options={{
          headerShown: false
        }} />
      <Tab.Screen name="Favorites" component={Favorites} options={{
          headerStyle: {
            backgroundColor: 'rgb(204, 204, 255)',
          },
          title: 'Favorites',
          headerRight: () => (
            <Ionicons.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(204, 204, 255)"
              name="log-out-outline"
              size={28}
            />
          ),
        }} />
  </Tab.Navigator>
  );
};

export default function App() {

  const [isSigned, setIsSigned] = useState(false);

  // Update state from redux
  store.subscribe(() => {
    setIsSigned(store.getState());
  })

  return (

    <NavigationContainer>
      {isSigned ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>

  );
}
