import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { white, red } from '../utils/colors'

class Card extends Component {

    state = {
        showQuestion: true
    }

    toggleQuestion = () => {
        this.setState((prevState) => ({
          showQuestion: !prevState.showQuestion
        }))
    }

    render() {
        const { showQuestion } = this.state;
        const { card } = this.props;

        return (
        <View style={styles.container}>
            <View>
            {showQuestion 
            ? <Text style={styles.text}>{card.question}</Text>
            : <Text style={styles.text}>{card.answer}</Text>
            }
            </View>
            <TouchableOpacity 
                style={styles.toggleQuestion}
                onPress={this.toggleQuestion}>
                <Text>
                    {`See ${showQuestion ? "Answer" : "Question"}`}
                </Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        padding: 30,
        width: 350,
        height: 250,
        borderRadius: 5,
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center"
    },
    toggleQuestion: {
        color: red,
        fontSize: 3,
        marginTop: 5,
        alignItems: "center",
    }
})

export default Card
