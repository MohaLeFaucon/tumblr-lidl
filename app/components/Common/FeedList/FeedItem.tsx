import { Haptic } from 'expo'
import * as React from 'react'
import { NavigationScreenProps, withNavigation } from 'react-navigation'

import Routes from '../../../routes/Routes'
import View from '../View'
import FeedActions from './FeedActions'
import FeedImage from './FeedImage'
import FeedUser from './FeedUser'

type BaseProps = AppTypes.FeedImageData & {
  onLike: (id: string) => any
  onDislike: (id: string) => any,
}

interface Props extends NavigationScreenProps, BaseProps {}

class FeedItem extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const { image, user } = this.props

    return (
      image.likes !== nextProps.image.likes ||
      image.isLiked !== nextProps.image.isLiked ||
      user.avatarUrl !== nextProps.user.avatarUrl ||
      user.username !== nextProps.user.avatarUrl
    )
  }

  onPressLikes = () => {
    const { id, navigation } = this.props

    navigation.push(Routes.LIKES_MENTIONS, { pictureId: id })
  }

  onLike = () => {
    const {
      image: { isLiked },
      id,
      onLike,
      onDislike,
    } = this.props

    Haptic.impact(Haptic.ImpactStyles.Light)
    if (isLiked) {
      onDislike(id)
    } else {
      onLike(id)
    }
  }

  onGoToComments = () => {
    const { id, navigation } = this.props

    navigation.push(Routes.COMMENTS, { pictureId: id })
  }

  onGoToUser = () => {
    const { navigation, user } = this.props

    navigation.push(Routes.USER_FEED, { user, userId: user.id })
  }

  render(): React.ReactNode {
    const { image, user, createdAt } = this.props

    return (
      <View>
        <FeedUser {...user} onPressUser={this.onGoToUser} />
        <FeedImage
          url={image.imageUrl}
          width={image.imageWidth}
          height={image.imageHeight}
        />
        <FeedActions
          likesCount={image.likes}
          onPressLikes={this.onPressLikes}
          isLiking={image.isLiked}
          onLike={this.onLike}
          onGoToComments={this.onGoToComments}
          description={image.description}
          createdAt={createdAt}
        />
      </View>
    )
  }
}

export default withNavigation<BaseProps>(FeedItem)
