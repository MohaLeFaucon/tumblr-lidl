import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
// tslint:disable-next-line:import-name
import SafeAreaView from 'react-native-safe-area-view'
import { TouchableIcon } from '../Common'

const styles = StyleSheet.create({
  actionsButtonsContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  actionButton: {
    position: 'absolute',
  },
  closeButton: {
    top: 10,
    left: 10,
  },
  flashButton: {
    top: 10,
    right: 10,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 10,
    left: 10,
    right: 10,
  },
  snapButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
})

interface Props {
  onClose: () => any
  flashEnabled: boolean
  onChangeFlashMode: () => any
  onSnap: () => any
  canSnap: boolean
  onChangeType: () => any
  onPickFromLibrary: () => any
}

const PictureUploadActionButtons = ({
  canSnap,
  onChangeFlashMode,
  onChangeType,
  flashEnabled,
  onClose,
  onSnap,
  onPickFromLibrary,
}: Props) => (
  <SafeAreaView
    style={styles.actionsButtonsContainer}
    forceInset={{ top: 'always', bottom: 'always' }}
  >
    <View style={{ padding: 30, flex: 1 }}>
      <TouchableIcon
        iconName="md-close"
        onPress={onClose}
        style={[styles.actionButton, styles.closeButton]}
        iconColor="#fff"
        useTheme={false}
      />
      <TouchableIcon
        iconName={flashEnabled ? 'flash-on' : 'flash-off'}
        onPress={onChangeFlashMode}
        style={[styles.actionButton, styles.flashButton]}
        iconComponent={MaterialIcons}
        iconColor="#fff"
        useTheme={false}
      />
      <View style={[styles.actionButton, styles.bottomActions]}>
        <TouchableIcon
          iconName="md-images"
          onPress={onPickFromLibrary}
          iconColor="#fff"
          useTheme={false}
        />
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onSnap}
          disabled={!canSnap}
        >
          <View style={styles.snapButton} />
        </TouchableOpacity>
        <TouchableIcon
          iconName="md-reverse-camera"
          onPress={onChangeType}
          iconColor="#fff"
          useTheme={false}
        />
      </View>
    </View>
  </SafeAreaView>
)

export default PictureUploadActionButtons
