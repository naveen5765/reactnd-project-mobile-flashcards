import React, {Component} from 'react'
import { connect } from "react-redux";
import { Text, View, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native'
import TextButton from  './TextButton'
import { white, gray, black } from '../utils/colors'
import { createCard } from '../actions'
import { saveCardInPhoneStorage } from '../utils/api'
import Toast from 'react-native-root-toast';

class AddCard extends Component {
  static navigationOptions = () => ({
    title: "Add Card"
  });

  state = {
    question: '',
    answer: ''
  }

  createCard = () => {
    const { title } = this.props.navigation.state.params
    const { question, answer} = this.state
    if(question.trim() === ''|| answer.trim() === ''){
      Toast.show('Please do not leave Question and Answer empty', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
      return
    }
    this.props.createCard(title, question, answer)
    saveCardInPhoneStorage(title, question, answer)
    this.props.navigation.goBack()
    this.setState({
      question: '',
      answer: ''
    })

  }

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={{margin: 20}}>
          <Text style={styles.label}>What's the question?</Text>
          <TextInput
            style={styles.input}
            value={question}
            placeholder="e.g. What is a Component?"
            onChangeText={question => this.setState({ question })}
          />
        </View>
        <View style={{margin: 20}}>
          <Text style={styles.label}>What's the answer?</Text>
          <TextInput
            style={styles.input}
            value={answer}
            placeholder="e.g. Component lets the UI split into independent, resuable pieces"
            onChangeText={answer => this.setState({ answer })}
          />
        </View>
        <TextButton 
          style={{backgroundColor: black, color: white}}
          onPress={this.createCard}>
          <Text>Create Card</Text>
        </TextButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 100
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    backgroundColor: white,
    width: 350,
    fontSize: 20,
    height: 50,
    padding: 10,
    borderRadius: 1,
    borderColor: gray,
    borderWidth: 1,
    margin: 20
  }
});

const mapDispatchToProps = (dispatch) => ({
  createCard: (deckName, question, answer) =>
    dispatch(createCard(deckName, question, answer))
});

export default connect(null, mapDispatchToProps)(AddCard)
