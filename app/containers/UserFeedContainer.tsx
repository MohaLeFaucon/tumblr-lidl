import { connect } from 'react-redux'

import { NavigationScreenProps } from 'react-navigation'
import UserFeed from '../components/UserFeed'
import {
  fillUserProfileAction,
  subscribeToUser,
  unsubscribeToUser,
} from '../redux/actions/authentication'
import {
  addLikeToPicture,
  getUserFeed,
  removeLikeToPicture,
} from '../redux/actions/feed'
import { Authentication, Feed } from '../redux/selectors'
import { AppState } from '../redux/store/types'

const mapStateToProps = (state: AppState, props: NavigationScreenProps) => ({
  feed: Feed.getUserFeed(state, props.navigation.getParam('userId')),
  currentUserId: state.user.userData.id,
  isSubscribed: Authentication.isSubscribedToUser(
    state,
    props.navigation.getParam('userId'),
  ),
})

const mapDispatchToProps = {
  getUserFeed,
  addLikeToPicture,
  removeLikeToPicture,
  subscribeToUser,
  unsubscribeToUser,
  fillUserProfile: fillUserProfileAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserFeed)
