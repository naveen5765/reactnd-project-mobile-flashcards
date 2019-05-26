import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { retrieveDecksFromPhoneStorage } from "../utils/api";
import { receiveDecks } from '../actions'
import { white, gray } from '../utils/colors'
import TextButton from './TextButton'

const DeckSummary = ({ title, questions }) => {
  return (
    <TouchableOpacity style={styles.deckSummaryContainer}>
      <Text style={styles.deckSummaryName}>{title}</Text>
      <Text style={styles.deckSummaryCards}>
        {`${questions.length} cards`}
      </Text>
    </TouchableOpacity>
  )
}

class DeckList extends Component {

  componentDidMount() {
    retrieveDecksFromPhoneStorage()
      .then(decks => this.props.receiveDecks(decks))
  }

  addDeck = () => {
    this.props.navigation.navigate('AddDeck')
  }

  renderItem = ({ item }) => {
    return <DeckSummary {...item}/>
  }

  _keyExtractor = (item) => item.title;

  render() {
    const { decks } = this.props

    return (
      decks.length > 0 
      ? <View style={styles.decksAvailable}>
          <FlatList
            data={decks}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      : <View style={styles.deckNotAvailable}>
          <Text>You dont have any decks</Text>
          <TextButton onPress={this.addDeck}>
            Add Deck
          </TextButton>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  decksAvailable: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start"
  },
  deckNotAvailable: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  },
  deckSummaryContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: white,
    minHeight: 150,
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: gray
  },
  deckSummaryName: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 5
  },
  deckSummaryCards: {
    fontSize: 20,
    textAlign: "center",
    color: gray,
    marginBottom: 5
  }
});

const mapStateToProps = (decks) => ({
  decks: decks!== undefined ? Object.values(decks) : {}
});

const mapDispatchToProps = (dispatch) => ({
  receiveDecks: decks => dispatch(receiveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)