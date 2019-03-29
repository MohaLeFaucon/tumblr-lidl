import * as React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native'

import i18n from '../../i18n'
import { TextInput, TouchableIcon, View } from '../Common'

interface Props {
  onSubmit: (content: string) => any
}

interface State {
  submitEnabled: boolean
  inputValue: string
  submitLoading: boolean
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'grey',
  },
  submitButton: {
    marginVertical: 5,
    marginLeft: 5,
  },
  textInput: {
    flex: 1,
    maxHeight: 80,
  },
  inputContainer: {
    flex: 1,
  },
})

export default class CommentInput extends React.PureComponent<Props, State> {
  inputContent: string = ''

  state: State = {
    submitEnabled: false,
    inputValue: '',
    submitLoading: false,
  }

  inputRef = React.createRef<RNTextInput>()

  onChange = (content: string) => {
    this.setState({
      submitEnabled: content.length > 0,
      inputValue: content,
    })
  }

  onSubmit = async () => {
    const { onSubmit } = this.props
    const { inputValue } = this.state

    try {
      this.setState({
        submitLoading: true,
      })
      onSubmit(inputValue)
      this.setState({
        inputValue: '',
        submitEnabled: false,
      })
    } finally {
      this.setState({
        submitLoading: false,
      })
    }
  }

  render(): React.ReactNode {
    const { submitEnabled, inputValue, submitLoading } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            onChangeText={this.onChange}
            placeholder={i18n.t('comments.input.placeholder')}
            style={styles.textInput}
            ref={this.inputRef}
            value={inputValue}
          />
        </View>
        {!submitLoading && (
          <TouchableIcon
            iconName="ios-send"
            onPress={this.onSubmit}
            style={[styles.submitButton, { opacity: submitEnabled ? 1 : 0.75 }]}
            disabled={!submitEnabled}
          />
        )}
        {submitLoading && <ActivityIndicator style={styles.submitButton} />}
      </View>
    )
  }
}
