import * as React from 'react'
import { StyleSheet, View as RNView } from 'react-native'

import { DateText } from '..'
import i18n from '../../../i18n'
import Text from '../Text'
import TouchableIcon from '../TouchableIcon'
import View from '../View'

interface Props {
  likesCount: number
  onPressLikes: () => any
  isLiking: boolean
  onLike: () => any
  onGoToComments: () => any
  description: string
  createdAt: number
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likesText: {
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  likeButton: {
    marginRight: 20,
  },
  description: {
    marginTop: 5,
  },
  date: {
    marginTop: 5,
  },
})

const FeedAction = ({
  likesCount,
  onPressLikes,
  isLiking,
  onLike,
  onGoToComments,
  description,
  createdAt,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.actionsContainer}>
      <RNView>
        <Text type="body" style={styles.likesText} onPress={onPressLikes}>
          {i18n.t('picture.likes', { count: likesCount })}
        </Text>
      </RNView>
      <RNView style={styles.actionButtonsContainer}>
        <TouchableIcon
          iconName={isLiking ? 'md-heart' : 'md-heart-empty'}
          style={styles.likeButton}
          iconColor={isLiking ? '#BE2A2B' : undefined}
          onPress={onLike}
        />
        <TouchableIcon iconName="md-list" onPress={onGoToComments} />
      </RNView>
    </View>
    {description !== '' && (
      <RNView>
        <Text style={styles.description} type="body">
          {description}
        </Text>
      </RNView>
    )}
    <RNView style={styles.date}>
      <DateText date={createdAt} />
    </RNView>
  </View>
)

export default FeedAction
