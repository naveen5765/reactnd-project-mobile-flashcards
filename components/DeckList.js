import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { retrieveDecks } from "../utils/api";
import { receiveDecks } from '../actions'
import TextButton from './TextButton'

class DeckList extends Component {

  componentDidMount() {
    retrieveDecks()
      .then(decks => this.props.receiveDecks(decks))
  }

  addDeck = () => {
    this.props.navigation.navigate('AddDeck')
  }

  render() {
    const { decks } = this.props

    return (
      Object.values(decks).length > 0 
      ? <View>
          <Text>DeckList</Text>
        </View>
      : <View>
          <Text>You dont have any decks</Text>
          <TextButton style={{margin: 20}} onPress={this.addDeck}>
            Add Deck
          </TextButton>
        </View>
      
    );
  }
}

const mapStateToProps = decks => ({
  decks
});

const mapDispatchToProps = dispatch => ({
  receiveDecks: decks => dispatch(receiveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)