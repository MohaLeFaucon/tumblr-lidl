interface Setting {
  name: string
  type: 'switch' | 'button'
  value?: string | boolean
  action: (...args: any[]) => any
}

interface SettingsData {
  [key: string]: Setting[]
}
