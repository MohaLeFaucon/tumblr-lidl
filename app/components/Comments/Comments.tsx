import * as React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import i18n from '../../i18n'
import Routes from '../../routes/Routes'
import {
  NavigationHeader,
  NavigationHeaderLeft,
  NavigationHeaderTitle,
} from '../Common'
import CommentInput from './CommentInput'
import CommentsList from './CommentsList'

interface Props extends NavigationScreenProps {
  comments: AppTypes.Comment[]
  submitComment: (pictureId: string, content: string) => any
  getPictureComments: (pictureId: string) => any
}

interface State {
  isLoading: boolean
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default class Comments extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: (props: any) => <NavigationHeader {...props} />,
    headerTitle: NavigationHeaderTitle,
    headerLeft: NavigationHeaderLeft,
    title: i18n.t('comments.header.title'),
  })

  state: State = {
    isLoading: false,
  }

  componentDidMount = async () => {
    const { getPictureComments, navigation } = this.props
    try {
      this.setState({ isLoading: true })
      await getPictureComments(navigation.getParam('pictureId'))
    } finally {
      this.setState({ isLoading: false })
    }
  }

  onSubmit = async (content: string) => {
    const { submitComment, navigation } = this.props

    return submitComment(navigation.getParam('pictureId'), content)
  }

  goToUser = (user: AppTypes.User) => {
    const { navigation } = this.props

    navigation.push(Routes.USER_FEED, { user, userId: user.id })
  }

  render(): React.ReactNode {
    const { comments } = this.props
    const { isLoading } = this.state

    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={85}
        style={styles.container}
      >
        <CommentsList
          isLoading={isLoading}
          comments={comments}
          goToUser={this.goToUser}
        />
        <CommentInput onSubmit={this.onSubmit} />
      </KeyboardAvoidingView>
    )
  }
}
