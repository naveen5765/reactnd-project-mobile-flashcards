import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import TextButton from './TextButton'
import { deleteDeck } from '../actions'
import { removeDeckInPhoneStorage } from '../utils/api'
import { white, gray, black, purple } from '../utils/colors'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title
    }
  }

  addCard = (title) => {
    this.props.navigation.navigate('AddCard', {title: title})
  }

  startQuiz = (title, questions) => {
    this.props.navigation.navigate('Quiz', {title: title, questions: questions})
  }

  deleteDeck = (title) => {
    this.props.navigation.goBack()
    this.props.deleteDeck(title)
    removeDeckInPhoneStorage(title)
  }

  render() {
    const { deck } = this.props;
    
    if(deck !== undefined) {
      const { title, questions } = deck

      return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cardCount}>
            {`${questions.length} cards`}
          </Text>
          <TextButton 
            style={{backgroundColor: white, color: black}}
            onPress={() => this.addCard(title)}>
            <Text>Add Card</Text>
          </TextButton>
          {
            questions.length > 0
            ? <TextButton 
                style={{backgroundColor: black, color: white}}
                onPress={() => this.startQuiz(title, questions)}>
                <Text>Start Quiz</Text>
              </TextButton>
            : null
          }
          <TextButton 
            style={{backgroundColor: purple, color: white}}
            onPress={() => this.deleteDeck(title)}>
            <Text>Delete Deck</Text>
          </TextButton>
        </View>
      )
    }else{
      return (
        <View>
          <Text>There seems to be an issue in loading the Deck. Please try again</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    marginBottom: 6,
    marginTop: 180
  },
  cardCount: {
    fontSize: 20,
    color: gray,
    textAlign: 'center',
    marginBottom: 100
  }
})

const mapStateToProps = (decks, { navigation }) => ({
  deck: decks[navigation.getParam('title')],
  decks
});

const mapDispatchToProps = dispatch => ({
  deleteDeck: (deckName) => dispatch(deleteDeck(deckName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
