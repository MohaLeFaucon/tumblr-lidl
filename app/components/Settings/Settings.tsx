import * as React from 'react'

import i18n from '../../i18n'
import { NavigationHeader, NavigationHeaderTitle } from '../Common'
import SettingsList from './SettingsList'

interface Props {
  signout: () => any
}

export default class Settings extends React.Component<Props> {
  static navigationOptions = () => ({
    header: (props: any) => <NavigationHeader {...props} />,
    headerTitle: NavigationHeaderTitle,
    title: i18n.t('settings.header.title'),
  })

  render(): React.ReactNode {
    return <SettingsList {...this.props} />
  }
}
