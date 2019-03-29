import { connect } from 'react-redux'

import Register from '../components/Register'
import { signupAction } from '../redux/actions/authentication'

const mapDispatchToProps = {
  register: signupAction,
}

export default connect(
  null,
  mapDispatchToProps,
)(Register)
