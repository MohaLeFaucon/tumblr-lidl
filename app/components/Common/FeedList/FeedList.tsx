import * as React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { ItemSeparator } from '../Separators'
import View from '../View'
import FeedItem from './FeedItem'

interface Props {
  data: AppTypes.FeedImageData[]
  addLikeToPicture: (id: string) => any
  removeLikeToPicture: (id: string) => any
  onRefresh: () => any
  refreshing: boolean
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 40,
  },
})

export default class Home extends React.Component<Props> {
  renderFeedItem = ({ item }: { item: AppTypes.FeedImageData }) => (
    <FeedItem
      {...item}
      onLike={this.props.addLikeToPicture}
      onDislike={this.props.removeLikeToPicture}
    />
  )

  keyExtractor = (item: AppTypes.FeedImageData) => item.id

  renderSeparator = () => <ItemSeparator style={styles.separator} />

  render(): React.ReactNode {
    const { data, refreshing, onRefresh } = this.props
    const likingNumber = data.map((pic) => pic.image.isLiked).length

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          extraData={likingNumber}
          renderItem={this.renderFeedItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </View>
    )
  }
}
