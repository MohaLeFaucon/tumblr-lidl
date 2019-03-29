import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'

import Comments from '../components/Comments'
import { getPictureComments, submitComment } from '../redux/actions/feed'
import { Feed } from '../redux/selectors'
import { AppState } from '../redux/store/types'

const mapStateToProps = (state: AppState, props: NavigationScreenProps) => ({
  comments: Feed.getCommentsForPicture(
    state,
    props.navigation.getParam('pictureId'),
  ),
})

const mapDispatchToProps = {
  getPictureComments,
  submitComment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments)
