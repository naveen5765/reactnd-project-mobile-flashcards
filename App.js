import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { View, Platform, StatusBar } from 'react-native'
import { Constants } from "expo";
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { setLocalNotification } from './utils/helper'
import reducers from './reducers'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const FlashCardsStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name ='cards' size={30} color={tintColor} />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name ='cards-outline' size={30} color={tintColor} />
      }
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const RootStack = createStackNavigator (
  {
    Home: {
      screen: Tabs,
    },
    Deck: {
      screen: Deck,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    }
  }
)

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor={purple} barStyle="light-content" />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}