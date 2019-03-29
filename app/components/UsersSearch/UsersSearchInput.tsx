import * as React from 'react'
import {
  LayoutAnimation,
  StyleSheet,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import i18n from '../../i18n'
import { Text, TextInput } from '../Common'

interface Props {
  onChange: (text: string) => any
}

interface State {
  isSearching: boolean
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    flex: 1,
  },
  cancelText: {
    marginLeft: 8,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#A7A7A7',
    paddingVertical: 3,
  },
  inputStyle: {
    flex: 1,
    minHeight: 28,
  },
})

export default class UsersSearchInput extends React.PureComponent<
  Props,
  State
> {
  state: State = {
    isSearching: false,
  }

  inputRef = React.createRef<RNTextInput>()

  onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
    this.setState({ isSearching: true })
  }

  onBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
    this.setState({ isSearching: false })
  }

  onCancel = () => {
    this.inputRef.current!.blur()
  }

  render(): React.ReactNode {
    const { onChange } = this.props
    const { isSearching } = this.state

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={onChange}
            ref={this.inputRef}
            placeholder={i18n.t('search.input.placeholder')}
            containerStyle={styles.inputContainerStyle}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            style={styles.inputStyle}
          />
        </View>
        {isSearching && (
          <TouchableWithoutFeedback onPress={this.onCancel}>
            <Text type="title" style={styles.cancelText}>
              Cancel
            </Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    )
  }
}
