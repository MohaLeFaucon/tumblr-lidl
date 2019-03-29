import { connect } from 'react-redux'

import FillUserProfile from '../components/FillUserProfile'
import { fillUserProfileAction } from '../redux/actions/authentication'

const mapDispatchToProps = {
  submit: fillUserProfileAction,
}

export default connect(
  null,
  mapDispatchToProps,
)(FillUserProfile)
