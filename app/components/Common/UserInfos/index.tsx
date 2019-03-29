import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { Images } from '../../../resources'
import { Avatar } from '../Avatar'
import Text from '../Text'

interface Props extends Pick<AppTypes.User, 'username' | 'avatarUrl'> {
  onPressUsername?: () => any
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 10,
  },
})

const UserInfos = ({ username, avatarUrl, onPressUsername }: Props) => (
  <View style={styles.container}>
    <Avatar
      source={avatarUrl ? { uri: avatarUrl } : Images.userPlaceholder}
      size={32}
    />
    <View>
      <Text type="title" onPress={onPressUsername} style={styles.username}>
        {username}
      </Text>
    </View>
  </View>
)

export default UserInfos
