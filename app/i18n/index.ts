import { DangerZone } from 'expo'
import i18nJs from 'i18n-js'

import en from './en'
import fr from './fr'

i18nJs.fallbacks = true
i18nJs.translations = { en, fr }

export const setupI18n = async () => {
  let locale = (await DangerZone.Localization.getCurrentLocaleAsync()) as string
  locale = locale.replace(/[_-].*/, '')
  i18nJs.locale = locale
}

export default i18nJs
