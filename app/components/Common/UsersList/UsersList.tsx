import * as React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { NavigationScreenProps, withNavigation } from 'react-navigation'

import Routes from '../../../routes/Routes'
import { ItemSeparator } from '../Separators'
import View from '../View'
import UsersListItem from './UsersListItem'

interface BaseProps {
  users: AppTypes.User[]
  onPressUser: (user: AppTypes.User) => any
}

interface Props extends NavigationScreenProps, BaseProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
})

class UsersList extends React.Component<Props> {
  keyExtractor = (item: AppTypes.User) => item.id

  onPressUser = (user: AppTypes.User) => {
    const { navigation } = this.props

    navigation.push(Routes.USER_FEED, { user, userId: user.id })
  }

  renderItem = ({ item }: { item: AppTypes.User }) => (
    <UsersListItem {...item} onPressItem={this.onPressUser} />
  )

  renderSeparator = () => <ItemSeparator style={styles.separator} />

  render(): React.ReactNode {
    const { users } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

export default withNavigation<BaseProps>(UsersList)
