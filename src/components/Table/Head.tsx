import React from 'react';

import useTranslatedStringsContext from '../../hooks/useTranslatedStringsContext';

export default function Head() {
  const { locales } = useTranslatedStringsContext()
  return (
    <thead aria-hidden="true">
      <tr>
        <th>Key</th>
        {locales.map(locale => <th key={locale}>{locale}</th>)}
        <th></th>
      </tr>
    </thead>
  );
}
