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
import { SigninAction } from '../../redux/actions/authentication'
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
  login: SigninAction
}

interface State {
  submitLoading: boolean
}

export default class Login extends React.Component<Props, State> {
  // @ts-ignore
  usernameInput = React.createRef<TextInput>()

  // @ts-ignore
  passwordInput = React.createRef<TextInput>()

  usernameValue: string = ''

  passwordValue: string = ''

  state: State = {
    submitLoading: false,
  }

  onSubmitUsername = () => {
    this.passwordInput.current!.focus()
  }

  navigateToRegister = () => {
    const { navigation } = this.props

    navigation.navigate(Routes.REGISTER)
  }

  onChangeUsername = (value: string) => {
    this.usernameValue = value
  }

  onChangePassword = (value: string) => {
    this.passwordValue = value
  }

  onSubmit = async () => {
    const { login, navigation } = this.props

    try {
      this.setState({ submitLoading: true })
      // @ts-ignore
      const { navigateToMain } = await login({
        email: this.usernameValue,
        password: this.passwordValue,
      })
      if (navigateToMain) {
        navigation.navigate(Routes.MAIN_LIST)
      } else {
        navigation.navigate(Routes.USER_PROFILE_DATA)
      }
    } catch (e) {
      Alert.alert(
        i18n.t('shared.alerts.error.title'),
        i18n.t('shared.alerts.signinFail'),
      )
    } finally {
      this.setState({ submitLoading: false })
    }
  }

  render() {
    const { submitLoading } = this.state

    return (
      <KeyboardDismiss>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={this.usernameInput}
                placeholder={i18n.t('auth.login.fields.username.placeholder')}
                onSubmitEditing={this.onSubmitUsername}
                returnKeyType="next"
                blurOnSubmit={false}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.onChangeUsername}
                useTheme={false}
                keyboardType="email-address"
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
                onChangeText={this.onChangePassword}
                useTheme={false}
              />
            </View>
            <SafeAreaView
              forceInset={{ bottom: 'always' }}
              style={styles.actions}
            >
              <Button
                type="success"
                style={[styles.button, styles.firstButton]}
                title={i18n.t('auth.shared.buttons.login')}
                onPress={this.onSubmit}
                disabled={submitLoading}
                loading={submitLoading}
              />
              <Button
                type="info"
                style={[styles.button, styles.secondButton]}
                title={i18n.t('auth.shared.buttons.register')}
                onPress={this.navigateToRegister}
                disabled={submitLoading}
              />
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </KeyboardDismiss>
    )
  }
}
