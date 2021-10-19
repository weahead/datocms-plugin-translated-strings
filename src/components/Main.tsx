import React from 'react'

import useTranslatedStringsContext from '../hooks/useTranslatedStringsContext'

import Table from './Table'

export default function Main(): React.ReactElement {
  const { actions, disabled } = useTranslatedStringsContext()
  return (
    <div className="container">
      <Table />
      <button
        className="btn btn--add"
        disabled={disabled}
        onClick={actions.addItem}
        tabIndex={-1}
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 448 512" width="1em" height="1em">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
        </svg>
        <span>Add item</span>
      </button>
    </div>
  )
}