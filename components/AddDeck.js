import React, {Component} from 'react';
import { connect } from "react-redux";
import { Text, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import { createDeck } from '../actions'
import TextButton from './TextButton'
import { white, black } from '../utils/colors';
import { saveDeckInPhoneStorage } from '../utils/api'
import Toast from 'react-native-root-toast';

class AddDeck extends Component {
  state = {
    input: ''
  };
  
  handleInputChange = (input) => {
    this.setState(() => ({
      input
    }));
  }

  createDeck = () => {
    const deckName = this.state.input
    if(deckName.trim() === ''){
      Toast.show('Please do a valid Deck Name', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
      return
    }
    if(this.props.decks.filter(deck => deck.title === deckName).length > 0){
      Toast.show('This Deck Name is already existing, please choose a different name', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
      return
    }
    this.props.createDeck(deckName)
    saveDeckInPhoneStorage(deckName)
    this.props.navigation.navigate('Deck', { title:deckName, questions: [] })
    this.setState({
      input: ''
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.label}>What is the title of your new Deck?</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid='transparent'
          placeholder='Deck Title'
          value={this.state.input}
          onChangeText={this.handleInputChange}
        />
        <TextButton
          style={{backgroundColor: black, color: white}}
          onPress={this.createDeck}>
          <Text>Create</Text>
        </TextButton>        
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    fontSize: 20,
    width: 350,
    height: 50,
    padding: 10,
    margin: 20,
    borderRadius: 5,
    borderColor: black,
    borderWidth: 2,
    backgroundColor: white
  }  
});

const mapStateToProps = (decks) => ({
  decks: decks!== undefined ? Object.values(decks) : {}
});

const mapDispatchToProps = dispatch => ({
  createDeck: (name) => dispatch(createDeck(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)