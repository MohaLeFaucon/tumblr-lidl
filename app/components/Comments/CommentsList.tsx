import * as React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { View } from '../Common'
import CommentItem from './CommentItem'

interface Props {
  comments: AppTypes.Comment[]
  isLoading: boolean
  goToUser: (user: AppTypes.User) => any
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class CommentsList extends React.Component<Props> {
  keyExtractor = (item: AppTypes.Comment, index: number) => index.toString()

  renderItem = ({ item }: { item: AppTypes.Comment }) => (
    <CommentItem {...item} goToUser={this.props.goToUser} />
  )

  render(): React.ReactNode {
    const { comments, isLoading } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={comments}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          refreshing={isLoading}
        />
      </View>
    )
  }
}
