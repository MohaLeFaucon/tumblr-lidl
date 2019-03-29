import * as React from 'react'
import { StyleSheet } from 'react-native'

import UserInfos from '../UserInfos'
import View from '../View'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
})

interface Props extends AppTypes.User {
  onPressUser: () => any
}

const FeedUser = ({ username, avatarUrl, onPressUser }: Props) => (
  <View style={styles.container}>
    <UserInfos
      username={username}
      avatarUrl={avatarUrl}
      onPressUsername={onPressUser}
    />
  </View>
)

export default FeedUser
