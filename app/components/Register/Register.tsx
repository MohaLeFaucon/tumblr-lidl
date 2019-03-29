import * as React from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
// tslint:disable-next-line:import-name
import SafeAreaView from 'react-native-safe-area-view'
import { NavigationScreenProps } from 'react-navigation'

import { Button, KeyboardDismiss, TextInput } from '../Common'

import i18n from '../../i18n'
import { SignupAction } from '../../redux/actions/authentication'
import Routes from '../../routes/Routes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  textInputContainer: {
    marginHorizontal: 10,
    marginVertical: 8,
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...Platform.select({
      android: {
        marginBottom: 10,
      },
    }),
  },
  button: {
    flex: 1,
  },
  firstButton: {
    marginRight: 5,
  },
  secondButton: {
    marginLeft: 5,
  },
})

interface Props extends NavigationScreenProps {
  register: SignupAction
}

type InputNames = 'email' | 'password' | 'passwordConfirmation'

interface InputData {
  value: string
  errorMessage: string
  isValid: boolean
}

interface State {
  submitEnabled: boolean
  inputData: { [key in InputNames]: InputData }
  submitLoading: boolean
}

export default class Register extends React.Component<Props, State> {
  state: State = {
    submitEnabled: false,
    inputData: {
      email: {
        value: '',
        errorMessage: 'Please provide a valid email',
        isValid: false,
      },
      password: {
        value: '',
        errorMessage: 'Your password must contain at least 6 characters',
        isValid: false,
      },
      passwordConfirmation: {
        value: '',
        errorMessage: 'Passwords must match',
        isValid: false,
      },
    },
    submitLoading: false,
  }

  // @ts-ignore
  emailInput = React.createRef<TextInput>()

  // @ts-ignore
  passwordInput = React.createRef<TextInput>()

  // @ts-ignore
  passwordConfirmInput = React.createRef<TextInput>()

  onSubmitUsername = () => {
    this.passwordInput.current!.focus()
  }

  onSubmitPassword = () => {
    this.passwordConfirmInput.current!.focus()
  }

  navigateToLogin = () => {
    const { navigation } = this.props

    navigation.navigate(Routes.LOGIN)
  }

  setSubmitButtonState = () => {
    let submitEnabled: boolean = true
    const {
      inputData: { email, password, passwordConfirmation },
    } = this.state

    if (
      email.value.length === 0 ||
      password.value.length === 0 ||
      passwordConfirmation.value.length === 0 ||
      password.value !== passwordConfirmation.value
    ) {
      submitEnabled = false
    }
    this.setState({ submitEnabled })
  }

  onChangeEmail = (value: string) => {
    this.setState(
      (state: State) => ({
        ...state,
        inputData: {
          ...state.inputData,
          email: {
            ...state.inputData.email,
            value,
            isValid: value.length > 0,
          },
        },
      }),
      this.setSubmitButtonState,
    )
  }

  onChangePassword = (value: string) => {
    this.setState(
      (state: State) => ({
        ...state,
        inputData: {
          ...state.inputData,
          password: {
            ...state.inputData.email,
            value,
            isValid: value.length > 6,
          },
        },
      }),
      this.setSubmitButtonState,
    )
  }

  onChangePasswordConfirmation = (value: string) => {
    this.setState(
      (state: State) => ({
        ...state,
        inputData: {
          ...state.inputData,
          passwordConfirmation: {
            ...state.inputData.email,
            value,
            isValid: value === state.inputData.password.value,
          },
        },
      }),
      this.setSubmitButtonState,
    )
  }

  onSubmit = async () => {
    const {
      inputData: { email, password },
    } = this.state
    const { register } = this.props

    try {
      this.setState({ submitLoading: true })
      await register({ email: email.value, password: password.value })
    } catch (e) {
      Alert.alert(
        i18n.t('shared.alerts.error.title'),
        i18n.t('shared.alerts.signupFail'),
      )
    } finally {
      this.setState({ submitLoading: false })
    }
  }

  render() {
    const { submitEnabled, submitLoading } = this.state

    return (
      <KeyboardDismiss>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={this.emailInput}
                placeholder={i18n.t('auth.register.fields.email.placeholder')}
                onSubmitEditing={this.onSubmitUsername}
                returnKeyType="next"
                blurOnSubmit={false}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={this.onChangeEmail}
                useTheme={false}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={this.passwordInput}
                secureTextEntry
                placeholder={i18n.t('auth.shared.fields.password.placeholder')}
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="none"
                onSubmitEditing={this.onSubmitPassword}
                onChangeText={this.onChangePassword}
                useTheme={false}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={this.passwordConfirmInput}
                secureTextEntry
                placeholder={i18n.t(
                  'auth.register.fields.confirmPassword.placeholder',
                )}
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.onChangePasswordConfirmation}
                useTheme={false}
              />
            </View>
            <SafeAreaView
              forceInset={{ bottom: 'always' }}
              style={styles.actions}
            >
              <Button
                type="info"
                style={[styles.button, styles.firstButton]}
                title={i18n.t('auth.shared.buttons.login')}
                onPress={this.navigateToLogin}
              />
              <Button
                type="success"
                disabled={!submitEnabled || submitLoading}
                style={[styles.button, styles.secondButton]}
                title={i18n.t('auth.shared.buttons.register')}
                onPress={this.onSubmit}
                loading={submitLoading}
              />
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </KeyboardDismiss>
    )
  }
}
