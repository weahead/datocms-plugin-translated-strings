import { Action, Actions, State, StateWithActions, TranslatedString } from './types'

const initialState: State = {
  disabled: false,
  locales: [],
  translatedStrings: [],
}

export const stateWithActions: StateWithActions = {
  ...initialState,
  actions: {
    addItem: () => { },
    enableAddButton: () => { },
    removeItem: (id: string) => { },
    updateItem: (item: TranslatedString) => { },
  },
}

export function idGenerator() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

type InitProps = {
  fieldValue: any
  locales: Array<string>
}

function createTranslatedStringsArray(obj: Record<string, Record<string, string>>): Array<TranslatedString> {
  let translatedStrings: Array<TranslatedString> = []
  Object.keys(obj).map((locale, idx) => {
    const keys = Object.keys(obj[locale])
    keys.forEach(key => {
      if (idx === 0) {
        translatedStrings.push({
          id: `translatedstring-${idGenerator()}`,
          key,
          [locale]: obj[locale][key]
        })
      } else {
        translatedStrings = translatedStrings.map(ts => {
          if (ts.key === key) {
            return {
              ...ts,
              [locale]: obj[locale][key]
            }
          }
          return ts
        })
      }
    })
  })
  return translatedStrings
}

export function initializer(init: InitProps): StateWithActions {
  if (init.fieldValue != null) {
    const fieldValue = JSON.parse(init.fieldValue)
    stateWithActions.translatedStrings = createTranslatedStringsArray(fieldValue)
  }
  return {
    ...stateWithActions,
    locales: init.locales,
  }
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.ADD_ITEM:
      return {
        ...state,
        disabled: true,
        translatedStrings: [
          ...state.translatedStrings,
          action.payload,
        ]
      }
    case Actions.ENABLE:
      return {
        ...state,
        disabled: false,
      }
    case Actions.REMOVE_ITEM:
      return {
        ...state,
        disabled: false,
        translatedStrings: state.translatedStrings.filter(translatedString => translatedString.id !== action.payload.id),
      }
    case Actions.UPDATE_ITEM:
      return {
        ...state,
        disabled: false,
        translatedStrings: state.translatedStrings.map(translatedString => {
          if (translatedString.id == action.payload.id) {
            return action.payload
          }
          return translatedString
        }),
      }
  }
}
