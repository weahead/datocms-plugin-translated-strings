import React from 'react';

import { DatoCMSPlugin } from '../types/datocms-plugin';

import TranslatedStringsContext from '../contexts/TranslatedStringsContext';

import Main from './Main';

import '../assets/style/style.sass'

type AppProps = {
  plugin: DatoCMSPlugin
}

export default function App({ plugin }: AppProps) {
  return (
    <TranslatedStringsContext plugin={plugin}>
      <Main />
    </TranslatedStringsContext>
  )
}
