import * as firebase from 'firebase'
import * as React from 'react'
import { Alert, StyleSheet } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { User } from '../../api'
import i18n from '../../i18n'
import {
  FeedList,
  NavigationHeader,
  NavigationHeaderLeft,
  NavigationHeaderTitle,
  View,
} from '../Common'
import UserInfo from './UserInfo'

interface Props extends NavigationScreenProps {
  feed: AppTypes.FeedImageData[]
  addLikeToPicture: (id: string) => any
  removeLikeToPicture: (id: string) => any
  getUserFeed: (id: string) => any
  currentUserId: string
  fillUserProfile: (
    {
      username,
      avatarFilePath,
    }: { username: string; avatarFilePath: string | null },
  ) => any
  isSubscribed: boolean
  subscribeToUser: (id: string) => any
  unsubscribeToUser: (id: string) => any
}

interface State {
  isRefreshing: boolean
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class UserFeed extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    header: (props: any) => <NavigationHeader {...props} />,
    headerTitle: NavigationHeaderTitle,
    title: (navigation.getParam('user') as AppTypes.User).username,
    headerLeft: NavigationHeaderLeft,
  })

  state: State = {
    isRefreshing: false,
  }

  isEditable =
    this.props.navigation.getParam('userId') === this.props.currentUserId

  getFeedWithRefresh: () => any

  constructor(props: Props) {
    super(props)
    this.getFeedWithRefresh = this.getFeed.bind(this, true)
  }

  componentDidMount() {
    this.getFeed()
  }

  getUserData = async () => {
    const { navigation } = this.props

    const user = await User.getUserByUserId(navigation.getParam('userId'))
    navigation.setParams({
      user: {
        ...(user.data() as AppTypes.User),
        id: user.id,
      },
    })
  }

  getFeed = async (refreshing: boolean = false) => {
    const { getUserFeed, navigation } = this.props

    this.setIsRefreshing(refreshing && true)
    try {
      await Promise.all([
        getUserFeed(navigation.getParam('userId')),
        this.getUserData(),
      ])
    } finally {
      this.setIsRefreshing(refreshing && false)
    }
  }

  setIsRefreshing = (refreshing: boolean) => {
    this.setState({ isRefreshing: refreshing })
  }

  onUpdateUserInfo = async (username: string, avatarUri: string | null) => {
    const { fillUserProfile, navigation } = this.props

    try {
      await fillUserProfile({ username, avatarFilePath: avatarUri })
      navigation.setParams({
        user: {
          ...navigation.getParam('user', {}),
          username,
          avatarUrl: avatarUri,
        },
      })
    } catch (e) {
      Alert.alert(
        i18n.t('shared.alerts.error.title'),
        i18n.t('shared.alerts.updateProfileFail'),
      )
      throw e
    }
  }

  updateSubscribers = (addSubscriber: boolean) => {
    const { navigation } = this.props
    const user = navigation.getParam('user') as AppTypes.User

    if (addSubscriber) {
      navigation.setParams({
        user: {
          ...user,
          subscribers: [...user.subscribers, firebase.auth().currentUser!.uid],
        },
      })
    } else {
      navigation.setParams({
        user: {
          ...user,
          subscribers: user.subscribers.filter(
            (sub) => sub !== firebase.auth().currentUser!.uid,
          ),
        },
      })
    }
  }

  render(): React.ReactNode {
    const {
      feed,
      addLikeToPicture,
      removeLikeToPicture,
      navigation,
      isSubscribed,
      subscribeToUser,
      unsubscribeToUser,
    } = this.props
    const { isRefreshing } = this.state

    return (
      <View style={styles.container}>
        <UserInfo
          postsCount={feed.length}
          editable={this.isEditable}
          user={navigation.getParam('user')}
          updateInfo={this.onUpdateUserInfo}
          isSubscribed={isSubscribed}
          onSubscribe={subscribeToUser}
          onUnsubscribe={unsubscribeToUser}
          updateSubscribers={this.updateSubscribers}
        />
        <FeedList
          data={feed}
          onRefresh={this.getFeedWithRefresh}
          refreshing={isRefreshing}
          addLikeToPicture={addLikeToPicture}
          removeLikeToPicture={removeLikeToPicture}
        />
      </View>
    )
  }
}
