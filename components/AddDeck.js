import React, {Component} from 'react';
import { connect } from "react-redux";
import { Text, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import { createDeck } from '../actions'
import TextButton from './TextButton'
import { white, black } from '../utils/colors';
import { saveDeckInPhoneStorage } from '../utils/api'

class AddDeck extends Component {
  state = {
    input: 'Sample'
  };
  
  handleInputChange = (input) => {
    this.setState(() => ({
      input
    }));
  }

  createDeck = () => {
    this.props.createDeck(this.state.input)
    saveDeckInPhoneStorage(this.state.input)
    this.props.navigation.navigate('Deck')
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
        <TextButton onPress={this.createDeck}>
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

const mapDispatchToProps = dispatch => ({
  createDeck: (name) => dispatch(createDeck(name))
});

export default connect(null, mapDispatchToProps)(AddDeck)