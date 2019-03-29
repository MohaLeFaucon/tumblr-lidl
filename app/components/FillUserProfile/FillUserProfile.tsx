import debounce from 'lodash/debounce'
import * as React from 'react'
import { Alert, Platform, StyleSheet, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { User } from '../../api'
import i18n from '../../i18n'
import { FillUserProfileAction } from '../../redux/actions/authentication'
import { Images } from '../../resources'
import Routes from '../../routes/Routes'
import { AvatarPicker, Button, KeyboardDismiss, TextInput } from '../Common'

const styles = StyleSheet.create({
  actionButtonsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end',
    ...Platform.select({
      android: {
        marginBottom: 10,
      },
    }),
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 10,
  },
  formContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  usernameInputContainer: {
    marginTop: 15,
    width: '100%',
  },
  validateButton: {
    alignSelf: 'stretch',
  },
})

interface Props extends NavigationScreenProps {
  submit: FillUserProfileAction
}

interface State {
  username: string
  isUsernameValid: boolean
  didVerifyUsername: boolean
  errorMessage: string
  submitLoading: boolean
}

const SPECIAL_CHAR_REGEX = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

export default class FillUserProfile extends React.Component<Props, State> {
  profilePicUri: string | null = null

  state: State = {
    username: '',
    isUsernameValid: false,
    didVerifyUsername: false,
    errorMessage: '',
    submitLoading: false,
  }

  constructor(props: Props) {
    super(props)
    this.searchForUsernameAvailability = debounce(
      this.searchForUsernameAvailability,
      500,
    )
  }

  searchForUsernameAvailability = async (username: string) => {
    if (username.length < 6 || username.match(SPECIAL_CHAR_REGEX)) {
      this.setState((state: State) => ({
        ...state,
        didVerifyUsername: true,
        errorMessage: i18n.t(
          'auth.fillUserProfile.fields.username.errorMessage.invalid',
        ),
        isUsernameValid: false,
      }))
    } else {
      const usernames = await User.getUserByUsername(username)
      this.setState((state: State) => ({
        ...state,
        didVerifyUsername: true,
        errorMessage:
          usernames.size !== 0
            ? i18n.t(
                'auth.fillUserProfile.fields.username.errorMessage.alreadyExists',
              )
            : '',
        isUsernameValid: usernames.size === 0,
      }))
    }
  }

  onChangeProfilePic = (uri: string) => {
    this.profilePicUri = uri
  }

  onChangeUsername = (value: string) => {
    this.setState((state: State) => ({
      ...state,
      username: value,
      didVerifyUsername: false,
    }))
    this.searchForUsernameAvailability(value)
  }

  onValidate = async () => {
    const { username } = this.state
    const { submit, navigation } = this.props

    try {
      this.setState({ submitLoading: true })
      await submit({
        username,
        avatarFilePath: this.profilePicUri,
      })
      navigation.navigate(Routes.MAIN)
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
    const {
      isUsernameValid,
      didVerifyUsername,
      errorMessage,
      submitLoading,
    } = this.state

    return (
      <KeyboardDismiss>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <AvatarPicker
              source={Images.userPlaceholder}
              size={90}
              onChange={this.onChangeProfilePic}
            />
            <View style={styles.usernameInputContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder={i18n.t(
                  'auth.fillUserProfile.fields.username.placeholder',
                )}
                onChangeText={this.onChangeUsername}
                errorMessage={
                  !isUsernameValid && didVerifyUsername
                    ? errorMessage
                    : undefined
                }
                useTheme={false}
              />
            </View>
          </View>
          <View style={styles.actionButtonsContainer}>
            <Button
              title={i18n.t('auth.shared.buttons.validate')}
              type="info"
              style={styles.validateButton}
              disabled={!isUsernameValid || submitLoading}
              onPress={this.onValidate}
              loading={submitLoading}
            />
          </View>
        </View>
      </KeyboardDismiss>
    )
  }
}
