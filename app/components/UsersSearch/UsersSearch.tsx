import debounce from 'lodash/debounce'
import * as React from 'react'
import { NavigationScreenProps } from 'react-navigation'

import { User } from '../../api'
import { NavigationHeader, UsersList } from '../Common'
import UsersSearchInput from './UsersSearchInput'

type Props = NavigationScreenProps

interface State {
  users: AppTypes.User[]
}

export default class UsersSearch extends React.PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    header: (props: any) => <NavigationHeader {...props} />,
    headerTitle: () => (
      <UsersSearchInput onChange={navigation.getParam('onSearch')} />
    ),
  })

  state: State = {
    users: [],
  }

  constructor(props: Props) {
    super(props)
    this.onSearchUser = debounce(this.onSearchUser, 300)
  }

  componentDidMount() {
    const { navigation } = this.props

    navigation.setParams({ onSearch: this.onSearchUser })
  }

  onSearchUser = async (query: string) => {
    if (query.length > 3) {
      const users = await User.filterUserByUsername(query)

      this.setState({
        users: users.docs.map((user) => ({
          ...(user.data() as AppTypes.User),
          id: user.id,
        })),
      })
    }
  }

  onSelectUser = (user: AppTypes.User) => true

  render(): React.ReactNode {
    const { users } = this.state

    return <UsersList users={users} onPressUser={this.onSelectUser} />
  }
}
