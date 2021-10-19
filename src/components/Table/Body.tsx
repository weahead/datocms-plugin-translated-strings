import React from 'react';

import useTranslatedStringsContext from '../../hooks/useTranslatedStringsContext';

import Row from './Row';

export default function Body() {
  const { translatedStrings } = useTranslatedStringsContext()
  return (
    <tbody>
      {translatedStrings.map(translatedString => <Row key={translatedString.id} translatedString={translatedString} />)}
    </tbody>
  );
}
