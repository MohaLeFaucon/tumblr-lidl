import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'

import i18n from '../../i18n'
import {
  NavigationHeader,
  NavigationHeaderLeft,
  NavigationHeaderTitle,
  UsersList,
} from '../Common'

interface Props extends NavigationScreenProps {
  likes: AppTypes.User[]
  getPictureLikes: (pictureId: string) => any
}

export default class LikeMentions extends React.Component<Props> {
  static navigationOptions = () => ({
    header: (props: any) => <NavigationHeader {...props} />,
    headerTitle: NavigationHeaderTitle,
    title: i18n.t('likes.header.title'),
    headerLeft: NavigationHeaderLeft,
  })

  componentDidMount = () => {
    const { navigation, getPictureLikes } = this.props
    const pictureId = navigation.getParam('pictureId') as string
    getPictureLikes(pictureId)
  }

  onPressUser = (user: AppTypes.User) => true

  render(): React.ReactNode {
    const { likes } = this.props

    return <UsersList users={likes} onPressUser={this.onPressUser} />
  }
}
