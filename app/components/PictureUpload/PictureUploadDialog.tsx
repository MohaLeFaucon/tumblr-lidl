import * as React from 'react'
import {
  ActivityIndicator,
  Alert,
  Animated,
  EventSubscription,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View as RNView,
} from 'react-native'
// tslint:disable-next-line:import-name
import SafeAreaView from 'react-native-safe-area-view'

import i18n from '../../i18n'
import { ThemeContextInterface, withTheme } from '../../theme'
import { KeyboardDismiss, Text, TextInput, View } from '../Common'

interface BaseProps {
  onConfirm: (description: string) => Promise<any>
  onRetry: () => any
}

interface Props extends BaseProps, ThemeContextInterface {}

interface State {
  isUploading: boolean
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  innerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 150,
  },
  backdropContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
  },
})

class PictureUploadDialog extends React.Component<Props, State> {
  state: State = {
    isUploading: false,
  }

  translateAnim: Animated.AnimatedValue = new Animated.Value(1000)
  keyboardWillShow: EventSubscription | null = null
  keyboardWillHide: EventSubscription | null = null
  description: string = ''

  componentDidMount() {
    Animated.timing(this.translateAnim, {
      toValue: 0,
      duration: 800,
    }).start()

    this.keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShowListener,
    )
    this.keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHideListener,
    )
  }

  componentWillUnmount() {
    this.keyboardWillShow!.remove()
    this.keyboardWillHide!.remove()
  }

  keyboardWillShowListener = (event: any) => {
    Animated.timing(this.translateAnim, {
      toValue: -event.endCoordinates.height,
      duration: event.duration + 100,
    }).start()
  }

  keyboardWillHideListener = (event: any) => {
    Animated.timing(this.translateAnim, {
      toValue: 0,
      duration: event.duration + 100,
    }).start()
  }

  onDismiss = () => {
    const { onRetry } = this.props

    Keyboard.dismiss()
    onRetry()
  }

  onChangeDescription = (value: string) => {
    this.description = value
  }

  onConfirm = async () => {
    const { onConfirm } = this.props

    this.setState({ isUploading: true })
    try {
      await onConfirm(this.description)
    } catch (e) {
      Alert.alert(
        i18n.t('shared.alerts.error.title'),
        i18n.t('shared.alerts.uploadFail'),
      )
    } finally {
      this.setState({ isUploading: false })
    }
  }

  render(): React.ReactNode {
    const { theme } = this.props
    const { isUploading } = this.state

    return (
      <KeyboardDismiss>
        <RNView style={styles.backdropContainer}>
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{ translateY: this.translateAnim }],
              },
            ]}
          >
            <View
              style={[
                styles.innerContainer,
                {
                  backgroundColor: theme.main.backgroundColor,
                  overflow: 'hidden',
                },
              ]}
            >
              <SafeAreaView
                forceInset={{ bottom: 'always' }}
                style={{ flex: 1 }}
              >
                <View style={styles.topContainer}>
                  <TouchableWithoutFeedback onPress={this.onDismiss}>
                    <Text type="body" textStyle="error">
                      {i18n.t('camera.dialog.dismiss')}
                    </Text>
                  </TouchableWithoutFeedback>
                  <Text type="title">{i18n.t('camera.dialog.title')}</Text>
                  {!isUploading && (
                    <TouchableWithoutFeedback onPress={this.onConfirm}>
                      <Text type="body">{i18n.t('camera.dialog.confirm')}</Text>
                    </TouchableWithoutFeedback>
                  )}
                  {isUploading && <ActivityIndicator />}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={i18n.t('camera.dialog.input.placeholder')}
                    multiline
                    style={styles.input}
                    onChangeText={this.onChangeDescription}
                  />
                </View>
              </SafeAreaView>
            </View>
          </Animated.View>
        </RNView>
      </KeyboardDismiss>
    )
  }
}

export default withTheme<BaseProps>(PictureUploadDialog)
