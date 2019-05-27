import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, black } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={[styles.label, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    width: 250,
    padding: 20,
    fontSize: 20
  },
  btn: {
    marginTop: 5,
    borderRadius: 5,
    borderColor: black,
    borderWidth: 2,
  }
})