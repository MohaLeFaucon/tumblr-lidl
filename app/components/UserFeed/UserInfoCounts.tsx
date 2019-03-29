import * as React from 'react'
import { StyleSheet } from 'react-native'

import i18n from '../../i18n'
import { Text, View } from '../Common'

interface Props
  extends Pick<AppTypes.User, 'subscribersCount' | 'subscribingCount'> {
  postsCount: number
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countContainer: {
    alignItems: 'center',
  },
})

export default class UserInfoCount extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const {
      subscribersCount = 0,
      subscribingCount = 0,
      postsCount,
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.countContainer}>
          <Text type="title">{subscribersCount}</Text>
          <Text type="body">
            {i18n.t('userFeed.subscribers', { count: subscribersCount })}
          </Text>
        </View>
        <View style={styles.countContainer}>
          <Text type="title">{subscribingCount}</Text>
          <Text type="body">
            {i18n.t('userFeed.subscribing', { count: subscribingCount })}
          </Text>
        </View>
        <View style={styles.countContainer}>
          <Text type="title">{postsCount}</Text>
          <Text type="body">
            {i18n.t('userFeed.posts', { count: postsCount })}
          </Text>
        </View>
      </View>
    )
  }
}
