import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Card from './Card'
import { white, gray, green, red, purple, black } from '../utils/colors'
import TextButton from './TextButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title
    }
  }

  state = {
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    showResult: false
  }

  recordAnswer = (isCorrectAnswer) => {
    let { showResult, correctAnswerCount, currentQuestionIndex } = this.state
    const { questions } = this.props.navigation.state.params

    if(isCorrectAnswer){
      correctAnswerCount ++
    }

    if(questions.length === currentQuestionIndex + 1)
      showResult = true
    else 
      currentQuestionIndex ++
    
      this.setState({
        showResult,
        currentQuestionIndex,
        correctAnswerCount
      })
  }

  restartQuiz = () => {
    this.setState({
      currentQuestionIndex: 0,
      correctAnswerCount: 0,
      showResult: false
    })
  }

  render() {
    const { showResult, correctAnswerCount, currentQuestionIndex } = this.state
    const { questions } = this.props.navigation.state.params

    return (
      showResult
      ? <View style={styles.resultContainer}>
          <Text style={styles.resultHeader}>You scored</Text>
          <Text style={styles.result}>
            {`${Math.round((correctAnswerCount * 100) / (questions.length))} %`}
          </Text>
          <TextButton 
                style={{backgroundColor: purple, color: white}}
                onPress={this.restartQuiz}>
                <Text>Restart Quiz</Text>
          </TextButton>
          <TextButton 
                style={{backgroundColor: white, color: black}}
                onPress={() => this.props.navigation.goBack()}>
                <Text>Back to Deck</Text>
          </TextButton>
        </View>
      : 
      <View style={{flex: 1}}>
          <View style={styles.indexConatiner}>
            <Text style={styles.count}>{currentQuestionIndex + 1} / {questions.length}</Text>
          </View>
          <View style={styles.cardContainer}>
            <Card card={questions[currentQuestionIndex]}/>
            <View style={styles.actions}>
              <TextButton 
                style={{backgroundColor: green, color: white}}
                onPress={() => this.recordAnswer(true)}>
                <Text>Correct</Text>
              </TextButton>
              <TextButton 
                style={{backgroundColor: red, color: white}}
                onPress={() => this.recordAnswer(false)}>
                <Text>Incorrect</Text>
              </TextButton>
            </View>
          </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: white,
    padding: 10
  },
  count: {
    color: gray,
    fontSize: 20,
    marginTop: 10
  },
  indexConatiner: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 5,
    marginLeft: 10
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  result: {
    fontSize: 70,
    color: purple,
    textAlign: "center"
  }
})

export default Quiz
