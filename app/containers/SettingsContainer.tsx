import { connect } from 'react-redux'

import Settings from '../components/Settings'
import { signoutAction } from '../redux/actions/authentication'

const mapDispatchToProps = {
  signout: signoutAction,
}

export default connect(
  null,
  mapDispatchToProps,
)(Settings)
