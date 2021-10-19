import React, { createContext, useMemo, useReducer } from 'react'

import { Actions, StateWithActions, TranslatedString, TranslatedStringsContextProps } from './types'
import { idGenerator, initializer, reducer, stateWithActions } from './reducer'

export const Context = createContext<StateWithActions>(stateWithActions)
Context.displayName = 'TranslatedStringsContext'

function jsonified(locales: Array<string>, items: Array<TranslatedString>) {
  return JSON.stringify(locales.reduce(
    (acc: Record<string, Record<string, string>>, val: string) => {
      acc[val] = acc[val] || {}
      if (items.length) {
        items.forEach(item => {
          acc[val][item.key] = item[val]
        })
      }
      return acc
    },
    {}
  ))
}

export default function TranslatedStringsContext({ children, plugin }: TranslatedStringsContextProps): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, {
    fieldValue: plugin.getFieldValue(plugin.fieldPath),
    locales: plugin.site.attributes.locales,
  }, initializer)

  const localeKeys = useMemo(() => {
    return state.locales.reduce(
      (acc: Record<string, string>, val: string) => {
        acc[val] = ''
        return acc
      },
      {}
    )
  }, [])

  function addItem() {
    dispatch({
      type: Actions.ADD_ITEM,
      payload: {
        id: `translatedstring-${idGenerator()}`,
        key: '',
        ...localeKeys
      },
    })
    plugin.setFieldValue(plugin.fieldPath, jsonified(state.locales, state.translatedStrings))
  }

  function enableAddButton() {
    dispatch({ type: Actions.ENABLE })
  }

  function removeItem(id: string) {
    plugin.setFieldValue(plugin.fieldPath, jsonified(state.locales, state.translatedStrings.filter(ts => ts.id !== id)))
    dispatch({ type: Actions.REMOVE_ITEM, payload: { id } })
  }

  function updateItem(item: TranslatedString) {
    const updatedTranslatedStringIndex = state.translatedStrings.findIndex(ts => ts.id === item.id)
    const translatedStrings = state.translatedStrings
    translatedStrings[updatedTranslatedStringIndex] = item
    plugin.setFieldValue(plugin.fieldPath, jsonified(state.locales, translatedStrings))
    dispatch({ type: Actions.UPDATE_ITEM, payload: item })
  }

  const providerValue = {
    ...state,
    actions: {
      addItem,
      enableAddButton,
      removeItem,
      updateItem,
    }
  }

  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  )
}