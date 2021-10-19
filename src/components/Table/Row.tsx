import React, { useEffect, useState } from 'react';

import { TranslatedString } from '../../contexts/TranslatedStringsContext/types';
import useTranslatedStringsContext from '../../hooks/useTranslatedStringsContext';

type RowProps = {
  translatedString: TranslatedString
}

export default function Row({ translatedString }: RowProps) {
  const { actions, locales } = useTranslatedStringsContext()
  const [translation, setTranslation] = useState(translatedString)
  const allKeys = [...locales, 'key']

  function handleChange(evt: React.FormEvent<HTMLInputElement>) {
    const currentTarget = evt.currentTarget;
    if (currentTarget != null) {
      setTranslation(prevTranslation => ({
        ...prevTranslation,
        [currentTarget.name]: currentTarget.value
      }))

      actions.updateItem({
        ...translation,
        [currentTarget.name]: currentTarget.value,
      })
    }
  }

  function handleRemoveItem() {
    actions.removeItem(translatedString.id)
  }

  useEffect(() => {
    let dirty: Record<string, boolean> = {}
    allKeys.forEach(key => {
      dirty[key] = !!translation[key]
    })
    if (Object.values(dirty).every(value => value === true)) {
      actions.enableAddButton()
    }
  }, [translation])

  return (
    <tr>
      <th scope="col">
        <input
          aria-required="true"
          name="key"
          onChange={handleChange}
          placeholder="This field is required"
          required={true}
          type="text"
          value={translation['key']}
        />
      </th>
      {locales.map(locale => (
        <td key={locale}>
          <input
            aria-required="true"
            name={locale}
            onChange={handleChange}
            placeholder="This field is required"
            required={true}
            type="text"
            value={translation[locale]}
          />
        </td>
      ))}
      <td>
        <button
          className="btn btn--delete"
          onClick={handleRemoveItem}
          type="button"
        >
          <svg
            aria-hidden="true"
            height="1em"
            viewBox="0 0 448 512"
            width="1em"
          >
            <path d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16zM53.2 467a48 48 0 0047.9 45h245.8a48 48 0 0047.9-45L416 128H32z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
}
