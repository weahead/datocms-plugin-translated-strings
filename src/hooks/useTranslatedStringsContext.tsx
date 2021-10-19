import { useContext } from 'react'
import { Context } from '../contexts/TranslatedStringsContext'
export default function useTranslatedStringsContext() {
  return useContext(Context)
}
