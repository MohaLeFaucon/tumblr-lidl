import * as React from 'react'
import { StyleSheet } from 'react-native'

import ListItem from '../ListItem'
import UserInfos from '../UserInfos'

interface Props extends AppTypes.User {
  onPressItem: (user: AppTypes.User) => any
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
})

export default class UsersListItem extends React.PureComponent<Props> {
  onPressItem = () => {
    const { onPressItem, ...user } = this.props

    onPressItem(user)
  }

  render(): React.ReactNode {
    const { username, avatarUrl } = this.props

    return (
      <ListItem style={styles.container} onPress={this.onPressItem}>
        <UserInfos username={username} avatarUrl={avatarUrl} />
      </ListItem>
    )
  }
}
