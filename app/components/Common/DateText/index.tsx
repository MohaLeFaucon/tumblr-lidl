import * as FNS from 'date-fns'
import * as React from 'react'

import Text from '../Text'

interface Props {
  date: number | string | Date
}

export default class DateText extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { date } = this.props

    return <Text type="body">{FNS.format(date, 'MM/DD/YYYY HH:mm')}</Text>
  }
}
