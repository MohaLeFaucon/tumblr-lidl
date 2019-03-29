import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Images } from '../../resources'
import { Avatar, DateText, Text, View } from '../Common'

type Props = AppTypes.Comment & {
  goToUser: (user: AppTypes.User) => any,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  right: {
    marginLeft: 10,
    flex: 1,
  },
  date: {
    marginTop: 5,
  },
})

export default class CommentItem extends React.PureComponent<Props> {
  goToUser = () => {
    const { goToUser, user } = this.props

    goToUser(user as AppTypes.User)
  }

  render(): React.ReactNode {
    const { user, content, createdAt } = this.props
    return (
      <View style={styles.container}>
        <Avatar
          source={
            user.avatarUrl ? { uri: user.avatarUrl } : Images.userPlaceholder
          }
          size={27}
        />
        <View style={styles.right}>
          <View style={styles.textContainer}>
            <Text type="body" style={styles.username} onPress={this.goToUser}>
              {user.username}
            </Text>
            <View style={{ flex: 1 }}>
              <Text type="body">{content}</Text>
            </View>
          </View>
          <View style={styles.date}>
            <DateText date={createdAt} />
          </View>
        </View>
      </View>
    )
  }
}
