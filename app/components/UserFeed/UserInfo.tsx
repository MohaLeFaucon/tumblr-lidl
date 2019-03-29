import * as React from 'react'
import { LayoutAnimation, StyleSheet } from 'react-native'

import { User } from '../../api'
import i18n from '../../i18n'
import { Images } from '../../resources'
import { AvatarPicker, Button, TextInput, View } from '../Common'
import UserInfoCounts from './UserInfoCounts'

interface Props {
  user: AppTypes.User
  editable: boolean
  postsCount: number
  updateInfo: (username: string, avatarUri: string | null) => any
  isSubscribed: boolean
  onSubscribe: (id: string) => any
  onUnsubscribe: (id: string) => any
  updateSubscribers: (addSub: boolean) => any
}

interface State {
  isEditing: boolean
  errorMessage: string | null
  isUsernameValid: boolean
  subscriptionLoading: boolean
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#A7A7A7',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  editButton: {
    paddingVertical: 6,
    marginTop: 8,
  },
  inputContainer: {
    paddingVertical: 3,
  },
  input: {
    minHeight: 28,
  },
  inputContent: {
    marginBottom: 8,
  },
})

const SPECIAL_CHAR_REGEX = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

export default class UserInfo extends React.Component<Props, State> {
  state: State = {
    isEditing: false,
    errorMessage: null,
    isUsernameValid: true,
    subscriptionLoading: false,
  }

  username = this.props.user.username
  avatarUri = this.props.user.avatarUrl

  setEditMode = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ isEditing: true })
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { user, editable, postsCount } = this.props
    const {
      isEditing,
      errorMessage,
      isUsernameValid,
      subscriptionLoading,
    } = this.state

    return (
      user.username !== nextProps.user.username ||
      user.avatarUrl !== nextProps.user.avatarUrl ||
      (user.subscribers || []).length !==
        (nextProps.user.subscribers || []).length ||
      (user.subscribing || []).length !==
        (nextProps.user.subscribing || []).length ||
      editable !== nextProps.editable ||
      postsCount !== nextProps.postsCount ||
      isEditing !== nextState.isEditing ||
      errorMessage !== nextState.errorMessage ||
      isUsernameValid !== nextState.isUsernameValid ||
      subscriptionLoading !== nextState.subscriptionLoading
    )
  }

  submitEdit = async () => {
    const { updateInfo, user } = this.props
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (
      !(this.username === user.username && this.avatarUri === user.avatarUrl)
    ) {
      await updateInfo(this.username, this.avatarUri)
      this.setState({ isEditing: false })
    } else {
      this.setState({ isEditing: false })
    }
  }

  onChangeUsername = async (username: string) => {
    const { user } = this.props
    this.username = username
    if (username !== user.username) {
      if (username.length < 6 || username.match(SPECIAL_CHAR_REGEX)) {
        this.setState((state: State) => ({
          ...state,
          errorMessage: i18n.t(
            'auth.fillUserProfile.fields.username.errorMessage.invalid',
          ),
          isUsernameValid: false,
        }))
      } else {
        const usernames = await User.getUserByUsername(username)
        this.setState((state: State) => ({
          ...state,
          errorMessage:
            usernames.size !== 0
              ? i18n.t(
                  'auth.fillUserProfile.fields.username.errorMessage.alreadyExists',
                )
              : '',
          isUsernameValid: usernames.size === 0,
        }))
      }
    } else {
      this.setState({
        errorMessage: null,
        isUsernameValid: true,
      })
    }
  }

  onChangeAvatar = (uri: string) => {
    this.avatarUri = uri
  }

  onSubscribe = async () => {
    const { user, onSubscribe, updateSubscribers } = this.props
    this.setState({ subscriptionLoading: true })
    try {
      await onSubscribe(user.id)
      updateSubscribers(true)
    } finally {
      this.setState({ subscriptionLoading: false })
    }
  }

  onUnsubscribe = async () => {
    const { user, onUnsubscribe, updateSubscribers } = this.props
    this.setState({ subscriptionLoading: true })
    try {
      await onUnsubscribe(user.id)
      updateSubscribers(false)
    } finally {
      this.setState({ subscriptionLoading: false })
    }
  }

  render(): React.ReactNode {
    const { user, postsCount, editable, isSubscribed } = this.props
    const {
      isEditing,
      isUsernameValid,
      errorMessage,
      subscriptionLoading,
    } = this.state

    return (
      <View style={styles.container}>
        <AvatarPicker
          source={
            user.avatarUrl ? { uri: user.avatarUrl } : Images.userPlaceholder
          }
          size={40}
          disabled={!(editable && isEditing)}
          onChange={this.onChangeAvatar}
        />
        <View style={styles.countsContainer}>
          {isEditing && (
            <TextInput
              placeholder="Username"
              defaultValue={user.username}
              errorMessage={!isUsernameValid ? errorMessage : undefined}
              containerStyle={styles.inputContainer}
              style={styles.input}
              onChangeText={this.onChangeUsername}
              contentStyle={styles.inputContent}
            />
          )}
          <UserInfoCounts
            subscribersCount={(user.subscribers || []).length}
            subscribingCount={(user.subscribing || []).length}
            postsCount={postsCount}
          />
          {editable && (
            <Button
              type={!isEditing ? 'default' : 'success'}
              title={i18n.t(
                isEditing ? 'userFeed.editSuccess' : 'userFeed.editButton',
              )}
              onPress={isEditing ? this.submitEdit : this.setEditMode}
              style={styles.editButton}
              disabled={isEditing && !isUsernameValid}
            />
          )}
          {!editable && (
            <Button
              type={isSubscribed ? 'error' : 'info'}
              title={i18n.t(
                isSubscribed ? 'userFeed.unsubscribe' : 'userFeed.subscribe',
              )}
              style={styles.editButton}
              disabled={subscriptionLoading}
              onPress={isSubscribed ? this.onUnsubscribe : this.onSubscribe}
              loading={subscriptionLoading}
            />
          )}
        </View>
      </View>
    )
  }
}
