import * as React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

interface Props {
  children: React.ReactChild | React.ReactChildren
}

const KeyboardDismiss = ({ children }: Props) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
)

export default KeyboardDismiss
