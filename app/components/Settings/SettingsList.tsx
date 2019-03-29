import * as React from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
} from 'react-native'

import i18n from '../../i18n'
import { ThemeContextInterface, withTheme } from '../../theme'
import { ItemSeparator, Text, View } from '../Common'
import SettingsButtonItem from './SettingsButtonItem'
import SettingsSwitchItem from './SettingsSwitchItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})

// tslint:disable-next-line
interface BaseProps {
  signout: () => any
}

interface Props extends BaseProps, ThemeContextInterface {}

interface State {
  settings: SettingsData
}

class SettingsList extends React.Component<Props, State> {
  state: State = {
    settings: {
      appearence: [
        {
          name: i18n.t('settings.list.appearence.items.darkMode'),
          type: 'switch',
          action: this.props.toggleTheme,
          value: this.props.themeName === 'dark',
        },
      ],
      authentication: [
        {
          name: i18n.t('settings.list.authentication.items.signout'),
          type: 'button',
          action: this.props.signout,
        },
      ],
    },
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.themeName !== this.props.themeName) {
      this.setState((state: State) => ({
        ...state,
        settings: {
          ...state.settings,
          appearence: state.settings.appearence.map((setting, index) => {
            if (index === 0) {
              return {
                ...setting,
                value: this.props.themeName === 'dark',
              }
            }
            return setting
          }),
        },
      }))
    }
  }

  sectionsKeyExtractor = (item: any, index: number) => index.toString()

  itemKeyExtractor = (item: any, index: number) => index.toString()

  renderItem = ({ item }: SectionListRenderItemInfo<Setting>) => {
    if (item.type === 'switch') {
      return <SettingsSwitchItem {...item} />
    }
    if (item.type === 'button') {
      return <SettingsButtonItem {...item} />
    }
    return null
  }

  renderSectionHeader = ({
    section: { title },
  }: {
    section: SectionListData<any>,
  }) => (
    <View style={styles.sectionTitleContainer}>
      <Text type="title" style={styles.sectionTitle}>
        {title}
      </Text>
    </View>
  )

  render(): React.ReactNode {
    const { settings } = this.state

    return (
      <View style={styles.container}>
        <SectionList
          keyExtractor={this.sectionsKeyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={ItemSeparator}
          stickySectionHeadersEnabled={false}
          sections={[
            {
              title: i18n.t('settings.list.appearence.title'),
              data: settings.appearence,
              keyExtractor: this.itemKeyExtractor,
            },
            {
              title: i18n.t('settings.list.authentication.title'),
              data: settings.authentication,
              keyExtractor: this.itemKeyExtractor,
            },
          ]}
        />
      </View>
    )
  }
}

export default withTheme<BaseProps>(SettingsList)
