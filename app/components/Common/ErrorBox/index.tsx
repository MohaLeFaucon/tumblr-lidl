import * as React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

interface Props {
  errorMessage: string
  containerStyle?: StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DA595A',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
})

const ErrorBox = ({ errorMessage, containerStyle }: Props) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={styles.text}>{errorMessage}</Text>
  </View>
)

export default ErrorBox
