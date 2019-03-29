import * as React from 'react'
import {
  NavigationFocusInjectedProps,
  withNavigationFocus,
} from 'react-navigation'

import i18n from '../../i18n'
import { FeedList, NavigationHeader, NavigationHeaderTitle } from '../Common'

interface BaseProps {
  getFeed: (userIds: string[]) => any
  feed: AppTypes.FeedImageData[]
  addLikeToPicture: (id: string) => any
  removeLikeToPicture: (id: string) => any
  subscribing: string[]
}

interface Props extends NavigationFocusInjectedProps, BaseProps {}

interface State {
  isRefreshing: boolean
}

class Home extends React.Component<Props, State> {
  static navigationOptions = () => ({
    header: (props: any) => <NavigationHeader {...props} />,
    headerTitle: NavigationHeaderTitle,
    title: i18n.t('home.header.title'),
  })

  state: State = {
    isRefreshing: false,
  }

  getFeedWithRefresh: () => any

  constructor(props: Props) {
    super(props)
    this.getFeedWithRefresh = this.getFeed.bind(this, true)
  }

  componentDidMount() {
    this.getFeed()
  }

  componentDidUpdate = (prevProps: Props) => {
    const { isFocused, subscribing } = this.props

    if (isFocused && !prevProps.isFocused) {
      this.getFeedWithRefresh()
    }
    if (isFocused && subscribing.length !== prevProps.subscribing.length) {
      this.getFeed()
    }
  }

  setIsRefreshing = (refreshing: boolean) => {
    this.setState((state: State) => ({ ...state, isRefreshing: refreshing }))
  }

  getFeed = async (setRefreshState = false) => {
    const { getFeed, subscribing } = this.props
    if (setRefreshState) {
      this.setIsRefreshing(true)
    }
    try {
      await getFeed(subscribing)
    } finally {
      if (setRefreshState) {
        this.setIsRefreshing(false)
      }
    }
  }

  render(): React.ReactNode {
    const { feed, addLikeToPicture, removeLikeToPicture } = this.props
    const { isRefreshing } = this.state

    return (
      <FeedList
        data={feed}
        refreshing={isRefreshing}
        addLikeToPicture={addLikeToPicture}
        removeLikeToPicture={removeLikeToPicture}
        onRefresh={this.getFeedWithRefresh}
      />
    )
  }
}

export default withNavigationFocus<BaseProps>(Home)
