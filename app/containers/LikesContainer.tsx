import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import LikeMentions from '../components/LikeMentions'
import { getPictureLikes } from '../redux/actions/feed'
import { Feed } from '../redux/selectors'
import { AppState } from '../redux/store/types'

const mapStateToProps = (state: AppState, props: NavigationScreenProps) => ({
  likes: Feed.getLikesForPicture(state, props.navigation.getParam('pictureId')),
})

const mapDispatchToProps = {
  getPictureLikes,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LikeMentions)
