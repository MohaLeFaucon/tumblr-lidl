import { connect } from 'react-redux'
import Home from '../components/Home'

import {
  addLikeToPicture,
  getFeed,
  removeLikeToPicture,
} from '../redux/actions/feed'
import { AppState } from '../redux/store/types'

export default connect(
  (state: AppState) => ({
    feed: state.feed.globalFeed,
    subscribing: state.user.userData.subscribing,
  }),
  {
    getFeed,
    addLikeToPicture,
    removeLikeToPicture,
  },
)(Home)
