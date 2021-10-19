import { DatoCMSPlugin } from '../../types/datocms-plugin'

export enum Actions {
  ADD_ITEM = 'ADD_ITEM',
  ENABLE = 'ENABLE',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_ITEM = 'UPDATE_ITEM',
}

export type TranslatedString = {
  id: string
  key: string
  [key: string]: string
}

export type State = {
  disabled: boolean
  locales: Array<string>
  translatedStrings: Array<TranslatedString>
}

export type Action =
  | { type: Actions.ADD_ITEM, payload: TranslatedString }
  | { type: Actions.ENABLE }
  | { type: Actions.REMOVE_ITEM, payload: { id: string } }
  | { type: Actions.UPDATE_ITEM, payload: TranslatedString }

export type StateWithActions = State & {
  actions: {
    addItem: () => void
    enableAddButton: () => void
    removeItem: (id: string) => void
    updateItem: (item: TranslatedString) => void
  }
}

export type TranslatedStringsContextProps = React.PropsWithChildren<React.ReactNode> & {
  plugin: DatoCMSPlugin
}