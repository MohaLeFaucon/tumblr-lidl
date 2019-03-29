import * as React from 'react'
import { StyleSheet, Switch } from 'react-native'
import { ListItem, Text } from '../Common'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
  },
})

const SettingsSwitchItem = ({ name, value, action }: Setting) => (
  <ListItem style={styles.container}>
    <Text type="title" style={styles.itemName}>
      {name}
    </Text>
    <Switch value={value as boolean} onValueChange={action} />
  </ListItem>
)

export default SettingsSwitchItem
