import { connect } from 'react-redux'

import Login from '../components/Login'
import { signinAction } from '../redux/actions/authentication'

const mapDispatchToProps = {
  login: signinAction,
}

export default connect(
  null,
  mapDispatchToProps,
)(Login)
