import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Text } from '../Common'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
  },
})

const SettingsButtonItem = ({ name, action }: Setting) => (
  <ListItem style={styles.container} onPress={action}>
    <Text type="title" style={styles.itemName}>
      {name}
    </Text>
  </ListItem>
)

export default SettingsButtonItem
